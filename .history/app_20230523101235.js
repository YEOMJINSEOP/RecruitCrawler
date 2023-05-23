import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  axios.get(url)
  .then(console.log)
  .catch(console.err)
}

crawl('http://www.yes24.com/24/Category/BestSeller');



app.get('/recruit', (req, res, next) => {
  const data = 1
  res.send(data);
})


app.listen(8080);