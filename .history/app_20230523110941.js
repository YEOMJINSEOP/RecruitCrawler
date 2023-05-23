import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  const response = await axios.get(url)
  .then(res => {return res})
  .catch(console.err)

  const $ = cheerio.load(response.data);
  console.log($('li.a').text());
};

crawl('https://recruit.naverlabs.com/');


app.listen(8080);