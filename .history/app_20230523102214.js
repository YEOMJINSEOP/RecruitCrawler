import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  axios.get(url)
  .then(res)
  .catch(err)
}

app.get('/recruit', (req, res, next) => {
  const data = crawl('https://recruit.naverlabs.com/');
  res.send(data);
})


app.listen(8080);