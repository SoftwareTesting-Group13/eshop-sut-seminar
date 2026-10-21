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
  - [4.4 Pull Request Branch Protection Rules](#44-pull-request-branch-protection-rules)
- [5. Advanced Pipeline Features](#5-advanced-pipeline-features)
  - [5.1 Code Coverage Enforcement (LCOV Reporting)](#51-code-coverage-enforcement-lcov-reporting)
  - [5.2 Multi-Version Matrix Builds](#52-multi-version-matrix-builds)
  - [5.3 Specialized Assistant: AI-Powered Log Triage](#53-specialized-assistant-ai-powered-log-triage)
- [6. Deep-Dive Analysis of 3 Mandatory Failure Modes](#6-deep-dive-analysis-of-3-mandatory-failure-modes)
  - [6.1 Failure Mode 1: SQLite File Lock Concurrency (`SQLITE_BUSY`)](#61-failure-mode-1-sqlite-file-lock-concurrency-sqlite_busy)
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
2. **Quality Gate via Branch Protection:** Pull Requests cannot be merged into the `main` branch unless the automated test suite reports a 100% pass rate and satisfies minimum code coverage thresholds ($\ge 80\%$). If a regression is introduced, the Quality Gate triggers a **Fail-Fast** shutdown, locking the GitHub merge button.

### 1.3 SUT System Architecture & Monorepo Structure
The target System Under Test is **EShop**, an e-commerce platform organized as a modular repository with a Node.js/Express backend, SQLite relational persistence, Jest test runner, and multiple client interfaces:

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
*(To be detailed in Phase 3 & 4: Automated evaluation of test exit codes, LCOV threshold validation, halting downstream jobs immediately upon failure).*

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
- **Root Cause Analysis:** *(Architecture of SQLite single-file write lock vs Jest parallel workers)*
- **Reproducing Code Snippet:** *(Parallel worker test execution)*
- **Failure Symptoms & Logs:** *(`Error: SQLITE_BUSY: database is locked`)*
- **Proven Fix / Workaround:** *(Sequential execution via `--runInBand` and in-memory architecture)*

### 6.2 Failure Mode 2: Coupon Percent Formula Bug
- **Root Cause Analysis:** *(Lack of lower-boundary clamping in discount calculation leading to negative order totals)*
- **Reproducing Code Snippet:** *(Data-Driven test cases in `coupon.test.js`)*
- **Failure Symptoms & Logs:** *(Assertion failure: expected `discount_amount >= 0`, received `-15.50`)*
- **Proven Fix / Workaround:** *(`Math.min(discountAmount, subtotal)` and validation sanitization)*

### 6.3 Failure Mode 3: Flaky Test Induced by Async Delays
- **Root Cause Analysis:** *(Non-deterministic `sleep()` timeouts under variable CI CPU load vs deterministic event awaiting)*
- **Reproducing Code Snippet:** *(`flaky-delay.demo.js` with arbitrary `setTimeout`)*
- **Failure Symptoms & Logs:** *(Intermittent `Timeout - Async callback was not invoked within 5000ms`)*
- **Proven Fix / Workaround:** *(Deterministic event polling and Promise resolution)*

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
