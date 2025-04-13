const puppeteer = require("puppeteer");
require("dotenv").config()

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        "--no-cache",
      ],
    executablePath:
    process.env.NODE_ENV === "production"
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://developer.chrome.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type("body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > div.devsite-top-logo-row-middle > devsite-search > form > div.devsite-search-container > div > input", "automate beyond recorder");

    // // Wait and click on first result
    // const searchResultSelector = "#devsite-search-popout-container-id-1 > div";
    // await page.waitForSelector(searchResultSelector);
    // await page.click(searchResultSelector);

    // // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    //   "text/Customize and automate"
    // );
    // const fullTitle = await textSelector.evaluate((el) => el.textContent);

    // Print the full title
    const logStatement = `The title of this blog post is berhasil`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };