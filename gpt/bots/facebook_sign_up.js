const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false });

  // Create a new page
  const page = await browser.newPage();

  // Go to Facebook
  await page.goto('https://www.facebook.com/');

  // Click the "Create New Account" button
  await page.click('a[data-testid="open-registration-form-button"]');

  // Wait for the sign-up form to load
  await page.waitForSelector('form[name="reg"]');

  // Type the username "brennan" into the first name field
  await page.type('input[name="firstname"]', 'Brennan');

  // Type the username "crawford" into the last name field
  await page.type('input[name="lastname"]', 'Crawford');

  // Type the username "brennancrawford12345" into the username field
  await page.type('input[name="reg_email__"]', 'brennancrawford12345');

  // Type a password into the password field
  await page.type('input[name="reg_passwd__"]', 'password123');

  // Click the "Sign Up" button
  await page.click('button[type="submit"][name="websubmit"]');

  // Wait for 3 seconds
  await page.waitForTimeout(3000);

  // Close the browser
  await browser.close();
})();
