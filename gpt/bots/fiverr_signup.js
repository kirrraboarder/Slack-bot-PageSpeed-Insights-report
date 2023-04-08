const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const {executablePath} = require('puppeteer');

// Use stealth 
puppeteer.use(pluginStealth()); 

// Launch puppeteer with stealth plugin
puppeteer.launch({ headless: false, executablePath: executablePath() }).then(async browser => { 
	// Create a new page 
	const page = await browser.newPage(); 

	// Setting page view 
	await page.setViewport({ width: 1280, height: 720 }); 

	// Go to the website 
	await page.goto('https://nowsecure.nl/'); 

	// Wait for security check 
	await page.waitForTimeout(10000); 

	// Get title text 
	const title = await page.evaluate(() => { 
		return document.querySelector('body > div.nonhystericalbg > div > header > div > h3').textContent; 
	}); 

	// Get message text 
	const msg = await page.evaluate(() => { 
		return document.querySelector('body > div.nonhystericalbg > div > main > h1').textContent; 
	}); 

	// Get state text 
	const state = await page.evaluate(() => { 
		return document.querySelector('body > div.nonhystericalbg > div > main > p:nth-child(2)').textContent; 
	}); 

	// Print out the results 
	console.log(title, '\n', msg, '\n', state); 

	await browser.close(); 
});
