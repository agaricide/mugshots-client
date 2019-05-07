import * as puppeteer from 'puppeteer';
import { CountyIterable, MugshotUrlChunkIterable, scrapeMugshots, PagePool } from '../dist';
import { performance } from 'perf_hooks';

const TEST_CHUNK_SIZE = 20;

const average = (array: number[]) => array.reduce((p,c,_,a) => p + c/a.length,0);

(async () => {
  console.log(`Starting perf test for chunk size = ${TEST_CHUNK_SIZE}...`);
  const browser = await puppeteer.launch();
  const pagePool = PagePool(browser, { max: 2 });
  const page = await pagePool.acquire();
  const counties = await CountyIterable(page);

  let runtimes = [];
  for await (const county of counties) {
    console.log(`County: ${county.name}`);
    const mugshotUrls = await MugshotUrlChunkIterable(page, county);
    
    for await (const chunk of mugshotUrls) {
      console.log('chunk recieved.');
      // START PERF TEST
      const startTime = performance.now();
      const mugshots = await scrapeMugshots(pagePool, chunk, { count: TEST_CHUNK_SIZE });
      const endTime = performance.now();
      const runtime = endTime - startTime;
      runtimes.push(runtime);
      console.log(`Scraping perf:`)
      console.log(`runtime: ${runtime}`);
      console.log(`avg: ${average(runtimes)}`);
      // END PERF TEST
    }
  }
})();