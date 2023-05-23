import express from 'express';
import axios from 'axios';
import { Cheerio } from 'cheerio';

const app = express();

async function crawl(url){
  const response = await axios.get(url)
  .then(res => {return res})
  .catch(console.err)

  const $ = Cheerio.load(response.data);
  console.log($('li > a > h4').text());
};

crawl('https://recruit.naverlabs.com/');


app.listen(8080);