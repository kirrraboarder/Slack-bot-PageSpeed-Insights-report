const axios = require('axios');
const puppeteer = require('puppeteer');

// Define the number of retries and delay between retries
const retries = 3;
const retryDelay = 1000; // 1 second

// Function to get a random search query from the Random Word API
async function getRandomSearchQuery() {
  const url = 'https://random-word-api.herokuapp.com/word?number=1';
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      if (response.data && response.data[0]) {
        return response.data[0];
      }
    } catch (error) {
      console.error('Error retrieving search query from API:', error.message);
    }
    await new Promise(resolve => setTimeout(resolve, retryDelay));
  }
  console.error('Failed to retrieve search query from API after multiple attempts');
  return null;
}

// Main script function
async function runScript() {
  // Get a random search query from the Random Word API
  const searchQuery = await getRandomSearchQuery();
  if (!searchQuery) {
    return;
  }

  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Go to google.com
  await page.goto('https://www.google.com/');

  // Type the search query in the search box and submit the form
  const searchInput = await page.$('input[name="q"]');
  await searchInput.type(searchQuery);
  await searchInput.press('Enter');

  // Wait for the search results to load
  await page.waitForSelector('#search');

  // Close the browser
  await browser.close();
}

// Call the main script function
runScript();
