const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const puppeteer = require("puppeteer");
const scrapingURL = "https://sfbay.craigslist.org/search/sss?query=couch";
const app = express();
const cors = require("cors");
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));

app.get("/images", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(scrapingURL);
    let couches = await page.$$eval("img", (imgs) =>
      imgs.map((img) => img.src)
    );
    return res.json(couches.splice(0, couches.length - 2));
  } catch (error) {
    console.log(error);
    return res.json([]);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
