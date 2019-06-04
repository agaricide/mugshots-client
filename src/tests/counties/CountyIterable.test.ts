import * as puppeteer from 'puppeteer';
import { CountyIterable } from '../../client/counties/CountyIterable';
import { County } from '../../client/types/County';
import * as firstFiveCounties from './first-five.json';

jest.setTimeout(15 * 1000);

let browser: puppeteer.Browser;

beforeAll(async done => {
  browser = await puppeteer.launch();
  done();
});

afterAll(async done => {
  await browser.close();
  done();
});

describe('CountyIterable', () => {
  it('Is an async iterator that returns County objects', async done => {
    const page = await browser.newPage();
    const counties = await CountyIterable(page);
    for await (const county of counties) {
      expect(county).toBeTruthy();
      expect(typeof county).toBe('object');
      break;
    }
    await page.close();
    done();
  });

  it('Can return multiple objects', async done => {
    const page = await browser.newPage();
    const counties = await CountyIterable(page);
    const max = 10;
    let iterated = 0;
    for await (const county of counties) {
      expect(county).toBeTruthy();
      expect(typeof county).toBe('object');
      if (++iterated === max) break;
    }
    await page.close();
    done();
  });

  it('Can start from an offset', async (done) => {
    const page = await browser.newPage();
    const startFrom: County = firstFiveCounties[2];
    const counties = await CountyIterable(page, startFrom);
    for await (const county of counties) {
      expect(county).toBeTruthy();
      expect(typeof county).toBe('object');
      expect(county.name).toBe(firstFiveCounties[2].name);
      break;
    }
    await page.close();
    done();
  });
});
