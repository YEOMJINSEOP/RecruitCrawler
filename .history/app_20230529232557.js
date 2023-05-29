import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import {connectDB} from './database/database.js';

const app = express();

// console.log(process.env.DB_HOST);
class Crawler {
  constructor(url, selector, company) {
    this.url = url;
    this.selector = selector;
    this.company = company;
  }

  async crawl() {
    const response = await axios.get(this.url).catch(console.error);
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

const naverCrawler = new Crawler('https://recruit.naverlabs.com/', 'li > a > h4', 'NAVER');
const lineCrawler = new Crawler('https://careers.linecorp.com/jobs?ca=All&ci=Seoul,Bundang&co=East%20Asia&fi=Client-side,Android,iOS,Web%20Development,Server-side,Cloud%2FInfra,System%20Engineering,Data%2FAI,QA,Security%20Engineering', 'li > a > h3 ', 'LINE');

app.get('/recruit/info', async (req, res) => {
  const crawlers = [naverCrawler, lineCrawler];
  const recruitLists = await Promise.all(crawlers.map(crawler => crawler.crawl()));
  res.json(recruitLists.flat());
});


app.listen(8080);


process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  // 10초 후 강제 종료
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}