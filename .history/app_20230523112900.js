import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  const response = await axios.get(url)
  .then(res => {return res})
  .catch(console.err)

  const $ = cheerio.load(response.data);
  const recruitTitle = $('li > a > h4');
  // const recruitTitleList = recruitTitle.split(')');
  console.log(recruitTitle);
};

crawl('https://recruit.naverlabs.com/');


app.listen(8080);