import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as puppeteer from 'puppeteer';
import { MugshotModel } from './models/Mugshot';
import { CountyIterable, MugshotUrlChunkIterable, scrapeMugshots, PagePool } from '../src/index';

// Set environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Ingest mugshots using iterators
(async () => {
  const browser = await puppeteer.launch();
  const pagePool = PagePool(browser, { max: 10 });
  const page = await pagePool.acquire();
 
  const counties = await CountyIterable(page);
  for await (const county of counties) {
    const mugshotUrls = await MugshotUrlChunkIterable(page, county);
    for await (const chunk of mugshotUrls) {
      const mugshots = await scrapeMugshots(pagePool, chunk, { count: 20 });
      MugshotModel.insertMany(mugshots);
    }
  }
})();