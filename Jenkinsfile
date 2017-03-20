node('default') {
  checkout scm
  stage 'build'
  notifyOnFail('tools/jenkins/setup_tests.sh')
  stage 'test'
  notifyOnFail('tools/jenkins/run_tests.sh')
}

def notifyOnFail(cmd) {
  // notify via slack on failure
  try {
    sh cmd
  } catch (e) {
    def msg = "FAILED:" + cmd + " ' ${env.JOB_NAME} build #${env.BUILD_NUMBER}' (${env.BUILD_URL})"
    sh '/usr/local/bin/jenkins/slack.py --level ERROR "' + msg + '"'
    throw e
  }
}