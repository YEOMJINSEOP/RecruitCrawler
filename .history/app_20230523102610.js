import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  const response = await axios.get(url)
  .then(console.log)
  .catch(console.err)

  console.log(response);
  // const $ = cheerio.load(response);
  // console.log(title)
};

crawl('https://recruit.naverlabs.com/');


app.listen(8080);