import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as puppeteer from 'puppeteer';
import { MugshotModel } from './models/Mugshot';
import { MugshotUrlChunkIterator, CountyIterator, scrapeMugshots } from '../src/index';
import { performance } from 'perf_hooks';

// Set environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const average = (array: number[]) => array.reduce((p,c,_,a) => p + c/a.length,0);

(async () => {
  console.log('Starting...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const counties = await CountyIterator(page);

  let runtimes = [];
  for await (const county of counties) {
    console.log(county.name);
    const mugshotUrls = await MugshotUrlChunkIterator(page, county);
    
    // START PERF TEST
    const startTime = performance.now();
    for await (const chunk of mugshotUrls) {
      const mugshots = await scrapeMugshots(browser, chunk, { count: 20 });
      // MugshotModel.insertMany(mugshots);
    }
    
    const endTime = performance.now();
    const runtime = endTime - startTime;
    runtimes.push(runtime);
    console.log(`runtime: ${runtime}`);
    console.log(`avg: ${average(runtimes)}`);
    // END PERF TEST
  }
})();