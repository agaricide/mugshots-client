import * as puppeteer from 'puppeteer';
import { Readable } from 'stream';
import { CountyIterator } from '../counties/CountyIterator';
import { MugshotUrlChunkIterator } from '../mugshots/MugshotUrlIterator';
import { scrapeMugshots } from '../mugshots/scrapeMugshots';
import { PagePool, PoolOptions } from '../utils/PagePool';
import { County } from '../types/County';



const MugshotStream = async () => {
    const browser = await puppeteer.launch();
    const pagePool = PagePool(browser, { max: 10 });
    const page = await pagePool.acquire();
    const counties = (await CountyIterator(page))[Symbol.asyncIterator]();
    const county: IteratorResult<County> = await counties.next();

    
    const read = async () => {
        const page = await pagePool.acquire();

    };
    
    return new Readable({ read });
};