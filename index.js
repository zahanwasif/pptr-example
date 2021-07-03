const url = 'https://www.fiverr.com';

const pptr = require('puppeteer');

(async () => {
	const browser = await pptr.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'load' });

	try {
		console.log('hallo');
		await page.waitForXPath('/html/body');
		console.log('appeared');
		await page.waitForTimeout(2000);
		const pressAndHold = await page.$x('/html/body');
		pressAndHold[0].click({ delay: 5000 });
	} catch {}

	await page.waitForSelector('input');
	const searchInput = await page.$x('//*[@class="header"]/div/form/input');
	await searchInput[0].type('React native', { delay: 100 });
	await page.waitForTimeout(5000);
	const button = await page.$x('//*[@class="header"]/div/form/button');
	await button[0].click();
	await page.waitForTimeout(5000);
	try {
		console.log('hallo');
		await page.waitForXPath('/html/body');
		console.log('appeared');
		await page.waitForTimeout(2000);
		const pressAndHold = await page.$x('/html/body');
		pressAndHold[0].click({ delay: 5000 });
	} catch {}

	try {
		await page.waitForXPath('/html/body/div/div[2]', {
			timeout: 5000,
			visible: true,
		});
		await page.mouse.click(5, 5, { button: 'left' });
	} catch {}
	try {
		await page.waitForXPath('/html/body/div[12]/div/section', {
			timeout: 5000,
			visible: true,
		});
		await page.mouse.click(5, 5, { button: 'left' });
	} catch {}

	await page.mouse.click(5, 5, { button: 'left' });
	await page.waitForTimeout(5000);
	await page.mouse.click(5, 5, { button: 'left' });

	const links = await page.$x(
		'//*[@id="perseus-app"]/div/div/div[5]/div/div/div/div/div/a'
	);

	console.log(links);
	await page.waitForTimeout(5000);
	browser.close();
	return Promise.resolve();
})().catch((err) => console.log(err));
