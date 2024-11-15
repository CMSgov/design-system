/*
Placeholder function that should fetch data from jenkins API for a givne build number.
*/
const fetchBuildData = async (buildNumber: number) => {
  return {
    result: buildNumber % 2 === 0 ? 'SUCCESS' : 'FAILURE', // Mocking this response for now.
  };
};

const computeRange = (latestBuildNumber: number, numberOfDays: number) => {
  return latestBuildNumber - numberOfDays + 1;
};

const computePassToFailRate = (passCount: number, failCount: number) => {
  return (passCount / (passCount + failCount)) * 100;
};

const analyzeBuilds = async (latestBuildNumber: number, numberOfDays: number) => {
  const startBuildNumber = computeRange(latestBuildNumber, numberOfDays);
  const endBuildNumber = latestBuildNumber;

  const failedBuilds = [];
  let passCount = 0;

  console.log(`Analyzing builds from ${startBuildNumber} to ${endBuildNumber}...`);

  for (let buildNumber = startBuildNumber; buildNumber <= endBuildNumber; buildNumber++) {
    const buildData = await fetchBuildData(buildNumber);

    if (buildData.result === 'FAILURE') {
      failedBuilds.push(buildNumber);
    } else {
      passCount++;
    }

    // TODO: Implement a delay between requests to avoid hitting API rate limits.
  }

  const failCount = failedBuilds.length;
  const passToFailRate = computePassToFailRate(passCount, failCount);

  console.log(`Analysis complete.`);
  console.log(`Pass Count: ${passCount}`);
  console.log(`Fail Count: ${failCount}`);
  console.log(`Pass-to-Fail Rate: ${passToFailRate.toFixed(2)}%`);
  console.log(`Failed Builds: ${failedBuilds.join(', ')}`);
};

// Example usage
const latestBuildNumber = parseInt(process.argv[2], 10);
const numberOfDays = parseInt(process.argv[3], 10) || 1;

if (!latestBuildNumber) {
  console.error('Please provide the latestBuildNumber as an argument.');
  process.exit(1);
}

analyzeBuilds(latestBuildNumber, numberOfDays);
