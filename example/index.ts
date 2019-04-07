import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as puppeteer from 'puppeteer';
import { MugshotModel } from './models/Mugshot';
import { MugshotUrlChunkIterator, CountyIterator, scrapeMugshots } from '../src/index';

// Set environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Ingest mugshots using iterators
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const counties = await CountyIterator(page);

  for await (const county of counties) {
    const mugshotUrls = await MugshotUrlChunkIterator(page, county);
    for await (const chunk of mugshotUrls) {
      const mugshots = await scrapeMugshots(browser, chunk, { count: 20 });
      MugshotModel.insertMany(mugshots);
    }
  }
})();