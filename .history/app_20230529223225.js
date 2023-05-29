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
    console.log('response: ', response);
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

const naverLabsCrawler = new Crawler('https://recruit.naverlabs.com/', 'li > a > h4', 'NAVER LABS');

const kakaoCrawler = new Crawler('https://careers.kakao.com/jobs', 'li > div > div > span', 'KAKAO');

app.get('/recruit/info', async (req, res) => {
  // const titleList = await naverLabsCrawler.crawl();
  const titleList = await kakaoCrawler.crawl();
  res.json(titleList);
});


app.listen(8080);