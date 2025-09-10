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
                    // Принудительно используем source-main независимо от того, какая ветка вызвала сборку
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: 'source-main']],
                        userRemoteConfigs: [[
                            url: "${REPO_URL}",
                            credentialsId: 'github-credentials'
                        ]]
                    ])
                }
            }
        }

        stage('Prepare Env') {
            steps {
                script {
                    // Проверяем и копируем env файлы из ветки source-main
                    sh '''
                    echo "Preparing environment files from source-main branch..."
                    if [ -f .env.local ]; then
                        echo "Found .env.local in source-main branch"
                    elif [ -f .env.example ]; then
                        echo "No .env.local found in source-main branch, copying from .env.example"
                        cp .env.example .env.local
                    else
                        echo "WARNING: Neither .env.local nor .env.example found in source-main branch!"
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
