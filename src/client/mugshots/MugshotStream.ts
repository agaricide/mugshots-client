import { launch } from 'puppeteer';
import { Readable } from 'stream';
import { CountyIterator } from '../counties/CountyIterable';
import { MugshotUrlChunkIterator } from '../mugshots/MugshotUrlIterable';
import { Options as PoolOptions } from 'generic-pool';
import { scrapeMugshots, ScrapeOptions } from '../mugshots/scrapeMugshots';
import { PagePool } from '../utils/PagePool';
import { County } from '../types/County';

const MugshotStream = async (options: PoolOptions & ScrapeOptions = {}) => {
  let county: IteratorResult<County>;
  let chunk: IteratorResult<string[]>;
  let chunkIterator: AsyncIterableIterator<string[]>;
  const browser = await launch();
  const pagePool = PagePool(browser, { max: 10, ...options });
  const page = await pagePool.acquire();
  const counties = await CountyIterator(page);
  county = await counties.next();
  chunkIterator = await MugshotUrlChunkIterator(page, county.value);

  const read = async function () {
    console.log("Reading!");
    try {
      if (!chunk || !chunk.done) {
        chunk = await chunkIterator.next();
      }

      if (chunk.done && !county.done) {
        county = await counties.next();
        chunkIterator = await MugshotUrlChunkIterator(page, county.value);
        chunk = await chunkIterator.next();
      }

      if (chunk.done && county.done) {
        return false;
      }

      const mugshots = await scrapeMugshots(pagePool, chunk.value, options);
      this.push(mugshots);
    } catch (error) {
      this.emit('error', error);
      this.push([]);
    }
  };

  const destroy = async function (error: Error | null, callback: Function) {
    try {
      if (error) this.emit('error', error);
      await browser.close();
      callback(null);
    } catch (error) {
      callback(error);
    }
  };

  console.log("Reading!");
  
  return new Readable({
    objectMode: true,
    destroy,
    read,
  });
};

export {
  MugshotStream
};
