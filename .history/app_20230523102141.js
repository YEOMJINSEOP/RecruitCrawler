import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  axios.get(url)
  .then(console.log)
  .catch(console.err)
}

crawl('https://recruit.naverlabs.com/');

app.get('/recruit', (req, res, next) => {
  const data = 1
  res.send(data);
})


app.listen(8080);