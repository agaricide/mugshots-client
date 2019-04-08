import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as puppeteer from 'puppeteer';
import { MugshotModel } from './models/Mugshot';
import { CountyIterable, MugshotUrlChunkIterable, scrapeMugshots, PagePool } from '../src/index';
import { performance } from 'perf_hooks';

// Set environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const average = (array: number[]) => array.reduce((p,c,_,a) => p + c/a.length,0);

(async () => {
  console.log('Starting experiment...');
  const browser = await puppeteer.launch();
  const pagePool = PagePool(browser, { max: 2 });
  const page = await pagePool.acquire();
  const counties = await CountyIterable(page);

  let runtimes = [];
  for await (const county of counties) {
    console.log(county.name);
    const mugshotUrls = await MugshotUrlChunkIterable(page, county);
    
    for await (const chunk of mugshotUrls) {
      console.log(`chunk recieved.`);
      // START PERF TEST
      const startTime = performance.now();
      const mugshots = await scrapeMugshots(pagePool, chunk, { count: 20 });
      const endTime = performance.now();
      const runtime = endTime - startTime;
      runtimes.push(runtime);
      console.log(`runtime: ${runtime}`);
      console.log(`avg: ${average(runtimes)}`);
      MugshotModel.insertMany(mugshots);
      // END PERF TEST
    }
  }
})();