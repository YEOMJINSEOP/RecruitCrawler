import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  await axios.get(url)
  .then(res)
  .catch(err)
}

crawl('https://recruit.naverlabs.com/');


app.listen(8080);