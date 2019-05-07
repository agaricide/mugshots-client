# mugshots-client

[![npm version](https://badge.fury.io/js/mugshots-client.svg)](https://badge.fury.io/js/mugshots-client)

## About
Unofficial Node.js client for [mugshots.com](https://mugshots.com/).  Exposes both a [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) and an [Async Iterator API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) for streaming [Mugshot objects](https://github.com/agaricide/mugshots-client/blob/master/src/client/types/Mugshot.ts). 🚔👮

## Usage

### Importing
#### Typescript

`import { MugshotStream, Mugshot } from 'mugshots-client';`


#### Javascript (CommonJS)

`const { MugshotStream } = require('mugshots-client');`

### API
#### Stream API

Console.log mugshot data using the [Readable Stream API](https://github.com/agaricide/mugshots-client/blob/master/example/stream.ts):

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

#### Async Iterator API

Console.log mugshot data using the [Async Iterator API](https://github.com/agaricide/mugshots-client/blob/master/example/iterables.ts):

```ts
import * as puppeteer from 'puppeteer';
import { CountyIterable, MugshotUrlChunkIterable, scrapeMugshots, PagePool, Mugshot } from 'mugshots-client';

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

#### [MugshotStream](docs/modules/_client_mugshots_mugshotstream_.md)
#### [PagePool](docs/modules/_client_utils_pagepool_.md)
#### [CountyIterable](docs/modules/_client_counties_countyiterable_.md)
#### [MugshotUrlIterable](docs/modules/_client_mugshots_mugshoturliterable_.md)
#### [scrapeMugshot](docs/modules/_client_mugshots_scrapemugshot_.md)
#### [scrapeMugshots](docs/modules/_client_mugshots_scrapemugshots_.md)
