import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const loginAndFetchData = async (buildNumber: number) => {
  const username = process.env.JENKINS_ID;
  const token = process.env.JENKINS_PASSWORD;
  const loginUrl = process.env.JENKINS_LOGIN_URL;
  const baseApiUrl = process.env.JENKINS_BASE_API_URL;

  if (!username || !token || !loginUrl || !baseApiUrl) {
    console.error('Missing environment variables. Please check your .env file.');
    return;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });

    await page.type('#j_username', username);
    await page.type('input[name="j_password"]', token);

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    const cookies = await page.cookies();
    console.log('Logged in. Cookies saved.');

    const url = `${baseApiUrl}/${buildNumber}/api/json`;
    await page.setCookie(...cookies);
    const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
    console.log('Response:', response);

    const responseBody = await response?.text();
    if (responseBody) {
      console.log('Response body:', responseBody);
    }

    return responseBody;
  } catch (error) {
    console.error(`Error during login or data fetch: ${(error as Error).message}`);
    return null;
  } finally {
    await browser.close();
  }
};

// Example usage
const buildNumber = parseInt(process.argv[2], 10);

if (!buildNumber) {
  console.error('Please provide the build number as an argument.');
} else {
  loginAndFetchData(buildNumber);
}
