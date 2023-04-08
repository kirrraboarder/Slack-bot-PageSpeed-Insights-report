const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--proxy-server=http://yourproxyaddress.com:port'] });
  const page = await browser.newPage();
  await page.goto('https://www.fiverr.com', { waitUntil: 'networkidle2' });

  // Click the "Sign up" button
  await page.click('.header-btn');
  await page.waitForNavigation();

  console.log("Clicked the Sign up button!");

  await browser.close();
})();
