import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  axios.get('https://recruit.naverlabs.com/rcrt/view.do?annoId=30001139&sw=&subJobCdArr=&sysCompanyCdArr=&empTypeCdArr=&entTypeCdArr=&workAreaCdArr=')
  .then(console.log);
  
}


app.listen(8080);