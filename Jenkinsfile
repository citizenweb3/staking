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
        stage('Checkout source-main') {
            steps {
                script {
                    git branch: "${BRANCH_TO_BUILD}", url: "${REPO_URL}", credentialsId: 'github-credentials'
                }
            }
        }

        stage('Inject .env.local') {
            steps {
                withCredentials([file(credentialsId: 'staking-env-local', variable: 'ENV_FILE')]) {
                    sh 'cp "$ENV_FILE" .env.local'
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