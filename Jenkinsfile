pipeline {
	agent {
        dockerfile {
            args '--name apple'
            dir '.'
            filename 'Dockerfile'
		}
    }
	environment {
		// Very Important; stops from overwriting on temporary files
		HOME = '/tmp'

		// Global Variables
		ApplicationName = "apple"

		// Color Coding
		JobStartCC = '#ffff00'
		SuccessJobCC = '#7cfc00'
		FailureJobCC = '#ff4500'
		UnstableJobCC = '#0000ff'

		// Slack Notification
		JobStartSN = "STARTED: Job has Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Job URL>) - (<${env.BUILD_URL}/console|Console Output>)"
		JobSuccessSN = "SUCCESS: Job - ${currentBuild.fullDisplayName} has been completed. (<${env.BUILD_URL}|Job URL>) - (<${env.BUILD_URL}/console|Console Output>)"
		JobFailureSN = "FAILURE: Job - ${currentBuild.fullDisplayName} has failed. (<${env.BUILD_URL}|Job URL>) - (<${env.BUILD_URL}/console|Console Output>)"
		UnstableJobSN = "UNSTABLE: Job - ${currentBuild.fullDisplayName} is unstable. (<${env.BUILD_URL}|Job URL>) - (<${env.BUILD_URL}/console|Console Output>)"

	}

	stages {
		stage ('Build') {
			steps {
				slackSend channel: '#bangalore_dev_team',
					color: "${env.JobStartCC}",
					message:  "${env.JobStartSN}"
				sh "npm install"
                sh "npm audit fix"
			}
		}
		stage ('Testing') {
			steps {
                sh "npm start"
				sh "mocha"
                sh "MOCHA_FILE=./reports/junit/jenkins-test-results.xml ./node_modules/.bin/mocha test/** --reporter mocha-junit-reporter"
                junit '**/reports/junit/*.xml'
                sh "kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')"
			}
		}
        stage ('Release') {
            agent any
            steps {
                sh "tar -czvf apple.tar.gz *"
            }
        }
		stage ('Jfrog Artifactory: Upload') {
            agent any
			steps {
				sh "curl -uadmin:AP4ZpfcUDj5N2o7gJ6eP6fqgnui -T apple.tar.gz  \"https://dev.celominds.com/artifactory/apple/${env.JOB_NAME}-${env.BUILD_NUMBER}/apple.tar.gz\""
			}
		}
		// stage ('Jfrog Artifactory: Download') {
		// 	steps {
		// 		sh "cd /home/Artifactory/mango | curl -uadmin:AP4ZpfcUDj5N2o7gJ6eP6fqgnui -O \"https://dev.celominds.com/artifactory/mango/database/${env.JOB_NAME}-${env.BUILD_NUMBER}/mangodb.sql\""
		// 		sh "cd /home/Artifactory/mango | curl -uadmin:AP4ZpfcUDj5N2o7gJ6eP6fqgnui -O \"https://dev.celominds.com/artifactory/mango/dotnet-core/${env.JOB_NAME}-${env.BUILD_NUMBER}/mango.tar.gz\""
		// 		sh "cd /home/Artifactory/mango | tar -xvzf mango.tar.gz"
		// 	}
		// }
	}
	post {
		success {
			slackSend channel: '#bangalore_dev_team',
					color: "${env.SuccessJobCC}",
					message: JobSuccessSN
		}
		failure {
			slackSend channel: '#bangalore_dev_team',
					color: "${env.FailureJobCC}",
					message: JobFailureSN
		}
		unstable {
			slackSend channel: '#bangalore_dev_team',
					color: "${env.UnstableJobCC}",
					message: UnstableJobSN
		}
	}
}