import { launch } from 'puppeteer';
import { Readable } from 'stream';
import { CountyIterator } from '../counties/CountyIterable';
import { MugshotUrlChunkIterator } from '../mugshots/MugshotUrlIterable';
import { scrapeMugshots } from '../mugshots/scrapeMugshots';
import { PagePool } from '../utils/PagePool';
import { County } from '../types/County';
import to from 'await-to-js';

const MugshotStream = async () => {
  let county: IteratorResult<County>;
  let urls: IteratorResult<string[]>;
  let mugshotIterator: AsyncIterableIterator<string[]>;
  const browser = await launch();
  const pagePool = PagePool(browser, { max: 10 });
  const page = await pagePool.acquire();
  const counties = await CountyIterator(page);
  county = await counties.next();
  mugshotIterator = await MugshotUrlChunkIterator(page, county.value);

  const read = async function () {
    const handleError = (error: any) => {
      this.emit('error', error);
      this.push([]);
    }

    if (!urls || !urls.done) {
      const [error, chunk] = await to(mugshotIterator.next());
      if (error) return handleError(error);
      urls = chunk;
    }
  
    if (urls.done && !county.done) {
      county = await counties.next();
      const [error, chunkIterator] = await to(MugshotUrlChunkIterator(page, county.value));
      if (error) return handleError(error);
      mugshotIterator = chunkIterator;
      urls = await mugshotIterator.next();
    }
  
    if (urls.done && county.done) {
      return false;
    }
  
    const [error, mugshots] = await to(scrapeMugshots(pagePool, urls.value, { count: 10 }));
    if (error) return handleError(error);
    this.push(mugshots);
  };

  const destroy = async () => {
    await browser.close();
  }

  return new Readable({
    objectMode: true,
    read,
    destroy
  });
};

export {
  MugshotStream
};