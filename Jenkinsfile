// EShop Seminar CI — Jenkins pipeline (demo)
// Checkout → Environment → Install → Test → Quality Gate
//   Test        : coupon unit tests (npm run test:ci:demo)
//   Quality Gate: .github/scripts/quality-gate.js (100% tests + lines > 70%)
// Agent: label 'eshop-node' — Node 22, npm, git (see infra/jenkins/).

pipeline {
    agent { label 'eshop-node' }

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '10'))
    }

    environment {
        CI = 'true'
        EXPECTED_NODE_MAJOR = 'v22'
        LOG_DIR = 'test-results'
    }

    stages {
        // Checkout code from GitHub into a clean workspace
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        // Record commit and agent runtime
        stage('Environment') {
            steps {
                dir('backend') {
                    sh label: 'Runtime', script: '''
                        set -euo pipefail
                        mkdir -p "$LOG_DIR"
                        {
                            echo "branch: ${BRANCH_NAME:-unknown}"
                            echo "commit: $(git rev-parse HEAD)"
                            echo "node:   $(node --version)"
                            echo "npm:    $(npm --version)"
                            echo "git:    $(git --version)"
                        } | tee "$LOG_DIR/environment.log"
                        case "$(node --version)" in
                            "$EXPECTED_NODE_MAJOR".*) ;;
                            *)
                                echo "Agent needs Node $EXPECTED_NODE_MAJOR.x, found $(node --version)" >&2
                                exit 1
                                ;;
                        esac
                    '''
                }
            }
        }

        // Install dependencies from package-lock.json
        stage('Install') {
            steps {
                dir('backend') {
                    sh label: 'npm ci', script: '''
                        set -euo pipefail
                        npm ci --no-audit --no-fund 2>&1 | tee "$LOG_DIR/install.log"
                    '''
                }
            }
        }

        // Run coupon business-rule unit tests
        stage('Test') {
            steps {
                dir('backend') {
                    sh label: 'Unit test coupon', script: '''
                        set -euo pipefail
                        npm run test:ci:demo 2>&1 | tee "$LOG_DIR/test.log"
                    '''
                }
            }
        }

        // Block the build if tests fail or coverage is below 70%
        stage('Quality Gate') {
            steps {
                dir('backend') {
                    sh label: 'Quality Gate', script: '''
                        set -euo pipefail
                        npm run quality-gate 2>&1 | tee "$LOG_DIR/quality-gate.log"
                    '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'backend/test-results/**, backend/coverage/jest-results.json, backend/coverage/coverage-summary.json, backend/coverage/lcov.info, backend/coverage/quality-gate-report.md',
                allowEmptyArchive: true,
                fingerprint: true
        }
    }
}
