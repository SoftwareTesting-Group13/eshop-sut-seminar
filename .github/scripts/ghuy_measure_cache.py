"""End the common cache restore + optional install wall interval (not job duration)."""
import hashlib
import json
import os
from pathlib import Path
import subprocess
import time
end = time.monotonic_ns()
out = Path('ci-artifacts/cache')
start = int((out/'start.txt').read_text())
mode = os.environ['CACHE_MODE']
hit = os.environ.get('CACHE_HIT') == 'true'
record = {'mode': mode, 'cache_hit': hit, 'cache_hit_raw': os.environ.get('CACHE_HIT'),
          'cache_key': os.environ['CACHE_KEY'], 'preparation_interval_seconds': (end-start)/1e9,
          'boundary': 'after start stamp, across restore and conditional npm ci, until stop script begins',
          'excludes': 'checkout, setup-node, save cache, upload artifacts; NOT total job duration',
          'run_id': os.environ.get('GITHUB_RUN_ID'), 'sha': os.environ.get('GITHUB_SHA'),
          'runner_os': os.environ.get('RUNNER_OS'), 'runner_image': os.environ.get('ImageOS'),
          'runner_image_version': os.environ.get('ImageVersion'),
          'node': subprocess.check_output(['node','--version'],text=True).strip(),
          'npm': subprocess.check_output(['npm','--version'],text=True).strip(),
          'package_lock_sha256': hashlib.sha256(Path('backend/package-lock.json').read_bytes()).hexdigest(),
          'valid_cache_state': (not hit if mode=='cold' else hit)}
(out/f'cache-{mode}.json').write_text(json.dumps(record,indent=2)+'\n')
print(json.dumps(record))
if not record['valid_cache_state']: raise SystemExit('Unexpected cache state; do not use for speedup')
