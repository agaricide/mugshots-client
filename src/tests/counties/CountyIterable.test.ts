import * as puppeteer from 'puppeteer';
import { CountyIterable } from '../../client/counties/CountyIterable';
import { County } from '../../client/types/County';

jest.setTimeout(15 * 1000);

let browser: puppeteer.Browser;

beforeAll(async (done) => {
  browser = await puppeteer.launch();
  done();
});

afterAll(async (done) => {
  await browser.close();
  done();
});

describe('CountyIterable', () => {
    it('is an async iterator that produces County objects', async (done) => {
      const page = await browser.newPage();
      const counties = await CountyIterable(page);
      await page.close();
      done();

      expect(true).toBe(false);
    });
  });