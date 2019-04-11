import { launch } from 'puppeteer';
import { Readable } from 'stream';
import { CountyIterator } from '../counties/CountyIterable';
import { MugshotUrlChunkIterator } from '../mugshots/MugshotUrlIterable';
import { scrapeMugshots } from '../mugshots/scrapeMugshots';
import { PagePool } from '../utils/PagePool';
import { County } from '../types/County';

const MugshotStream = async () => {
  let county: IteratorResult<County>;
  let urls: IteratorResult<string[]>;
  let mugshotUrlIterator: AsyncIterableIterator<string[]>;
  const browser = await launch();
  const pagePool = PagePool(browser, { max: 10 });
  const page = await pagePool.acquire();
  const counties = await CountyIterator(page);
  county = await counties.next();
  mugshotUrlIterator = await MugshotUrlChunkIterator(page, county.value);

  const read = async function () {
    if (!urls || !urls.done) {
      urls = await mugshotUrlIterator.next();
    }
    if (urls.done && !county.done) {
      county = await counties.next();
      mugshotUrlIterator = await MugshotUrlChunkIterator(page, county.value);
      urls = await mugshotUrlIterator.next();
    }
    if (urls.done && county.done) {
      return false;
    }
    const mugshots = await scrapeMugshots(pagePool, urls.value, { count: 10 });
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