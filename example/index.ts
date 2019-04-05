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

(async () => {
  console.log('Starting...');
  const browser = await puppeteer.launch();
  console.log('Browser launched.');
  const counties = await CountyIterator(browser);

  for await (const county of counties) {
    console.log(county.name);
    const mugshotUrls = await MugshotUrlChunkIterator(browser, county);
    console.log('Created mugshot iterator.')
    for await (const chunk of mugshotUrls) {
      console.log(chunk);
      const mugshots = await scrapeMugshots(browser, chunk, { count: 100 });
      console.log(mugshots);
      MugshotModel.insertMany(mugshots);
    }
  }
})();