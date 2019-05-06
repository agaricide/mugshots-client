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
  let urls: IteratorResult<string[]>;
  let mugshotIterator: AsyncIterableIterator<string[]>;
  const browser = await launch();
  const pagePool = PagePool(browser, { max: 10, ...options });
  const page = await pagePool.acquire();
  const counties = await CountyIterator(page);
  county = await counties.next();
  mugshotIterator = await MugshotUrlChunkIterator(page, county.value);

  const destroy = async function (error: Error | null, callback: Function) {
    try {
      if (error) this.emit('error', error);
      await browser.close();
      callback(null);
    } catch (error) {
      callback(error);
    }
  };

  const read = async function () {
    try {
      if (!urls || !urls.done) {
        urls = await mugshotIterator.next();
      }

      if (urls.done && !county.done) {
        county = await counties.next();
        mugshotIterator = await MugshotUrlChunkIterator(page, county.value);
        urls = await mugshotIterator.next();
      }

      if (urls.done && county.done) {
        return false;
      }

      const mugshots = await scrapeMugshots(pagePool, urls.value, options);
      this.push(mugshots);
    } catch (error) {
      this.emit('error', error);
      this.push([]);
    }
  };

  return new Readable({
    objectMode: true,
    read,
    destroy
  });
};

export {
  MugshotStream
};
