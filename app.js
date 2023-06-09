import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import {connectDB} from './database/database.js';
import cors from 'cors';
const app = express();
app.use(cors());
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

let collection;

const setupDatabase = async () => {
  const db = await connectDB();
  collection = db.collection('recruits');
}

const crawlAndStore = async () => {
  await collection.deleteMany({});

  const crawlers = [naverCrawler, lineCrawler];
  const recruitLists = await Promise.all(crawlers.map(crawler => crawler.crawl()));
  
  recruitLists.flat().forEach(async recruit => {
      await collection.insertOne(recruit);
  }) 
}

setupDatabase()
  .then(() => {
    crawlAndStore();
    setInterval(crawlAndStore, 24 * 60 * 60 * 1000);
  });

app.get('/recruit/info', async (req, res) => {
  const data = await collection.find().toArray();
  res.json(data);
});


app.listen(80);

