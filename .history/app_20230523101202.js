import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  axios.get(url)
  .then(res => {return res})
  .catch(console.err)
}

app.get('/recruit', (req, res, next) => {
  const data = crawl('http://www.yes24.com/24/Category/BestSeller');
  res.send(data);
})


app.listen(8080);