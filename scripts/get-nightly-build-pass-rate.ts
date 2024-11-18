import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();

const loginAndAnalyzeBuilds = async (
  latestBuildNumber: number,
  numberOfDays: number,
  username: string,
  token: string
) => {
  const loginUrl = process.env.JENKINS_LOGIN_URL;
  const baseApiUrl = process.env.JENKINS_BASE_API_URL;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  if (!loginUrl || !baseApiUrl) {
    console.error('Missing environment variables. Please check your .env file.');
    return;
  }

  try {
    console.log('Logging in to Jenkins...');
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });
    await page.type('#j_username', username);
    await page.type('input[name="j_password"]', token);
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);
    console.log('Login successful.');

    const startBuildNumber = latestBuildNumber - numberOfDays + 1;
    console.log(`Analyzing builds from ${startBuildNumber} to ${latestBuildNumber}...`);

    const failedBuilds: number[] = [];
    let passCount = 0;

    for (let buildNumber = startBuildNumber; buildNumber <= latestBuildNumber; buildNumber++) {
      console.log(`Fetching data for build #${buildNumber}...`);
      const url = `${baseApiUrl}/${buildNumber}/api/json`;
      try {
        const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });

        if (!response) {
          console.log(`Build #${buildNumber}: No response from server.`);
          continue;
        }

        const responseBody = await response.text();

        if (!responseBody) {
          console.log(`Build #${buildNumber}: Empty response body.`);
          continue;
        }

        let data: { result?: string } | null = null;
        try {
          data = JSON.parse(responseBody);
        } catch (jsonError) {
          console.error(`Build #${buildNumber}: Failed to parse JSON.`, jsonError);
          continue;
        }

        if (!data || !data.result) {
          console.log(`Build #${buildNumber}: Data unavailable or missing result.`);
          continue;
        }

        if (data.result === 'FAILURE') {
          failedBuilds.push(buildNumber);
        } else if (data.result === 'SUCCESS') {
          passCount++;
        } else {
          console.log(`Build #${buildNumber}: Unknown result.`);
        }
      } catch (error) {
        console.error(`Error fetching build #${buildNumber}: ${(error as Error).message}`);
      }
    }

    const failCount = failedBuilds.length;
    const passToFailRate = (passCount / (passCount + failCount)) * 100;

    console.log(`Analysis complete.`);
    console.log(`Pass Count: ${passCount}`);
    console.log(`Fail Count: ${failCount}`);
    console.log(`Pass-to-Fail Rate: ${passToFailRate.toFixed(2)}%`);
    console.log(`Failed Builds: ${failedBuilds.join(', ')}`);
  } catch (error) {
    console.error(`Error during execution: ${(error as Error).message}`);
  } finally {
    await browser.close();
  }
};

const latestBuildNumber = parseInt(process.argv[2], 10);
const numberOfDays = parseInt(process.argv[3], 10) || 1;
const username = process.env.JENKINS_ID || '';
const token = process.env.JENKINS_PASSWORD || '';

if (!latestBuildNumber || !username || !token) {
  console.error(
    'Missing arguments. Please provide latestBuildNumber, and set JENKINS_ID and JENKINS_PASSWORD in the environment.'
  );
  process.exit(1);
}

loginAndAnalyzeBuilds(latestBuildNumber, numberOfDays, username, token);
