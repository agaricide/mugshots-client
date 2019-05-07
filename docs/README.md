
mugshots-client
===============

About
-----

Unofficial Node.js client for [mugshots.com](https://mugshots.com/). Exposes both a [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) and an [Async Iterator API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) that streams [Mugshot objects](https://github.com/agaricide/mugshots-client/blob/master/src/client/types/Mugshot.ts).

Usage
-----

### Importing

#### Typescript

`import { MugshotStream, Mugshot } from 'mugshot-client';`

#### Javascript (CommonJS)

`const { MugshotStream } = require('mugshot-client');`

### API

#### Stream API

Console.log mugshot data using the [Readable Stream API](https://github.com/agaricide/mugshots-client/blob/master/example/stream.ts):

```ts
import { MugshotStream, Mugshot } from 'mugshot-client';

(async () => {
  const mugshotStream = await MugshotStream({ chunkSize: 10 });
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
import { CountyIterable, MugshotUrlChunkIterable, scrapeMugshots, PagePool, Mugshot } from 'mugshot-client';

(async () => {
  const browser = await puppeteer.launch();
  const pagePool = PagePool(browser, { max: 10 });
  const page = await pagePool.acquire();

  const counties = await CountyIterable(page);
  for await (const county of counties) {
    const mugshotUrls = await MugshotUrlChunkIterable(page, county);
    for await (const chunk of mugshotUrls) {
      const mugshots = await scrapeMugshots(pagePool, chunk, { chunkSize: 20 });
      console.log(mugshots);
    }
  }
})();
```

Docs
----

## Index

### External modules

* ["client/counties/CountyIterable"](modules/_client_counties_countyiterable_.md)
* ["client/mugshots/MugshotStream"](modules/_client_mugshots_mugshotstream_.md)
* ["client/mugshots/MugshotUrlIterable"](modules/_client_mugshots_mugshoturliterable_.md)
* ["client/mugshots/scrapeMugshot"](modules/_client_mugshots_scrapemugshot_.md)
* ["client/mugshots/scrapeMugshots"](modules/_client_mugshots_scrapemugshots_.md)
* ["client/types/County"](modules/_client_types_county_.md)
* ["client/types/Mugshot"](modules/_client_types_mugshot_.md)
* ["client/types/State"](modules/_client_types_state_.md)
* ["client/utils/PagePool"](modules/_client_utils_pagepool_.md)
* ["index"](modules/_index_.md)
* ["tests/mugshots/MugshotUrlIterable.test"](modules/_tests_mugshots_mugshoturliterable_test_.md)
* ["tests/mugshots/cases"](modules/_tests_mugshots_cases_.md)
* ["tests/mugshots/scrapeMugshots.test"](modules/_tests_mugshots_scrapemugshots_test_.md)

---

