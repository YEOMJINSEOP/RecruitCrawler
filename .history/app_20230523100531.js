import express from 'express';
import cheerio from 'cheerio';

const app = express();

async function crawl(url){
  const response = await axios.get('https://recruit.naverlabs.com/rcrt/view.do?annoId=30001139&sw=&subJobCdArr=&sysCompanyCdArr=&empTypeCdArr=&entTypeCdArr=&workAreaCdArr=');
  const $ = cheerio.load(response.data);

  console.log($);
}


app.listen(8080);