const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false });

  // Create a new page
  const page = await browser.newPage();

  // Go to google.com
  await page.goto('https://www.google.com/');

  // Type the search query in the search box and submit the form
  const searchInput = await page.$('input[name="q"]');
  await searchInput.type('how many weeks in a year');
  await searchInput.press('Enter');

  // Wait for the search results to load
  await page.waitForSelector('#search');

  // Click the URL matching "howmanyweeksinayear.weebly.com"
  const url = await page.$x('//a[contains(@href, "https://howmanyweeksinayear.weebly.com") and contains(@href, "weebly")]');
  if (url.length > 0) {
    await url[0].click();
  } else {
    console.log('URL not found');
  }

  // Wait for the page to load
  await page.waitForNavigation();

  // Close the browser
  await browser.close();
})();
