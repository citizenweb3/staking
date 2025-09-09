pipeline {
    agent any

    environment {
        IMAGE_NAME = "staking"
        CONTAINER_NAME = "staking"
        REPO_URL = "https://github.com/citizenweb3/staking.git"
        BRANCH_TO_BUILD = "source-main"
        DOCKER_REGISTRY = ""
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git branch: "${BRANCH_TO_BUILD}", url: "${REPO_URL}", credentialsId: 'github-credentials'
                }
            }
        }

        stage('Prepare Env') {
            steps {
                script {
                    // Copy .env.example to .env.local if the example file exists.
                    // This will not fail the build if .env.example is missing.
                    sh '''
                    if [ -f .env.example ]; then
                      echo "Copying .env.example to .env.local"
                      cp .env.example .env.local
                    else
                      echo ".env.example not found; skipping copy"
                    fi
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t ${IMAGE_NAME}:latest .
                    """
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 10000:3000 ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed."
        }
        success {
            echo "Build and deployment succeeded!"
        }
        failure {
            echo "Build or deployment failed!"
        }
    }
}
