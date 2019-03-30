pipeline {
	agent {
        docker { 
			image 'node'
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
                sh "npm update"
				sh "mocha"
			}
		}
		// stage ('Publish: Dotnet Project FDD & SCD') {
		// 	agent {
		// 		docker { 
		// 			image 'microsoft/dotnet'
		// 		}
		// 	}
		// 	steps {
		// 		sh "${env.DotnetReleaseFDD}"
		// 		sh "tar -czvf mango.tar.gz Mango/Release/*"
		// 		sh "curl -uadmin:AP4ZpfcUDj5N2o7gJ6eP6fqgnui -T mango.tar.gz \"https://dev.celominds.com/artifactory/mango/dotnet-core/${env.JOB_NAME}-${env.BUILD_NUMBER}/mango.tar.gz\""
		// 	}
		// }
		// stage ('Jfrog Artifactory: Upload') {
		// 	steps {
		// 		sh "curl -uadmin:AP4ZpfcUDj5N2o7gJ6eP6fqgnui -T mangodb.sql \"https://dev.celominds.com/artifactory/mango/database/${env.JOB_NAME}-${env.BUILD_NUMBER}/mangodb.sql\""
		// 	}
		// }
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