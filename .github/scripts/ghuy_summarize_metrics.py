"""Recompute W6-20 tables offline from downloaded, unmodified CI artifacts."""
import argparse
import csv
from datetime import datetime
import hashlib
import json
from pathlib import Path


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def seconds(start, end):
    if not start or not end:
        return None
    return (datetime.fromisoformat(end.replace("Z", "+00:00"))
            - datetime.fromisoformat(start.replace("Z", "+00:00"))).total_seconds()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("batch", type=Path)
    args = parser.parse_args()
    batch = args.batch.resolve()
    manifest = read(batch / "dispatches.json")
    runs = sorted(read(batch / "runs.json"), key=lambda r: (r["created_at"], r["id"]))
    observations = []
    seen = set()
    for run in runs:
        if run["head_sha"] != manifest["sha"]:
            raise ValueError("Revision changed within experiment")
        if run["status"] != "completed":
            raise ValueError("Do not summarize a running workflow")
        folder = batch / str(run["id"])
        artifacts = folder / "artifacts" / f"ghuy-pair-{run['pair_index']}"
        results_path = artifacts / "pair-results.json"
        if results_path.exists():
            results = read(results_path)["results"]
        else:
            results = [dict(variant=v, pair_index=run["pair_index"], valid=False,
                            classification="infrastructure_or_harness_error",
                            invalid_reason="no_pair_artifact_check_jobs_json")
                       for v in ("before", "after")]
        for original in results:
            row = dict(original)
            if row.get("valid"):
                if row["sha"] != manifest["sha"] or row["run_id"] != str(run["id"]):
                    raise ValueError("Artifact provenance mismatch")
                raw = artifacts / row["raw_log"]
                if hashlib.sha256(raw.read_bytes()).hexdigest() != row["raw_sha256"]:
                    raise ValueError("Raw invocation checksum mismatch")
                jest = read(artifacts / row["jest_json"])
                selected = [a for suite in jest["testResults"] for a in suite["assertionResults"]
                            if a["title"] == row["selected_test_name"]]
                expected = "passed" if row["classification"] == "test_pass" else "failed"
                if len(selected) != 1 or selected[0]["status"] != expected:
                    raise ValueError("Classification differs from actual Jest assertion")
                row["raw_log"] = raw.relative_to(batch).as_posix()
                row["jest_json"] = (artifacts / row["jest_json"]).relative_to(batch).as_posix()
            row["run_id"] = str(run["id"])
            row["run_url"] = run["html_url"]
            row["sha"] = run["head_sha"]
            key = (row["pair_index"], row["variant"])
            row["included"] = bool(row["valid"] and key not in seen)
            row["exclusion_reason"] = None if row["included"] else (
                "duplicate_after_first_valid" if row["valid"] else row.get("invalid_reason"))
            if row["included"]:
                seen.add(key)
            observations.append(row)
    metrics = {}
    for variant in ("before", "after"):
        selected = [r for r in observations if r["variant"] == variant and r["included"]]
        failed = sum(r["classification"] == "test_fail" for r in selected)
        metrics[variant] = {"valid_invocations": len(selected), "test_failures": failed,
                            "failure_rate": failed / len(selected) if selected else None}
    included = [r for r in observations if r["included"]]
    control_names = ("sha", "node", "runner_os", "runner_image", "runner_image_version",
                     "package_lock_sha256", "demo_sha256", "jest_config_sha256")
    controls = {name: sorted(set(r.get(name) for r in included)) for name in control_names}
    if included and any(len(values) != 1 for name, values in controls.items() if name != "runner_image_version"):
        raise ValueError("Fixed-control mismatch; review before interpreting rates")
    for pair in range(1, 11):
        paired = [r for r in included if r["pair_index"] == pair]
        if len(set(r["runner_image_version"] for r in paired)) > 1:
            raise ValueError("Paired comparisons must use the same hosted image")
    root_run = next(r for r in runs if r["pair_index"] == 1)
    parent = batch / str(root_run["id"])
    jobs = read(parent / "jobs.json")
    cache = {}
    for mode in ("cold", "warm"):
        path = parent / "artifacts" / f"ghuy-cache-{mode}" / f"cache-{mode}.json"
        data = read(path) if path.exists() else {"valid_cache_state": False}
        job = next((j for j in jobs if j["name"] == f"cache-{mode}"), None)
        data["metadata_path"] = path.relative_to(batch).as_posix() if path.exists() else None
        data["job_duration_seconds"] = seconds(job["started_at"], job["completed_at"]) if job else None
        data["individual_steps"] = {}
        for name in ("Restore isolated cache", "Install dependencies on miss"):
            step = next((s for s in (job or {}).get("steps", []) if s["name"] == name), None)
            data["individual_steps"][name] = {
                "conclusion": step["conclusion"] if step else None,
                "duration_seconds": seconds(step["started_at"], step["completed_at"])
                if step and step["conclusion"] != "skipped" else None}
        data["job_success"] = bool(job and job["conclusion"] == "success")
        cache[mode] = data
    comparable = all(cache[m]["valid_cache_state"] and cache[m]["job_success"] for m in cache)
    comparable = comparable and all(cache["cold"].get(k) == cache["warm"].get(k)
        for k in ("cache_key", "sha", "runner_os", "runner_image", "runner_image_version", "node", "npm", "package_lock_sha256"))
    cache["comparable"] = comparable
    cache["speedup"] = (cache["cold"]["preparation_interval_seconds"]
                        / cache["warm"]["preparation_interval_seconds"]) if comparable else None
    ai_path = parent / "artifacts" / "ghuy-ai-metrics" / "ai-metrics.json"
    ai = read(ai_path) if ai_path.exists() else {"api_status": "missing_artifact"}
    summary = {"experiment": manifest["experiment"], "sha": manifest["sha"],
               "workflow_runs": len(runs), "observations": len(observations),
               "invalid_observations": sum(not r["valid"] for r in observations),
               "duplicates": sum(r["valid"] and not r["included"] for r in observations),
               "target_met": all(metrics[v]["valid_invocations"] == 10 for v in metrics),
               "metrics": metrics, "reduction_percentage_points": (100 * (
                   metrics["before"]["failure_rate"] - metrics["after"]["failure_rate"]))
                   if all(metrics[v]["failure_rate"] is not None for v in metrics) else None,
               "fixed_controls": controls,
               "hosted_image_varies_between_pairs": len(controls["runner_image_version"]) > 1,
               "paired_image_matches": True, "cache": cache, "ai": ai}
    (batch / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    (batch / "observations.json").write_text(json.dumps(observations, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    fields = ["pair_index", "variant", "profile", "run_id", "run_url", "sha", "started_at_utc",
              "completed_at_utc", "classification", "valid", "included", "exclusion_reason",
              "invocation_duration_ms", "selected_assertion_duration_ms", "exit_code", "raw_log", "jest_json"]
    with (batch / "invocations.csv").open("w", encoding="utf-8", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=fields, extrasaction="ignore", lineterminator="\n")
        writer.writeheader()
        writer.writerows(observations)
    print(json.dumps({"metrics": metrics, "reduction_pp": summary["reduction_percentage_points"],
                      "cache_speedup": cache["speedup"], "ai_status": ai["api_status"]}, ensure_ascii=True))


if __name__ == "__main__":
    main()
