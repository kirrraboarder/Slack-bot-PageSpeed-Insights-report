const puppeteer = require('puppeteer');
const { createProfile } = require('@gologin puppeteer-extra-plugin');

(async () => {
  const profile = await createProfile({
    name: 'my-profile',
    userDataDir: './my-profile-data',
    proxy: {
      server: process.env.PROXY_SERVER,
      username: process.env.PROXY_USER,
      password: process.env.PROXY_PASSWORD
    }
  });

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--user-data-dir=${profile.userDataDir}`],
    defaultViewport: null,
    executablePath: profile.executablePath
  });

  const page = await browser.newPage();
  await page.goto('https://www.fiverr.com', { waitUntil: 'networkidle2' });

  // Click the "Sign up" button
  await page.click('.header-btn');
  await page.waitForNavigation();

  console.log("Clicked the Sign up button!");

  await browser.close();
})();