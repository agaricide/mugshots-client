import { launch, Page } from 'puppeteer';
import { Readable, ReadableOptions } from 'stream';
import { CountyIterator } from '../counties/CountyIterable';
import { MugshotUrlChunkIterator } from '../mugshots/MugshotUrlIterable';
import { scrapeMugshots } from '../mugshots/scrapeMugshots';
import { PagePool } from '../utils/PagePool';
import { County } from '../types/County';
import { Pool } from 'generic-pool';
import { CountyIterable, MugshotUrlChunkIterable } from '../../index';

const MugshotStream3 = async () => {
  const browser = await launch();
  const pagePool = PagePool(browser, { max: 10 });
  const page = await pagePool.acquire();
 
  const read = async function() {
    const counties = await CountyIterable(page);
    for await (const county of counties) {
      const mugshotUrls = await MugshotUrlChunkIterable(page, county);
      for await (const chunk of mugshotUrls) {
        const mugshots = await scrapeMugshots(pagePool, chunk, { count: 1 });
        this.push(mugshots);
      }
    }
  }

  return new Readable({ objectMode: true, read });
} 

class MugshotStream2 extends Readable {
  private counties: AsyncIterableIterator<County>;
  private mugshotUrls: AsyncIterableIterator<string[]>;
  private county: IteratorResult<County>;
  private pagePool: Pool<Page>;

  constructor(options: ReadableOptions) {
    super(options);  
  }

  async launch() {
    const browser = await launch();
    this.pagePool = PagePool(browser, { max: 10 });
    const page = await this.pagePool.acquire();
    this.counties = await CountyIterator(page);
    this.county = await this.counties.next();
    this.mugshotUrls = await MugshotUrlChunkIterator(page, this.county.value);
  }

  async _read () {
    const urls = await this.mugshotUrls.next();
    if (urls.done || this.county.done) return;
    const next = await this.counties.next();
    const mugshots = await scrapeMugshots(this.pagePool, urls.value, { count: 1 });
    this.county = next;
    this.push(mugshots);
  }
} 


const MugshotStream1 = async () => {
  let county: IteratorResult<County>;
  let urls: IteratorResult<string[]>;
  const browser = await launch();
  const pagePool = PagePool(browser, { max: 10 });
  const page = await pagePool.acquire();
  const counties = await CountyIterator(page);
  county = await counties.next();
  const mugshotUrls = await MugshotUrlChunkIterator(page, county.value);

  
  const read = async function () {
    // while (true) {
      console.log('READING');
      urls = await mugshotUrls.next();
      if (urls.done || county.done) return false;
      const next = await counties.next();
      const mugshots = await scrapeMugshots(pagePool, urls.value, { count: 1 });
      county = next;
      this.push(mugshots);
    // }
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
  MugshotStream1 as MugshotStream
};