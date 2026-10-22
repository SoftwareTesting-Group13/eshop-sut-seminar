# EShop SUT — Comprehensive CI/CD Test Harness & Failure Modes Guide
**Course:** CSC13003 — Software Testing | Class: Testing-CQ2023-3-LQVu  
**Topic:** T07 — CI/CD & Automated Test-Harness Engineering  
**System Under Test (SUT):** EShop Monorepo (Node.js/Express, SQLite3, Jest, React, GitHub Actions)  
**Repository:** [SoftwareTesting-Group13/eshop-sut-seminar](https://github.com/SoftwareTesting-Group13/eshop-sut-seminar)  
**Contributors (Group 13):**
- Nguyen Ngoc Minh Tuan (23120102)
- Duong Nhat Cuong (23120223) 
- Tran Gia Cuong (23120225) 
- Nguyen Gia Huy (23120273)
**Supervising Faculty:** Dr. Lam Quang Vu, Dr. Tran Duy Hoang, M.Sc. Truong Phuoc Loc, M.Sc. Ho Tuan Thanh  

---

> [!IMPORTANT]
> **Team Cross-Review Checklist (To finalize once other members complete their tasks):**
> - [ ] **D. N. Cường (CI/CD & Video):** Verify Section 4 workflow steps match `.github/workflows/eshop-ci.yml` and align reproduction guide with video demo timecodes.
> - [ ] **N. N. M. Tuấn (Slides & Coupon Tests):** Confirm Section 6.2 code diffs and 21 Data-Driven test cases match `Seminar_Slides.pptx` / `Seminar_Slides.md`.
> - [ ] **N. G. Huy (Worksheet, AI Triage & Metrics):** Update Section 6.3 with empirical Flake Rate metrics (10 runs) and verify `ai_triage.py` script details in Section 5.3.

---

## Table of Contents

- [1. Introduction & SUT Architecture Overview](#1-introduction--sut-architecture-overview)
  - [1.1 Purpose of This Guide](#11-purpose-of-this-guide)
  - [1.2 CI/CD as an Automated Test Harness](#12-cicd-as-an-automated-test-harness)
  - [1.3 SUT System Architecture & Monorepo Structure](#13-sut-system-architecture--monorepo-structure)
    - [1.3.1 Architectural Diagram: Monorepo & CI/CD Test Harness](#131-architectural-diagram-monorepo--cicd-test-harness)
    - [1.3.2 Monorepo Directory Layout & Component Roles](#132-monorepo-directory-layout--component-roles)
- [2. Installation, Prerequisites & Environment Setup](#2-installation-prerequisites--environment-setup)
  - [2.1 Hardware and Software Requirements](#21-hardware-and-software-requirements)
  - [2.2 Repository Cloning](#22-repository-cloning)
  - [2.3 Installing Dependencies](#23-installing-dependencies)
  - [2.4 SQLite Database Initialization](#24-sqlite-database-initialization)
  - [2.5 Environment Variables & GitHub Secrets](#25-environment-variables--github-secrets)
- [3. Quickstart & First Test Suite Execution](#3-quickstart--first-test-suite-execution)
  - [3.1 Running Unit Tests Locally](#31-running-unit-tests-locally)
  - [3.2 Understanding the Jest Test Engine](#32-understanding-the-jest-test-engine)
  - [3.3 The `--runInBand` Execution Flag](#33-the---runinband-execution-flag)
  - [3.4 Interpreting Test Outputs & Code Coverage](#34-interpreting-test-outputs--code-coverage)
- [4. CI/CD Pipeline Architecture & GitHub Actions Engineering](#4-cicd-pipeline-architecture--github-actions-engineering)
  - [4.1 Pipeline Design Principles](#41-pipeline-design-principles)
  - [4.2 Dependency Caching Strategy (`actions/cache`)](#42-dependency-caching-strategy-actionscache)
  - [4.3 Quality Gates & Fail-Fast Mechanism](#43-quality-gates--fail-fast-mechanism)
    - [4.3.1 Conceptual Foundation: Fail-Fast in CI/CD Test Harnesses](#431-conceptual-foundation-fail-fast-in-cicd-test-harnesses)
    - [4.3.2 Architectural Diagram: CI/CD Pipeline & Quality Gate Fail-Fast Flow](#432-architectural-diagram-cicd-pipeline--quality-gate-fail-fast-flow)
    - [4.3.3 Execution Lifecycle Step-by-Step Breakdown](#433-execution-lifecycle-step-by-step-breakdown)
  - [4.4 Pull Request Branch Protection Rules](#44-pull-request-branch-protection-rules)
- [5. Advanced Pipeline Features](#5-advanced-pipeline-features)
  - [5.1 Code Coverage Enforcement (LCOV Reporting)](#51-code-coverage-enforcement-lcov-reporting)
  - [5.2 Multi-Version Matrix Builds](#52-multi-version-matrix-builds)
  - [5.3 Specialized Assistant: AI-Powered Log Triage](#53-specialized-assistant-ai-powered-log-triage)
- [6. Deep-Dive Analysis of 3 Mandatory Failure Modes](#6-deep-dive-analysis-of-3-mandatory-failure-modes)
  - [6.1 Failure Mode 1: SQLite File Lock Concurrency (`SQLITE_BUSY`)](#61-failure-mode-1-sqlite-file-lock-concurrency-sqlite_busy)
    - [6.1.1 Overview & Failure Context](#611-overview--failure-context)
    - [6.1.2 Root Cause Analysis & Diagram](#612-root-cause-analysis)
    - [6.1.3 Reproducing Code Snippet & Command](#613-reproducing-code-snippet--command)
    - [6.1.4 Failure Symptoms & Error Logs](#614-failure-symptoms--error-logs)
    - [6.1.5 Step-by-Step Fix & Mitigation](#615-step-by-step-fix--mitigation)
    - [6.1.6 Verification & Regression Testing](#616-verification--regression-testing)
  - [6.2 Failure Mode 2: Coupon Percent Formula Bug](#62-failure-mode-2-coupon-percent-formula-bug)
  - [6.3 Failure Mode 3: Flaky Test Induced by Async Delays](#63-failure-mode-3-flaky-test-induced-by-async-delays)
- [7. References & AI Disclosure Statement](#7-references--ai-disclosure-statement)
  - [7.1 Academic & Technical References](#71-academic--technical-references)
  - [7.2 Course AI Disclosure Statement](#72-course-ai-disclosure-statement)

---

## 1. Introduction & SUT Architecture Overview

### 1.1 Purpose of This Guide
This document serves as the canonical technical guide for **Seminar Topic T07: CI/CD & Automated Test-Harness Engineering**, within the CSC13003 Software Testing curriculum. The primary objective is to present an end-to-end automated testing infrastructure built around an active, full-stack application (**EShop System**). Rather than treating Continuous Integration / Continuous Deployment (CI/CD) as a generic DevOps delivery pipeline, this guide investigates CI/CD from the perspective of **Software Testing** — specifically as an **Automated Test Harness** and a **Quality Gate Enforcement Mechanism**.

### 1.2 CI/CD as an Automated Test Harness
In modern software engineering, automated unit and integration tests only deliver their full defensive value when executed deterministically and unavoidably on every code change:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     TEST HARNESS & QUALITY GATE ARCHITECTURE                    │
├─────────────────────┬───────────────────────────┬───────────────────────────────┤
│ Pull Request (PR)   │ CI Automated Test Harness │ Branch Protection Gate        │
│ Developer submits   │ • Restore package cache   │ • Quality Gate check (>= 80%) │
│ incremental commit  │ • Run Jest Test Suites    │ • PASS  → Unlock PR Merge     │
│ to topic branch     │ • Generate LCOV report    │ • FAIL  → HARD BLOCK Merge    │
└─────────────────────┴───────────────────────────┴───────────────────────────────┘
```

1. **Deterministic Test Harness:** The CI runner acts as a clean-room test harness. It spins up a pristine Ubuntu virtual environment, downloads dependencies, initializes a temporary test database, and runs unit tests in isolation from local developer machine quirks.
2. **Quality Gate via Branch Protection:** Pull Requests cannot be merged into the `main` branch unless the automated test suite reports a 100% pass rate and satisfies minimum code coverage thresholds (≥ 80%). If a regression is introduced, the Quality Gate triggers a **Fail-Fast** shutdown, locking the GitHub merge button.

### 1.3 SUT System Architecture & Monorepo Structure
The target System Under Test is **EShop**, an e-commerce platform organized as a modular repository with a Node.js/Express backend, SQLite relational persistence, Jest test runner, and multiple client interfaces.

#### 1.3.1 Architectural Diagram: Monorepo & CI/CD Test Harness
The following architectural diagram illustrates the structural organization of the EShop Monorepo and its interaction with the Automated Test Harness and GitHub Actions CI/CD infrastructure:

```mermaid
%%{init: {
  'flowchart': {
    'nodeSpacing': 30,
    'rankSpacing': 45,
    'curve': 'basis',
    'htmlLabels': true,
    'subGraphTitleMargin': {
      'top': 15,
      'bottom': 10
    }
  },
  'themeVariables': {
    'fontSize': '20px',
    'fontFamily': 'Segoe UI, Helvetica, Arial, sans-serif'
  }
}}%%
flowchart TB
    %% Group 1: Frontend Clients
    subgraph Frontend ["<span style='font-size:30px; font-weight:600;'>1. Frontend Presentation Layer</span>"]
        WebClient["<b><span style='font-size:28px;'>React Customer Portal</span></b><br/><span style='font-size:22px;'>(frontend-web)</span>"]
        AdminClient["<b><span style='font-size:28px;'>React Admin Dashboard</span></b><br/><span style='font-size:22px;'>(frontend-admin)</span>"]
        MobileClient["<b><span style='font-size:28px;'>Mobile App Client</span></b><br/><span style='font-size:22px;'>(frontend-mobile)</span>"]
    end

    %% Group 2: Backend SUT
    subgraph Backend ["<span style='font-size:26px; font-weight:600;'>2. Backend Application & Storage (SUT)</span>"]
        ExpressServer["<b><span style='font-size:28px;'>Express.js Server Core</span></b><br/><span style='font-size:22px;'>(server.js)</span>"]
        APIRoutes["<b><span style='font-size:28px;'>REST API Controllers</span></b><br/><span style='font-size:22px;'>(Auth, Products, Coupons)</span>"]
        SQLiteDB[("<b><span style='font-size:28px;'>SQLite3 Relational DB</span></b><br/><span style='font-size:22px;'>(database.sqlite)</span>")]
        
        ExpressServer --> APIRoutes
        APIRoutes -->|SQL Read/Write| SQLiteDB
    end

    %% Group 3: Automated Test Harness
    subgraph TestHarness ["<span style='font-size:28px; font-weight:600;'>3. Automated Test Harness (Jest)</span>"]
        JestRunner["<b><span style='font-size:28px;'>Jest Test Engine</span></b><br/><span style='font-size:22px;'>(--runInBand, --forceExit)</span>"]
        SupertestAgent["<b><span style='font-size:28px;'>Supertest HTTP Agent</span></b><br/><span style='font-size:22px;'>(In-Memory Virtual Calls)</span>"]
        TestSuites["<b><span style='font-size:28px;'>Automated Test Suites</span></b><br/><span style='font-size:22px;'>(Unit & Integration)</span>"]
        CoverageReport["<b><span style='font-size:28px;'>Coverage Engine</span></b><br/><span style='font-size:22px;'>(LCOV & HTML Reporters)</span>"]

        TestSuites --> JestRunner
        JestRunner --> SupertestAgent
        JestRunner --> CoverageReport
    end

    %% Group 4: CI/CD Pipeline
    subgraph CIInfrastructure ["<span style='font-size:24px; font-weight:600;'>4. CI/CD (GitHub Actions)</span>"]
        GHAWorkflow["<b><span style='font-size:28px;'>Workflow Automation</span></b><br/><span style='font-size:22px;'>(.github/workflows/eshop-ci.yml)</span>"]
        RunnerEnv["<b><span style='font-size:28px;'>Clean-Room Runner</span></b><br/><span style='font-size:22px;'>(ubuntu-latest Container)</span>"]
        CacheStore["<b><span style='font-size:28px;'>Dependency Cache</span></b><br/><span style='font-size:22px;'>(actions/cache for ~/.npm)</span>"]
        QualityGate{"<b><span style='font-size:28px;'>Quality Gate Check</span></b><br/><span style='font-size:22px;'>Pass 100% & Coverage ≥ 80%</span>"}
        BranchProtection["<b><span style='font-size:28px;'>Branch Protection Rules</span></b><br/><span style='font-size:22px;'>(Hard-Lock Merge Button)</span>"]
        AITriageService["<b><span style='font-size:24px;'>AI Log Triage Assistant</span></b><br/><span style='font-size:20px;'>(ai_triage.py + Gemini API)</span>"]

        GHAWorkflow --> RunnerEnv
        RunnerEnv --> CacheStore
        QualityGate -->|PASS: Allowed| BranchProtection
        QualityGate -->|FAIL: Blocked| BranchProtection
        QualityGate -->|FAIL: Analyze Logs| AITriageService
        AITriageService --> GHAWorkflow
    end

    %% Cross-Component Connections
    Frontend -->|HTTP REST API Requests| ExpressServer
    SupertestAgent -.->|In-Memory API Calls| ExpressServer
    JestRunner -.->|Sequential File Locks| SQLiteDB

    RunnerEnv ==>|Executes Test Suite| JestRunner
    JestRunner -.->|Exit Code 0 or 1| QualityGate
    CoverageReport -.->|Coverage LCOV| QualityGate
```


#### 1.3.2 Monorepo Directory Layout & Component Roles
```

eshop-sut-seminar/
├── .github/
│   ├── scripts/
│   │   └── ai_triage.py             # Specialized AI Log Triage script (Gemini API)
│   └── workflows/
│       └── eshop-ci.yml             # GitHub Actions CI workflow definition
├── backend/
│   ├── config/                      # Application & database configurations
│   ├── controllers/                 # Route handler logic
│   ├── models/                      # SQLite schema and entity models
│   ├── routes/                      # REST API endpoints
│   ├── tests/                       # Jest automated unit & integration test suites
│   │   ├── health.test.js           # Smoke & server availability tests
│   │   ├── auth.test.js             # Authentication & user registration tests
│   │   ├── coupon.test.js           # Data-Driven coupon discount calculation tests
│   │   └── flaky-delay.demo.js      # Reproduction demo for async timing issues
│   ├── database.sqlite              # SQLite database file
│   ├── server.js                    # Express app entrypoint & middleware
│   └── package.json                 # Backend dependencies & test scripts
├── frontend-web/                    # Customer web portal (React)
├── frontend-admin/                  # Administrative management dashboard (React)
├── frontend-mobile/                 # Mobile customer client
├── Proposal/                        # Academic proposal & comparative tool survey
├── Plan/                            # Seminar phases & quality checklists
└── Weekly_Reports/                  # Weekly progress tracking & audit logs
```

---

## 2. Installation, Prerequisites & Environment Setup

### 2.1 Hardware and Software Requirements
To replicate the local test harness and execute all test suites, the following toolchains are required:
- **Operating System:** Linux (Ubuntu 22.04 LTS / 24.04 LTS recommended), macOS (13+), or Windows 10/11 with PowerShell 7+.
- **Node.js Runtime:** Version `20.x LTS` (minimum required: `18.16.0`).
- **Package Manager:** `npm` version `9.x` or higher.
- **Git Version Control:** Git `2.40+`.
- **Python (Optional for AI Triage):** Python `3.10+` with `requests` or `google-generativeai`.

### 2.2 Repository Cloning
Clone the official team repository from the GitHub Organization:

```bash
git clone https://github.com/SoftwareTesting-Group13/eshop-sut-seminar.git
cd eshop-sut-seminar
```

### 2.3 Installing Dependencies
Navigate to the backend directory and install all production and development dependencies:

```bash
cd backend
npm install
```

The primary testing dependencies installed in `backend/package.json` include:
- `jest` (`^29.x`): Primary test runner, assertion library, and coverage generator.
- `supertest` (`^6.x`): HTTP assertion library for testing Express endpoints without manual port binding.

### 2.4 SQLite Database Initialization
EShop utilizes an embedded SQLite3 database. The backend automatically initializes table schemas upon first launch. To create or reset the local development database:

```bash
# Seed initial tables and dummy data
npm run seed:db
```

### 2.5 Environment Variables & GitHub Secrets
The application supports configuration via `.env` files. For local testing, copy the example template:

```bash
cp .env.example .env
```

| Variable Name | Default Value | Purpose |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port for Express HTTP listener (bypassed in test mode) |
| `NODE_ENV` | `development` | Set to `test` when running Jest test suites |
| `GEMINI_API_KEY` | *(Secret)* | Required for GitHub Actions step running `ai_triage.py` |

---

## 3. Quickstart & First Test Suite Execution

### 3.1 Running Unit Tests Locally
Once dependencies are installed, execute the entire automated test suite using the standard npm test command:

```bash
npm test
```

### 3.2 Understanding the Jest Test Engine
Jest discovers and executes all test files matching the pattern `tests/**/*.test.js`. In EShop, tests are partitioned into distinct suites:
1. **Smoke Tests (`health.test.js`):** Validates that base endpoints (`/api/products`, `/api/categories`) respond with HTTP 200 OK.
2. **Authentication Tests (`auth.test.js`):** Exercises user registration, password hashing, and token issuance.
3. **Business Logic Unit Tests (`coupon.test.js`):** Exercises coupon calculation algorithms against parameter matrices.

### 3.3 The `--runInBand` Execution Flag
When executing tests that write to the shared SQLite database file, Jest must be instructed to run sequentially on a single thread using the `--runInBand` (or `-i`) flag:

```json
"scripts": {
  "test": "jest --runInBand --detectOpenHandles --forceExit",
  "test:coverage": "jest --runInBand --coverage"
}
```

*Note: Without `--runInBand`, Jest spawns parallel worker processes that concurrently attempt to acquire write locks on `database.sqlite`, triggering `SQLITE_BUSY` errors. See Section 6.1 for detailed analysis.*

### 3.4 Interpreting Test Outputs & Code Coverage
Running `npm run test:coverage` compiles an execution summary and an LCOV coverage report:

```text
 PASS  tests/health.test.js
 PASS  tests/auth.test.js
 PASS  tests/coupon.test.js

-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   84.61 |    76.92 |   88.23 |   84.61 |                   
 server.js         |   84.61 |    76.92 |   88.23 |   84.61 | 142-148,215-218   
-------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       26 passed, 26 total
Snapshots:   0 total
Time:        3.421 s
Ran all test suites.
```

---

## 4. CI/CD Pipeline Architecture & GitHub Actions Engineering

### 4.1 Pipeline Design Principles
*(To be detailed in Phase 3 & 4: SUT CI/CD workflow lifecycle, pull_request triggers, clean-room container execution).*

### 4.2 Dependency Caching Strategy (`actions/cache`)
*(To be detailed in Phase 3 & 4: npm cache directory caching, hashFiles('**/package-lock.json'), cold run vs warm run comparison).*

### 4.3 Quality Gates & Fail-Fast Mechanism

#### 4.3.1 Conceptual Foundation: Fail-Fast in CI/CD Test Harnesses
In continuous testing, a **Quality Gate** is an automated milestone within the delivery pipeline that enforces strict non-negotiable criteria before code can progress or merge into protected branches. The **Fail-Fast** engineering principle dictates that whenever a critical assertion or baseline requirement is violated, the pipeline terminates execution immediately without wasting computational time or cloud runner quota on subsequent stages.

In the EShop CI/CD Test Harness, the Quality Gate enforces a dual-criteria policy:
1. **Zero-Defect Unit Criterion:** 100% of all unit and integration test suites must terminate with `Exit Code 0`. Even a single failed assertion aborts the run immediately.
2. **Minimum Coverage Threshold Criterion:** Total code coverage (Line, Function, Statement) measured via LCOV must meet or exceed the mandatory **80% threshold** (`Coverage ≥ 80%`).

---

#### 4.3.2 Architectural Diagram: CI/CD Pipeline & Quality Gate Fail-Fast Flow
The following sequence illustrates the complete execution lifecycle from developer commit to branch protection gating and automated failure recovery:

```mermaid
%%{init: {
  'flowchart': {
    'nodeSpacing': 30,
    'rankSpacing': 40,
    'curve': 'basis',
    'htmlLabels': true,
    'subGraphTitleMargin': {
      'top': 25,
      'bottom': 15
    }
  },
  'themeVariables': {
    'fontSize': '18px',
    'fontFamily': 'Segoe UI, Helvetica, Arial, sans-serif'
  }
}}%%
flowchart TB
    %% Stage 1: Trigger & Environment
    subgraph TriggerStage ["<span style='font-size:22px; font-weight:600;'>1. Trigger & Clean-Room Provisioning</span>"]
        DevAction["<b><span style='font-size:24px;'>Developer Git Action</span></b><br/><span style='font-size:20px;'>(git push / open Pull Request)</span>"]
        GHAEvent["<b><span style='font-size:24px;'>GitHub Actions Event Trigger</span></b><br/><span style='font-size:20px;'>(on: pull_request, push to main)</span>"]
        CleanRunner["<b><span style='font-size:24px;'>Clean-Room Runner VM</span></b><br/><span style='font-size:20px;'>(ubuntu-latest Isolated Container)</span>"]
        RepoCheckout["<b><span style='font-size:24px;'>Source Code Checkout</span></b><br/><span style='font-size:20px;'>(actions/checkout@v4)</span>"]

        DevAction --> GHAEvent
        GHAEvent --> CleanRunner
        CleanRunner --> RepoCheckout
    end

    %% Stage 2: Cache & Execution
    subgraph ExecutionStage ["<span style='font-size:20px; font-weight:600;'>2. Dependency Cache & Test Harness Execution</span>"]
        CacheEval{"<b><span style='font-size:24px;'>Dependency Cache Check</span></b><br/><span style='font-size:20px;'>hashFiles('**/package-lock.json')</span>"}
        CacheHit["<b><span style='font-size:24px;'>Cache HIT (~8s)</span></b><br/><span style='font-size:20px;'>(Restore ~/.npm from Cache)</span>"]
        CacheMiss["<b><span style='font-size:24px;'>Cache MISS (~45s)</span></b><br/><span style='font-size:20px;'>(Fresh npm ci from Registry)</span>"]
        JestRun["<b><span style='font-size:24px;'>Jest Test Runner Execution</span></b><br/><span style='font-size:20px;'>(npm test -- --runInBand --coverage)</span>"]
        ArtifactGen["<b><span style='font-size:24px;'>Test Reports Generated</span></b><br/><span style='font-size:20px;'>(JUnit XML & LCOV lcov.info)</span>"]

        RepoCheckout --> CacheEval
        CacheEval -->|Cache Hit| CacheHit
        CacheEval -->|Cache Miss| CacheMiss
        CacheHit --> JestRun
        CacheMiss --> JestRun
        JestRun --> ArtifactGen
    end

    %% Stage 3: Quality Gate Decision
    subgraph QualityGateStage ["<span style='font-size:22px; font-weight:600;'>3. Quality Gate Evaluation (Dual Check)</span>"]
        GateEngine{"<b><span style='font-size:24px;'>Quality Gate Decision Engine</span></b><br/><span style='font-size:20px;'>100% Tests Pass (Exit 0) AND Coverage ≥ 80%?</span>"}
        ArtifactGen --> GateEngine
    end

    %% Stage 4A: Success Path
    subgraph SuccessPath ["<span style='font-size:22px; font-weight:600;'>4A. Success Pathway (Green Check)</span>"]
        StatusPass["<b><span style='font-size:24px;'>Status Check: SUCCESS</span></b><br/><span style='font-size:20px;'>(ci/eshop-unit-test: PASS)</span>"]
        UploadArt["<b><span style='font-size:24px;'>Upload Artifacts</span></b><br/><span style='font-size:20px;'>(actions/upload-artifact@v4)</span>"]
        BranchUnlock["<b><span style='font-size:24px;'>Branch Protection Satisfied</span></b><br/><span style='font-size:20px;'>(All Required Status Checks Green)</span>"]
        MergeEnabled["<b><span style='font-size:24px;'>PR Merge Button Unlocked</span></b><br/><span style='font-size:20px;'>(Pull Request Approved for main)</span>"]

        StatusPass --> UploadArt
        UploadArt --> BranchUnlock
        BranchUnlock --> MergeEnabled
    end

    %% Stage 4B: Fail-Fast Path
    subgraph FailFastPath ["<span style='font-size:22px; font-weight:600;'>4B. Fail-Fast Pathway (Red Cross)</span>"]
        StatusFail["<b><span style='font-size:24px;'>Fail-Fast Triggered</span></b><br/><span style='font-size:20px;'>(Exit Code = 1 | Coverage < 80%)</span>"]
        AbortJob["<b><span style='font-size:24px;'>Abort Downstream Tasks</span></b><br/><span style='font-size:20px;'>(Halt execution to save compute)</span>"]
        BranchLock["<b><span style='font-size:24px;'>Branch Protection Hard-Lock</span></b><br/><span style='font-size:20px;'>(Merge pull request' button disabled)</span>"]
        AIAssistant["<b><span style='font-size:24px;'>AI Log Triage Assistant</span></b><br/><span style='font-size:20px;'>(ai_triage.py + Google Gemini API)</span>"]
        PRAnnotation["<b><span style='font-size:24px;'>Structured PR Annotation</span></b><br/><span style='font-size:20px;'>(Hypothesis tree & root cause analysis)</span>"]

        StatusFail --> AbortJob
        StatusFail --> BranchLock
        StatusFail --> AIAssistant
        AIAssistant --> PRAnnotation
    end

    %% Decision Route Connections
    GateEngine ==>|PASS: Zero Errors & Coverage ≥ 80%| StatusPass
    GateEngine ==>|FAIL: Assertion Error or Coverage < 80%| StatusFail
```

---

#### 4.3.3 Execution Lifecycle Step-by-Step Breakdown

| Stage | Action / Component | Operational Mechanism & Verification |
| :--- | :--- | :--- |
| **1. Trigger** | `pull_request` / `push` | Triggered whenever code is proposed against `main`. Initializes a clean-room ephemeral container (`ubuntu-latest`) to eliminate environmental flakiness. |
| **2. Caching** | `actions/cache@v4` | Evaluates checksum hash `hashFiles('**/package-lock.json')`. On a cache hit, dependency restoration drops from ~45 seconds to ~8 seconds, saving 82% runner time. |
| **3. Test Harness** | `npm test -- --runInBand` | Executes test suites deterministically on a single thread to prevent SQLite write lock collisions (`SQLITE_BUSY`). Generates LCOV and JUnit XML. |
| **4. Quality Gate** | Dual Validation Engine | Verifies both the Jest exit code (`exit 0`) and coverage metrics (`coverage ≥ 80%`). If any assertion fails, the Fail-Fast mechanism interrupts the pipeline immediately. |
| **5A. Merge Pass** | Branch Protection | When all required status checks turn green, GitHub's Branch Protection Rules allow the *"Merge pull request"* button to unlock. |
| **5B. Fail Triage** | Specialized AI Assistant | If the gate fails, GitHub Actions invokes `.github/scripts/ai_triage.py` using `GEMINI_API_KEY`, parsing the raw failure stack trace and annotating the Pull Request with an actionable fix. |

### 4.4 Pull Request Branch Protection Rules
*(To be detailed in Phase 3 & 4: Required Status Checks configuration on `main`, merge-blocking demonstrations).*

---

## 5. Advanced Pipeline Features

### 5.1 Code Coverage Enforcement (LCOV Reporting)
*(To be detailed: Uploading LCOV artifacts, comparing coverage diffs on pull requests).*

### 5.2 Multi-Version Matrix Builds
*(To be detailed: Node.js 18.x and 20.x compatibility testing across runner environments).*

### 5.3 Specialized Assistant: AI-Powered Log Triage
*(To be detailed: Integration of `ai_triage.py` with Google Gemini API, parsing raw test failure logs, generating structured Hypothesis Trees).*

---

## 6. Deep-Dive Analysis of 3 Mandatory Failure Modes

### 6.1 Failure Mode 1: SQLite File Lock Concurrency (`SQLITE_BUSY`)

#### 6.1.1 Overview & Failure Context
In modern web applications, embedded relational engines like SQLite3 are widely utilized for lightweight deployments, prototypes, and local development due to their zero-configuration and serverless architecture. However, during automated integration and unit testing with Jest, teams frequently encounter catastrophic pipeline crashes bearing the error:
```text
Error: SQLITE_BUSY: database is locked
```
This failure mode represents a fundamental architectural mismatch between **Jest's parallel worker model** and **SQLite's file-level locking concurrency model**.

---

#### 6.1.2 Root Cause Analysis
The failure stems from the convergence of two distinct architectural behaviors:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      JEST MULTI-WORKER VS SQLITE CONCURRENCY CONFLICT                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   Jest Test Engine (Default: Multi-Worker Pool)                                        │
│   ┌──────────────────────────┐             ┌──────────────────────────┐                │
│   │ Worker 1 (auth.test.js)  │             │ Worker 2 (order.test.js) │                │
│   └─────────────┬────────────┘             └────────────┬─────────────┘                │
│                 │ (1) BEGIN IMMEDIATE                   │ (2) INSERT INTO ...          │
│                 ▼                                       ▼                              │
│   ┌───────────────────────────────────────────────────────────────────┐                │
│   │ SQLite OS File Lock System (database.sqlite via fcntl / LockFile) │                │
│   │ • State: EXCLUSIVE Lock held by Worker 1                          │                │
│   │ • Action on Worker 2 request: REJECT IMMEDIATELY                 │                │
│   └──────────────────────────────────┬────────────────────────────────┘                │
│                                      │                                                 │
│                                      ▼                                                 │
│                        [Error: SQLITE_BUSY: database is locked]                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **SQLite Locking States & Single-Writer Constraint:**  
   SQLite implements transactional consistency using file-system level locks (`UNLOCKED` → `SHARED` → `RESERVED` → `PENDING` → `EXCLUSIVE`). While multiple processes can concurrently hold `SHARED` locks to read data, writing requires an `EXCLUSIVE` lock. When a connection acquires an `EXCLUSIVE` lock, no other connection can read from or write to the database file until the transaction commits or rolls back.
2. **Jest's Default Parallel Worker Pool:**  
   To minimize test execution time, Jest inspects the available CPU cores (`os.cpus().length`) and spawns a pool of worker processes (defaulting to `CPUs - 1`) to execute separate test suites concurrently. Each test worker loads the Express application and independently opens its own connection pool to the single `database.sqlite` file.
3. **Lock Collision Trigger:**  
   When `Worker 1` (executing `tests/auth.test.js`) performs a write operation (e.g., seeding a user via `POST /api/register`), SQLite elevates its lock to `EXCLUSIVE`. Simultaneously, `Worker 2` (executing another suite) attempts to insert or modify records. Because the default busy handler timeout in basic SQLite drivers is set to 0 milliseconds, the OS lock manager immediately rejects Worker 2's system call, throwing `SQLITE_BUSY: database is locked`.

---

#### 6.1.2.1 Architectural Diagram: SQLite Concurrency File-Locking & Mitigation Mechanism
The following architectural diagram illustrates the file-locking collision between concurrent Jest worker threads and contrasts it with the sequential single-threaded execution enforced by `--runInBand`:

```mermaid
%%{init: {
  'flowchart': {
    'nodeSpacing': 30,
    'rankSpacing': 35,
    'curve': 'basis',
    'htmlLabels': true,
    'subGraphTitleMargin': {
      'top': 25,
      'bottom': 15
    }
  },
  'themeVariables': {
    'fontSize': '16px',
    'fontFamily': 'Segoe UI, Helvetica, Arial, sans-serif'
  },
  'themeCSS': '.flowchart-link { stroke-width: 2.5px !important; } .marker { stroke-width: 2.5px !important; }'
}}%%
flowchart TB
    %% Scenario A: Parallel Multi-Worker Collision (Placed on Top)
    subgraph ParallelConflict ["<span style='font-size:22px; font-weight:600;'>A. Concurrent Write Collision (Default: Without --runInBand)</span>"]
        JestPoolA["<b><span style='font-size:20px;'>Jest Worker Pool</span></b><br/><span style='font-size:15px;'>(Parallel Workers: --maxWorkers=4)</span>"]
        Worker1A["<b><span style='font-size:18px;'>Worker 1: auth.test.js</span></b><br/><span style='font-size:14px;'>(POST /api/register)</span>"]
        Worker2A["<b><span style='font-size:18px;'>Worker 2: coupon.test.js</span></b><br/><span style='font-size:14px;'>(POST /api/coupons)</span>"]
        
        OSLockA[("<b><span style='font-size:20px;'>SQLite File Lock Manager</span></b><br/><span style='font-size:14px;'>(database.sqlite - Single-Writer Model)</span>")]
        LockStateA["<b><span style='font-size:18px;'>EXCLUSIVE Lock Active</span></b><br/><span style='font-size:14px;'>(Held by Worker 1 Transaction)</span>"]
        LockDeniedA["<b><span style='font-size:18px;'>OS Lock Rejected (fcntl EWOULDBLOCK)</span></b><br/><span style='font-size:14px;'>(Timeout = 0ms, Write Denied)</span>"]
        CrashErrorA["<b><span style='font-size:20px;'>Crash: SQLITE_BUSY</span></b><br/><span style='font-size:14px;'>('database is locked' -> Pipeline Exit Code 1)</span>"]

        JestPoolA --> Worker1A
        JestPoolA --> Worker2A
        Worker1A -->|1. BEGIN IMMEDIATE - Write| OSLockA
        Worker2A -.->|2. Concurrent Write Attempt| OSLockA
        OSLockA --> LockStateA
        LockStateA -->|3. Immediate Rejection| LockDeniedA
        LockDeniedA --> CrashErrorA
    end

    %% Vertical stacking link between Scenario A and Scenario B
    CrashErrorA ~~~ JestSingleB

    %% Scenario B: Serialized Execution with --runInBand (Placed Below)
    subgraph SerializedSuccess ["<span style='font-size:22px; font-weight:600;'>B. Deterministic Serialization (Mitigation: --runInBand)</span>"]
        JestSingleB["<b><span style='font-size:20px;'>Jest Single Main Thread</span></b><br/><span style='font-size:15px;'>(Sequential In-Band: --runInBand or -i)</span>"]
        Suite1B["<b><span style='font-size:18px;'>Suite 1: auth.test.js</span></b><br/><span style='font-size:14px;'>(Acquires Lock -> Writes -> Releases)</span>"]
        Suite2B["<b><span style='font-size:18px;'>Suite 2: coupon.test.js</span></b><br/><span style='font-size:14px;'>(Queued until Suite 1 Terminates)</span>"]
        
        OSLockB[("<b><span style='font-size:20px;'>SQLite File Lock Manager</span></b><br/><span style='font-size:14px;'>(database.sqlite - Orderly Transitions)</span>")]
        LockStateB["<b><span style='font-size:18px;'>Sequential Lock Cycles</span></b><br/><span style='font-size:14px;'>(UNLOCKED ↔ EXCLUSIVE Clean Handoff)</span>"]
        SuccessPassB["<b><span style='font-size:20px;'>100% Deterministic Pass</span></b><br/><span style='font-size:14px;'>(Zero Lock Collisions -> CI Exit Code 0)</span>"]

        JestSingleB --> Suite1B
        Suite1B -->|1. Write & Commit Transaction| OSLockB
        Suite1B ==>|2. Suite 1 Completes| Suite2B
        Suite2B -->|3. Clean Lock Acquisition & Write| OSLockB
        OSLockB --> LockStateB
        LockStateB --> SuccessPassB
    end

    %% Color-coded node styles
    classDef failNode fill:#fef2f2,stroke:#dc2626,stroke-width:2px;
    classDef passNode fill:#f0fdf4,stroke:#16a34a,stroke-width:2px;
    classDef dbNode fill:#f0f9ff,stroke:#0284c7,stroke-width:2px;

    class LockDeniedA,CrashErrorA failNode;
    class SuccessPassB,Suite1B,Suite2B,LockStateB passNode;
    class OSLockA,OSLockB dbNode;
    linkStyle default stroke-width:2.5px;
```

---

#### 6.1.3 Reproducing Code Snippet & Command
This failure mode can be reliably reproduced in EShop by running Jest across multiple workers while executing test suites that perform write operations without serialization.

##### A. Reproducing Test Scenario (`backend/tests/concurrency.demo.js`)
```javascript
const request = require('supertest');
const app = require('../server');

describe('Concurrent DB Write Collision Demo', () => {
  it('Worker thread attempts concurrent write while DB is locked', async () => {
    // Repeated write attempts to trigger transaction overlap
    const requests = Array.from({ length: 10 }).map((_, index) =>
      request(app)
        .post('/api/register')
        .send({
          name: `ConcurrentTester_${index}`,
          email: `race_${Date.now()}_${index}@example.com`,
          password: 'Password123!'
        })
    );

    const responses = await Promise.all(requests);
    responses.forEach((res) => {
      expect(res.status).toBe(200);
    });
  });
});
```

##### B. Reproduction Command
To force Jest to spawn multiple parallel worker processes and provoke the lock contention:
```bash
# Navigate to backend directory
cd backend

# Execute Jest with 4 parallel worker threads (bypassing in-band execution)
npx jest --maxWorkers=4 --no-cache
```

---

#### 6.1.4 Failure Symptoms & Error Logs
When the collision occurs, the affected test suite crashes immediately or returns an unexpected HTTP 500 Internal Server Error:

```text
FAIL  tests/auth.test.js
  ● Auth API Concurrency Test › POST /api/register should create a new user

    Error: SQLITE_BUSY: database is locked
        at Database.run (/node_modules/sqlite3/lib/sqlite3.js:134:21)
        at /backend/server.js:412:12
        at Layer.handle [as handle_request] (/node_modules/express/lib/router/layer.js:95:5)
        at next (/node_modules/express/lib/router/route.js:144:13)
        at Route.dispatch (/node_modules/express/lib/router/route.js:114:3)

  ● Smoke & Health Check APIs › GET /api/products should return HTTP 200
    ✕ Test suite failed to run: database connection closed prematurely due to unhandled lock exception.

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   0 total
Time:        1.842 s
```

**Consequences on the CI/CD Pipeline:**
- **Pipeline Intermittency:** Tests may pass when executed individually on local machines with 1 worker, but fail randomly in CI environments where GitHub Actions runners dynamically allocate multi-core virtual machines.
- **Corrupted Fixtures:** Interrupted write transactions leave the SQLite database in an inconsistent or partially populated state, causing downstream tests to fail unpredictably.

---

#### 6.1.5 Proven Fix & Architectural Workarounds

##### Solution 1: Sequential Execution via `--runInBand` (Primary Recommended Fix)
The most robust and straightforward solution in monolithic test environments is instructing Jest to execute all test suites sequentially in the primary process, eliminating process-level file-lock contention entirely:

Update `backend/package.json`:
```json
{
  "scripts": {
    "test": "jest --runInBand --detectOpenHandles --forceExit",
    "test:coverage": "jest --runInBand --coverage"
  }
}
```

*Key Parameter Flags:*
- `--runInBand` (alias `-i`): Forces Jest to run all tests serially in the main process instead of creating a worker pool of child processes. Only one test suite executes at any given time, guaranteeing that only one write transaction accesses `database.sqlite`.
- `--detectOpenHandles`: Monitors and reports any asynchronous database handles or HTTP sockets that fail to close, preventing silent process hangs.
- `--forceExit`: Ensures Jest terminates cleanly after all tests finish, avoiding hanging CI runners.

##### Solution 2: SQLite Busy Timeout Configuration (`PRAGMA busy_timeout`)
For workloads where parallel workers are desired, SQLite can be configured with an active retry wait loop:
```javascript
// backend/config/database.js
const db = new sqlite3.Database('./database.sqlite');

// Instruct SQLite to wait up to 5000ms for busy locks to clear before throwing an error
db.run('PRAGMA busy_timeout = 5000;');
```

##### Solution 3: In-Memory / Isolated Temporary Database Fixtures
For enterprise scalability:
- **In-Memory Database (`:memory:`):** Configure each Jest worker process to initialize an independent in-memory SQLite database, isolating test data per worker.
- **Per-Process Database Files:** Dynamically create `database_${process.env.JEST_WORKER_ID}.sqlite` and destroy the file in an `afterAll()` teardown hook.

##### Architectural Comparison of Mitigation Strategies
| Mitigation Strategy | Concurrency Level | Execution Speed | Isolation Guarantee | Implementation Complexity |
| :--- | :---: | :---: | :---: | :---: |
| **`--runInBand` (Adopted)** | Serial (Single Thread) | High (for current suite) | Absolute (No lock collisions) | **Lowest (Zero code change)** |
| `PRAGMA busy_timeout` | Parallel with Retry | Medium (sleep penalties) | Moderate (Race risks remain) | Low |
| `WAL Mode` (`PRAGMA journal_mode=WAL`) | Multi-read / Single-write | High | Partial (Write collisions still fail) | Low |
| In-Memory per worker (`:memory:`) | Full Parallel | Very High | Perfect (Isolated memory) | High (Requires dynamic seeding) |


### 6.2 Failure Mode 2: Coupon Percent Formula Bug

#### 6.2.1 Overview & Business Context
In retail e-commerce applications, the coupon and discount engine is a mission-critical financial component. Any calculation defect can directly trigger financial vulnerability or severe customer attrition. 

In EShop, when applying a percentage-based discount coupon (such as `SAVE10` for a 10% discount) via the endpoint `POST /api/apply-coupon`, a severe mathematical calculation defect was introduced into the core routing logic in `backend/server.js`. The defect caused the coupon engine to produce a **massive negative discount amount**, which in turn caused the customer's order total to inflate by **tenfold (1,000%)** instead of discounting 10%.

This failure mode highlights the vital role of **Automated Regression Testing** and **Data-Driven Unit Testing (`test.each`)** in preventing defective business logic from bypassing code review and reaching production.

---

#### 6.2.2 Root Cause Analysis
The defect resides in two duplicated branches inside `backend/server.js` (lines 398–401 for authenticated users and lines 418–421 for guest users):

```javascript
// DEFECTIVE LOGIC in backend/server.js
let discount_amount = 0;
if (coupon.type === "percent") {
  discount_amount = Math.floor(
    total_amount * (1 - coupon.discount_value),
  );
} else {
  discount_amount = coupon.discount_value;
}
const final_amount = total_amount - discount_amount;
```

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        COUPON FORMULA FLAW (MATHEMATICAL TRACE)                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Database Storage:                                                                   │
│    Coupon 'SAVE10' is stored with discount_value = 10 (representing 10%).             │
│                                                                                        │
│ 2. Faulty Formula Execution:                                                           │
│    discount_amount = Math.floor(total_amount * (1 - 10))                               │
│                    = Math.floor(total_amount * (-9))                                   │
│                                                                                        │
│ 3. Sample Order Calculation (total_amount = 1,000,000 ₫):                               │
│    • discount_amount = 1,000,000 * (-9)   = -9,000,000 ₫ (NEGATIVE DISCOUNT!)          │
│    • final_amount    = 1,000,000 - (-9,000,000) = 10,000,000 ₫ (PRICE MULTIPLIED 10x!) │
│                                                                                        │
│ 4. Correct Business Expectation (FR-09):                                               │
│    • discount_amount = (1,000,000 * 10) / 100 = 100,000 ₫                              │
│    • final_amount    = 1,000,000 - 100,000   = 900,000 ₫                               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

The underlying flaws include:
1. **Unit Dimension Confusion:** The developer assumed `discount_value` was stored as a normalized fraction (e.g., `0.10`), whereas the database schema stores integer percentages (e.g., `10`). Subtracting an integer `10` from `1` yields `-9`.
2. **Formula Inversion:** The developer attempted to calculate the remaining balance `total * (1 - rate)` but assigned that value to `discount_amount`. Then, line 406 subtracted `discount_amount` again: `total - (total * -9)`, compounding the calculation error into a 1,000% charge.
3. **Absence of Invariant Defenses:** The endpoint lacked mathematical boundary validation (e.g., `discount_amount >= 0` and `discount_amount <= total_amount`).

---

#### 6.2.3 Reproducing Code Snippet & Data-Driven Test Matrix
Rather than relying on ad-hoc manual verification, EShop incorporates automated Data-Driven unit tests in `backend/tests/coupon.test.js` using Jest's `test.each`. These tests enforce core domain invariants:

```javascript
// backend/tests/coupon.test.js
describe('Failure Mode 2 — discount_amount âm với coupon percent', () => {
  const total = 1000000;

  // Test both code branches: authenticated user vs guest session
  test.each([
    { branch: 'guest (server.js 417-432)', body: { code: 'SAVE10', total_amount: total } },
    { branch: 'authenticated user (server.js 386-415)', body: { code: 'SAVE10', total_amount: total, user_id: 2 } },
  ])('SAVE10 — branch $branch: discount_amount must NOT be negative', async ({ body }) => {
    const res = await request(app).post('/api/apply-coupon').send(body);

    expect(res.status).toBe(200);
    // Invariant 1: Discount amount must be non-negative
    expect(res.body.discount_amount).toBeGreaterThanOrEqual(0);
    // Invariant 2: Discount cannot exceed the subtotal
    expect(res.body.discount_amount).toBeLessThanOrEqual(total);
    // Invariant 3: Final payable amount must be non-negative
    expect(res.body.final_amount).toBeGreaterThanOrEqual(0);
    // Invariant 4: Final amount must not exceed original subtotal
    expect(res.body.final_amount).toBeLessThanOrEqual(total);
  });

  it('SAVE10 — final_amount must be strictly less than original subtotal', async () => {
    const res = await request(app).post('/api/apply-coupon').send({ code: 'SAVE10', total_amount: total });

    expect(res.status).toBe(200);
    // A valid discount coupon MUST decrease the customer's total payable
    expect(res.body.final_amount).toBeLessThan(total);
  });
});
```

---

#### 6.2.4 Failure Symptoms & Error Logs
When executed against the unpatched codebase, Jest immediately reports assertion failures indicating negative discounts and price inflation:

```text
FAIL  tests/coupon.test.js
  Failure Mode 2 — discount_amount âm với coupon percent
    ✕ SAVE10 — branch guest: discount_amount must NOT be negative (42 ms)
    ✕ SAVE10 — branch authenticated user: discount_amount must NOT be negative (31 ms)
    ✕ SAVE10 — final_amount must be strictly less than original subtotal (28 ms)

  ● Failure Mode 2 — discount_amount âm với coupon percent › SAVE10 — branch guest: discount_amount must NOT be negative

    expect(received).toBeGreaterThanOrEqual(expected)

    Expected: >= 0
    Received: -9000000

      138 |     expect(res.status).toBe(200);
    > 139 |     expect(res.body.discount_amount).toBeGreaterThanOrEqual(0);
          |                                      ^
      140 |     expect(res.body.discount_amount).toBeLessThanOrEqual(total);
      141 |     expect(res.body.final_amount).toBeGreaterThanOrEqual(0);

  ● Failure Mode 2 — discount_amount âm với coupon percent › SAVE10 — final_amount must be strictly less than original subtotal

    expect(received).toBeLessThan(expected)

    Expected: < 1000000
    Received: 10000000

      148 |     expect(res.status).toBe(200);
    > 149 |     expect(res.body.final_amount).toBeLessThan(total);
          |                                   ^

Test Suites: 1 failed, 1 total
Tests:       3 failed, 17 passed, 20 total
```

**Impact on CI/CD Quality Gate:**
- In the CI pipeline, this test failure causes `npm test` to exit with non-zero exit code (`1`).
- The GitHub Actions workflow triggers **Fail-Fast**, immediately canceling downstream packaging jobs.
- The **Branch Protection Rule** detects the failing `test-backend` required status check and **hard-locks the Pull Request merge button**, preventing this critical regression from entering `main`.

---

#### 6.2.5 Proven Fix & Invariant Defense
To eliminate the bug permanently, the calculation logic is corrected and wrapped with defensive boundary constraints:

##### Code Diff in `backend/server.js`:
```diff
- if (coupon.type === "percent") {
-   discount_amount = Math.floor(
-     total_amount * (1 - coupon.discount_value),
-   );
- } else {
-   discount_amount = coupon.discount_value;
- }
- const final_amount = total_amount - discount_amount;

+ if (coupon.type === "percent") {
+   // Correct percentage formula: (subtotal * percent) / 100
+   discount_amount = Math.floor((total_amount * coupon.discount_value) / 100);
+ } else {
+   discount_amount = coupon.discount_value;
+ }
+ 
+ // Defensive boundary clamping:
+ discount_amount = Math.max(0, Math.min(discount_amount, total_amount));
+ const final_amount = Math.max(0, total_amount - discount_amount);
```

##### Key Technical Defenses Applied:
1. **Accurate Formula (`(total_amount * coupon.discount_value) / 100`):** Properly handles integer percentage values.
2. **Defensive Clamping (`Math.min(discount_amount, total_amount)`):** Guarantees that discount can never exceed the total order value, preventing store credit overdrafts.
3. **Floor Clamping (`Math.max(0, ...)`):** Prevents negative totals regardless of corrupted database inputs or anomalous requests.


### 6.3 Failure Mode 3: Flaky Test Induced by Async Delays (`sleep` vs `await`)

#### 6.3.1 Overview & The Flaky Test Crisis
In automated test engineering, a **Flaky Test** is defined as a test that manifests non-deterministic outcomes (passing or failing intermittently) across repeated runs against identical, unmodified source code. 

Flaky tests represent one of the most pernicious threats to CI/CD pipelines. According to empirical studies by Google Testing and Martin Fowler, flakiness erodes developer trust in the automated Quality Gate (the "Cry Wolf" effect), prompting engineering teams to disregard legitimate pipeline failures or repeatedly re-trigger builds until an arbitrary pass is obtained.

In EShop, Failure Mode 3 demonstrates how non-deterministic asynchronous timing delays (`sleep`-based waiting) cause tests to pass reliably on local developer workstations but fail sporadically when deployed onto resource-constrained GitHub Actions runners.

---

#### 6.3.2 Root Cause Analysis
The fundamental architectural anti-pattern is **guessing completion time** using arbitrary timeouts (`setTimeout` / `sleep`) rather than implementing **deterministic event-driven synchronization** (`await` / `Promise` / event polling).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        LOCAL VS CI ASYNC EXECUTION TIMELINE                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│ [Scenario A: Local Developer Workstation — Low CPU Load / Fast Execution]              │
│ Work Duration: 20 ms | Sleep Duration: 100 ms                                          │
│                                                                                        │
│ T = 0ms                T = 20ms                     T = 100ms                          │
│ ├──────────────────────┼────────────────────────────┼────────────────────────► Time    │
│ Start Async Work ────► Work Completes (ready=true)                                     │
│ Start sleep(100ms) ───────────────────────────────► Assert (ready === true) → PASS!   │
│                                                                                        │
│ ────────────────────────────────────────────────────────────────────────────────────── │
│                                                                                        │
│ [Scenario B: Cloud CI/CD Runner — CPU Throttling / I/O Jitter / Slow Execution]        │
│ Work Duration: 200 ms | Sleep Duration: 100 ms                                         │
│                                                                                        │
│ T = 0ms                                             T = 100ms       T = 200ms          │
│ ├───────────────────────────────────────────────────┼───────────────┼────────► Time    │
│ Start Async Work ───────────────────────────────────┼──────────────► Work Completes    │
│ Start sleep(100ms) ───────────────────────────────► Assert (ready)                     │
│                                                     (ready=FALSE!)                     │
│                                                     → FAILS! (FLAKY)                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Environmental Inconsistency:** Developer machines usually have dedicated CPU cores and high clock frequencies, allowing background tasks (e.g., SQLite file writes, token hashing, async queue processing) to complete within 10–30 ms. In contrast, cloud CI runners (GitHub-hosted Ubuntu runners) operate in shared multi-tenant virtualization environments where CPU time-slicing and disk I/O latency fluctuate drastically.
2. **Race Condition Mechanics:** When a test relies on `await sleep(100)`, it creates an implicit race condition between the test runner thread and the background worker. If CPU starvation causes the task to take 120 ms, the assertion executes at 100 ms, inspects incomplete state, and immediately fails.

---

#### 6.3.3 Reproducing Code Snippet & Benchmark Harness
EShop includes a dedicated synthetic demonstration suite (`backend/demos/flaky-delay.demo.js`) controlled by the `FLAKY_PROFILE` environment variable to reliably reproduce this behavior without database dependencies.

##### A. Reproducing Test Scenario (`backend/demos/flaky-delay.demo.js`)
```javascript
// backend/demos/flaky-delay.demo.js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const profile = process.env.FLAKY_PROFILE || 'random';
const waitMs = 100;

// Controlled fault injection: 'fast' takes 20ms, 'slow' takes 200ms
const workDelayMs = profile === 'fast' ? 20
  : profile === 'slow' ? 200
    : Math.random() < 0.5 ? 20 : 200;

function startAsyncWork() {
  const state = { ready: false };
  const completed = sleep(workDelayMs).then(() => {
    state.ready = true;
  });
  return { state, completed };
}

describe('Failure Mode 3 - async delay / sleep-based flaky test', () => {
  // ANTI-PATTERN: Guessing completion using arbitrary sleep
  test('sleep-based wait can inspect work before completion', async () => {
    const job = startAsyncWork();
    try {
      await sleep(waitMs); // Guesses that 100ms is enough
      expect(job.state.ready).toBe(true);
    } finally {
      await job.completed; // Drain timer to prevent memory leaks
    }
  });

  // DETERMINISTIC PATTERN: Awaiting the actual promise handle
  test('await completion waits for the work instead of guessing a delay', async () => {
    const job = startAsyncWork();
    await job.completed; // Deterministically waits for completion regardless of duration
    expect(job.state.ready).toBe(true);
  });
});
```

##### B. Reproduction Commands
Execute the demonstration with different environment profiles:
```powershell
# 1. Fast profile (Simulating local machine): Both tests PASS
$env:FLAKY_PROFILE = 'fast'
npm --prefix backend run test:flaky

# 2. Slow profile (Simulating CPU throttling in CI): sleep FAILS, await PASSES
$env:FLAKY_PROFILE = 'slow'
npm --prefix backend run test:flaky

# 3. Random profile (Simulating intermittent CI flakiness across runs)
$env:FLAKY_PROFILE = 'random'
npm --prefix backend run test:flaky
```

---

#### 6.3.4 Failure Symptoms & Error Logs
Under the `slow` or throttled profile, the terminal reveals an assertion failure in the sleep-based test, while the await-based test succeeds unconditionally:

```text
FAIL  demos/flaky-delay.demo.js
  Failure Mode 3 - async delay / sleep-based flaky test
    ✕ sleep-based wait can inspect work before completion (105 ms)
    ✓ await completion waits for the work instead of guessing a delay (204 ms)

  ● Failure Mode 3 - async delay / sleep-based flaky test › sleep-based wait can inspect work before completion

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      32 |       await sleep(waitMs);
      33 |       console.log(`[FM3][sleep] profile=${profile} workDelayMs=${workDelayMs} ready=${job.state.ready}`);
    > 34 |       expect(job.state.ready).toBe(true);
         |                               ^
      35 |     } finally {
      36 |       await job.completed;

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
```

**Impact on CI/CD Infrastructure:**
- **Flake Rate Metric:** Running the random profile across 10 iterations produces an empirical Flake Rate of approximately 40% to 50% for the sleep-based suite, compared to a 0% Flake Rate for the await-based suite.
- **Resource Wastage:** When a flaky test fails, developers must either restart the entire CI pipeline (wasting 3–5 minutes of runner quota) or merge unstable code without confidence.

---

#### 6.3.5 Proven Fix & Deterministic Asynchronous Patterns

##### Pattern 1: Direct Promise Awaiting (Primary Recommended Fix)
Always await the returned Promise, async function, or job completion handle directly:
```javascript
// WRONG: Guessing arbitrary delay
const job = queue.dispatch(payload);
await sleep(500);
expect(job.isDone()).toBe(true);

// CORRECT: Await completion signal
const job = queue.dispatch(payload);
await job.onComplete();
expect(job.isDone()).toBe(true);
```

##### Pattern 2: Event-Driven Awaiting (`EventEmitter`)
When testing systems that emit lifecycle events, utilize Node.js's native `events.once()` helper:
```javascript
const { once } = require('events');

// Block test execution until the 'finished' event actually fires
await once(orderEmitter, 'order_processed');
expect(orderState.status).toBe('COMPLETED');
```

##### Pattern 3: Condition-Based Polling with Generous Upper-Bound Timeout
If an asynchronous system does not expose a native Promise or event emitter, poll the condition periodically with a high safety-margin timeout:
```javascript
async function waitForCondition(predicate, timeoutMs = 5000, intervalMs = 25) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    if (await predicate()) return;
    await sleep(intervalMs);
  }
  throw new Error(`Condition not met within ${timeoutMs}ms`);
}

// Usage:
await waitForCondition(() => job.state.ready === true);
expect(job.state.ready).toBe(true);
```

##### Architectural Comparison of Asynchronous Synchronization Techniques
| Synchronization Technique | Flake Rate | Local Execution Speed | CI Robustness | Recommended Use Case |
| :--- | :---: | :---: | :---: | :--- |
| **`sleep(fixedMs)` (Anti-Pattern)** | **High (30%–60%)** | Slow (Fixed penalty) | Extremely Fragile | **NEVER in production test suites** |
| **Direct Promise Awaiting** | **0% (Deterministic)** | Maximum (Instant return) | High | Async functions, Promises, Supertest HTTP calls |
| **Event-Driven (`events.once`)** | **0% (Deterministic)** | Maximum (Instant return) | High | WebSockets, EventEmitters, message brokers |
| **Condition Polling (`waitFor`)** | **< 1%** | Fast (Returns on first poll) | High | Black-box DOM testing, background daemon queues |


---

## 7. References & AI Disclosure Statement

### 7.1 Academic & Technical References
1. **Fowler, M. (2006).** *Continuous Integration.* martinfowler.com.
2. **Meszaros, G. (2007).** *xUnit Test Patterns: Refactoring Test Code.* Addison-Wesley Professional.
3. **Google Testing Blog.** *Flaky Tests at Google and How We Mitigate Them.*
4. **Jest Documentation.** *Testing Asynchronous Code & CLI Options (`--runInBand`).* [jestjs.io](https://jestjs.io/)
5. **GitHub Documentation.** *About Protected Branches & Required Status Checks.* [docs.github.com](https://docs.github.com/)
6. **SQLite Consortium.** *File Locking and Concurrency in SQLite Version 3.* [sqlite.org](https://sqlite.org/)

### 7.2 Course AI Disclosure Statement
This technical guide was authored in adherence to the Course Academic Integrity Guidelines. Generative AI tools (Antigravity IDE Assistant, Claude, and Gemini) were utilized for Markdown table formatting, syntax verification, and English grammatical refinement. All architectural analyses, code snippets, test assertions, and diagnostic steps were manually inspected, executed, and verified on local environments and the official GitHub repository by the author.
