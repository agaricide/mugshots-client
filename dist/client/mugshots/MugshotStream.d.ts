/// <reference types="node" />
import { Readable } from 'stream';
import { Options as PoolOptions } from 'generic-pool';
import { ScrapeOptions } from '../mugshots/scrapeMugshots';
declare const MugshotStream: (options?: PoolOptions & ScrapeOptions) => Promise<Readable>;
export { MugshotStream };
