const puppeteer = require('puppeteer');

async function wait(seconds) {
    return new Promise(res => {
        setTimeout(res, seconds * 1000);
    })
}

(async () => {
    try {
        // const browser = await puppeteer.launch({ headless: false });
        const ws_url = "ws://127.0.0.1:9222/devtools/browser/1cdfb08b-c49e-4116-956c-7c9f6ad51400";

        const browser = await puppeteer.connect({ browserWSEndpoint: ws_url });
        const page = await browser.newPage();

        await page.setViewport({ width: 1366, height: 1400 });
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

        // Get the "viewport" of the page, as reported by the page.
        // const dimensions = await page.evaluate(() => {
        //     return {
        //         width: document.documentElement.clientWidth,
        //         height: document.documentElement.clientHeight,
        //         deviceScaleFactor: window.devicePixelRatio,
        //     };
        // });

        // console.log('Dimensions:', dimensions);

        // await page.goto('https://www.apple.com/sg/shop/refurbished/mac/macbook-pro-32gb');
        // await page.screenshot({ path: 'example.png' });

        // console.log("Clicking refurbished and clearance.")
        // let node = await page.waitForXPath("//a[@data-analytics-title='refurbished and clearance']")

        // console.log('Node:', node)

        // node.click()


        // console.log('Clicking Mac Category')
        // node = await page.waitForXPath("//a[@data-analytics-title='Mac (Category)']")

        // node.click()

        // console.log('Clicking Macbookpro')
        // node = await page.waitForXPath("//input[@id='macbookpro']//parent::li")

        // node.click()

        // console.log('Clicking Memory accordion')
        // node = await page.waitForXPath("//span[@class='rc-accordion-title' and text()='Memory']//parent::button")

        // node.click()

        // console.log('Clicking 32gb')
        // node = await page.waitForXPath("//input[@id='32gb']//parent::li")

        // node.click()

        // node = await page.$x(`//li[@class='rf-refurb-producttile'][${i}]`)

        async function getModels() {
            await page.goto('https://www.apple.com/sg/shop/refurbished/mac/macbook-pro-32gb');

            let nodes = await page.$x(`//a[@class='rf-refurb-producttile-link']`)

            for (let node of nodes) {
                // console.log(`Node: ${node}`)

                node = await page.evaluate(name => name.innerText, node);
                console.log(`Node: ${node}`)

            }
        }

        getModels()

        setInterval(async () => {
            console.log(new Date())

            await getModels()
        }, 60000);

        // await browser.close();
    }
    catch (e) {
        console.error(e.stack)
    }
})();
