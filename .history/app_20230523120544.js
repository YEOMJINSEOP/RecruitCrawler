import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

class Crawler {
  constructor(url, selector) {
    this.url = url;
    this.selector = selector;
  }

  async crawl() {
    const response = await axios.get(this.url).catch(console.error);
    const $ = cheerio.load(response.data);
    const results = [];
    $(this.selector).each((index, element) => {
      results[index] = $(element).text();
    });
    return results;
  }
}

// Now we can create instances of Crawler for different websites or selectors.
const naverCrawler = new Crawler('https://recruit.naverlabs.com/', 'li > a > h4');

// and use it in express routes
app.get('/recruit/info', async (req, res) => {
  const titleList = await naverCrawler.crawl();
  res.json(titleList);
  console.log(titleList);
});


app.listen(8080);