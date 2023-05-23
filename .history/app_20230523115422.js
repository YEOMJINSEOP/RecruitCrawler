import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function naverLabsCrawl(url){
  const response = await axios.get(url)
  .then(res => {return res})
  .catch(console.err)

  const title = [];
  const $ = cheerio.load(response.data);
  const titleSelector = 'li > a > h4';
  $(titleSelector).each((i, elem) => {
    title[i] = $(elem).text();
  });
  console.log(title);
};

naverLabsCrawl('https://recruit.naverlabs.com/');


app.listen(8080);