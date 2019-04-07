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
  console.log('Browser launched.');
  const counties = await CountyIterator(browser);

  let runtimes = [];
  for await (const county of counties) {
    console.log(county.name);
    const startTime = performance.now();
    const mugshotUrls = await MugshotUrlChunkIterator(browser, county);
    const endTime = performance.now();
    const runtime = endTime - startTime;
    runtimes.push(runtime);
    console.log(`runtime: ${runtime}`);
    console.log(`avg: ${average(runtimes)}`);
    // console.log('Created mugshot iterator.')
    // for await (const chunk of mugshotUrls) {
    //   console.log(chunk);
    //   const mugshots = await scrapeMugshots(browser, chunk, { count: 100 });
    //   console.log(mugshots);
    //   MugshotModel.insertMany(mugshots);
    // }
  }
})();