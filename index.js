const url = "https://www.fiverr.com";

const pptr = require("puppeteer");

(async () => {
	const browser = await pptr.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "load", timeout: 0 });

	try {
		await page.waitForXPath('//*[@id="px-captcha"]/div/iframe[1]', {
			timeout: 1000,
		});
		console.log("appeared");
		await page.waitForTimeout(2000);
		const pressAndHold = await page.$x("/html/body");
		console.log(pressAndHold);
		pressAndHold[0].click({ delay: 5000 });
	} catch {
	} finally {
		console.log("1st recapcha DONE");
	}

	await page.waitForSelector("input");
	const searchInput = await page.$x('//*[@class="header"]/div/form/input');
	await searchInput[0].type("React native", { delay: 100 });
	const button = await page.$x('//*[@class="header"]/div/form/button');
	await button[0].click();
	await page.waitForTimeout(5000);

	try {
		await page.waitForXPath('//*[@id="px-captcha"]/div/iframe[1]');
		await page.waitForTimeout(2000);
		const pressAndHold = await page.$x("/html/body");
		pressAndHold[0].click({ delay: 5000 });
	} catch {
	} finally {
		console.log("2st recapcha DONE");
	}

	try {
		await page.waitForXPath("/html/body/div/div[2]", {
			timeout: 5000,
			visible: true,
		});
		await page.mouse.click(5, 5, { button: "left" });
	} catch {}

	try {
		await page.waitForXPath("/html/body/div[12]/div/section", {
			timeout: 5000,
			visible: true,
		});
		await page.mouse.click(5, 5, { button: "left" });
	} catch {}

	await page.mouse.click(5, 5, { button: "left" });
	await page.waitForTimeout(5000);
	await page.mouse.click(5, 5, { button: "left" });

	const hrefs = await page.$x(
		'//*[@id="perseus-app"]/div/div/div[5]/div/div/div/div/div/a'
	);
	const links = await Promise.all(
		hrefs.map(async (i) => {
			const link = await i.getProperty("href");
			return Promise.resolve(await link.jsonValue());
		})
	);
	console.log(links);
	// const page1 = await browser.newPage();
	// await page1.goto(links[0], { waitUntil: "load" });

	// const quotes = await page1.$x(
	// 	'//*[@id="perseus-app"]/div/div[3]/div/div[7]/ul/li/a'
	// );
	// const eachQuote = await Promise.all(
	// 	page1.evaluate(async (i) => Promise.resolve(await i.textContent), quotes[0])
	// );
	// console.log(eachQuote);

	return Promise.resolve();
})().catch((err) => console.log(err));
