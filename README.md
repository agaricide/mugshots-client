# mugshots-client

[![npm version](https://badge.fury.io/js/mugshots-client.svg)](https://badge.fury.io/js/mugshots-client)

## About
Unofficial Node.js client for [mugshots.com](https://mugshots.com/).  Exposes both a [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) and an [Async Iterator API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) for streaming [Mugshot objects](https://github.com/agaricide/mugshots-client/blob/master/src/client/types/Mugshot.ts). 🚔👮

## Usage

### Install

`npm i mugshots-client --s`

### Import
#### Typescript

`import { MugshotStream, Mugshot } from 'mugshots-client';`


#### Javascript (CommonJS)

`const { MugshotStream } = require('mugshots-client');`

### API
#### [Readable Stream API](https://github.com/agaricide/mugshots-client/blob/master/examples/stream.ts)

```ts
import { MugshotStream, Mugshot } from 'mugshots-client';

(async () => {
  const mugshotStream = await MugshotStream({ maxChunkSize: 10 });
  console.log('Stream created.');

  mugshotStream.on('error', (error) => {
    console.log(error);
  });

  mugshotStream.on('close', () => {
    console.log('Stream closed.');
  });

  mugshotStream.on('data', (mugshots: Mugshot[]) => {
    console.log('data', mugshots);
  });
})();
```

#### [Async Iterator API](https://github.com/agaricide/mugshots-client/blob/master/examples/iterables.ts)

```ts
import * as puppeteer from 'puppeteer';
import {
  CountyIterable,
  MugshotUrlChunkIterable,
  scrapeMugshots,
  PagePool,
  Mugshot
} from 'mugshots-client';

(async () => {
  const browser = await puppeteer.launch();
  const pagePool = PagePool(browser, { max: 10 });
  const page = await pagePool.acquire();
 
  const counties = await CountyIterable(page);
  for await (const county of counties) {
    const mugshotUrls = await MugshotUrlChunkIterable(page, county);
    for await (const chunk of mugshotUrls) {
      const mugshots = await scrapeMugshots(pagePool, chunk, { maxChunkSize: 20 });
      console.log(mugshots);
    }
  }
})();
```

## Docs

##### [MugshotStream](https://github.com/agaricide/mugshots-client/blob/master/docs/modules/_client_mugshots_mugshotstream_.md)
##### [PagePool](https://github.com/agaricide/mugshots-client/blob/master/docs/modules/_client_utils_pagepool_.md)
##### [CountyIterable](https://github.com/agaricide/mugshots-client/blob/master/docs/modules/_client_counties_countyiterable_.md)
##### [MugshotUrlIterable](https://github.com/agaricide/mugshots-client/blob/master/docs/modules/_client_mugshots_mugshoturliterable_.md)
##### [scrapeMugshot](https://github.com/agaricide/mugshots-client/blob/master/docs/modules/_client_mugshots_scrapemugshot_.md)
##### [scrapeMugshots](https://github.com/agaricide/mugshots-client/blob/master/docs/modules/_client_mugshots_scrapemugshots_.md)

### FAQ

#### Why'd you make this? Isn't www.mugshots.com immoral?

My goals are to:
1.  subvert mugshots.com by making the watermarked records they re-publish from the public domain freely available for anyone to use
2.  bring attention to the moral implications for open records on the internet
    - More on NPR's Planet Money podcast, [Episode 878: Mugshots For Sale](https://www.npr.org/sections/money/2018/11/23/670149449/episode-878-mugshots-for-sale)
3.  use this library for inequality and social justice research

#### Why'd you use [Puppeteer](https://github.com/GoogleChrome/puppeteer)?  Isn't [cheerio](https://github.com/cheeriojs/cheerio) faster & doesn't it use less resources?

I chose Puppeteer to provide a path forward for obscuring scraping, to future-proof this software against censorship or TOS changes.

[Here](https://intoli.com/blog/making-chrome-headless-undetectable/) is an article on making headless Chrome undetectable. My goal is to provide an API for making an undetectable scraper. It will be impossible to detect scraping if we manipulate the Chrome browser's behavior and properties to mimic a human user's browser.
