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
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout source-main') {
            steps {
                script {
                    // Принудительно используем source-main независимо от того, какая ветка вызвала сборку
                    git branch: 'source-main', 
                        url: "${REPO_URL}",
                        changelog: false, 
                        poll: false
                }
            }
        }

        stage('Prepare Env') {
            steps {
                script {
                    // Проверяем и копируем env файлы из ветки source-main
                    sh '''
                    echo "Checking .env files from source-main branch..."
                    if [ -f .env.example ]; then
                        echo "Found .env.example in source-main branch"
                        echo "Copying .env.example to .env.local"
                        cp .env.example .env.local
                        echo "Content of .env.local:"
                        cat .env.local
                    else
                        echo "ERROR: .env.example not found in source-main branch!"
                        exit 1
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