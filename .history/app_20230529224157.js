import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

class Crawler {
  constructor(url, selector, company) {
    this.url = url;
    this.selector = selector;
    this.company = company;
  }

  async crawl() {
    const response = await axios.get(this.url).catch(console.error);
    console.log('response: ', response.data);
    const $ = cheerio.load(response.data);
    const results = [];
    $(this.selector).each((index, element) => {
      results[index] = {
        company: this.company,
        data: $(element).text()
      };
    });
    return results;
  }
}

const naverLabsCrawler = new Crawler('https://recruit.naverlabs.com/', 'li > a > h4', 'NAVER');

const lineCrawler = new Crawler('https://careers.linecorp.com/jobs?ca=All&ci=Seoul,Bundang&co=East%20Asia&fi=Client-side,Android,iOS,Web%20Development,Server-side,Cloud%2FInfra,System%20Engineering,Data%2FAI,QA,Security%20Engineering', 'li > a > h3 ', 'LINE');

app.get('/recruit/info', async (req, res) => {
  const titleList = await naverLabsCrawler.crawl();
  res.json(titleList);


  // const titleList = await kakaoCrawler.crawl();
  // res.json(titleList);
});


app.listen(8080);