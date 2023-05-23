import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  axios.get(url)
  .then(console.log)
  .catch(console.err)
  
}

app.get('/recruit', (req, res, next) => {
  crawl('http://www.yes24.com/24/Category/BestSeller');
  res.send('hi');
})


app.listen(8080);