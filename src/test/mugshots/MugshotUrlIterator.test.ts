import * as puppeteer from 'puppeteer';
import { MugshotUrlIterator, MugshotUrlChunkIterator } from '../../client/mugshots/MugshotUrlIterator';
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

const county: County = {
    name: 'Autauga County',
    state: 'Alabama',
    url: 'https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/'
  };
  
  describe('MugshotUrlIterator', () => {
    it('is an async iterator that iterates through mugshot strings', async (done) => {
      const page = await browser.newPage();
      const mugshotUrls = await MugshotUrlIterator(page, county);
      for await (const url of mugshotUrls) {
        expect(url).toBeTruthy();
        expect(typeof url).toBe('string');
        break;
      }
      await page.close();
      done();
    });
  });
  
  describe('MugshotUrlChunkIterator', () => {
    it('is an async iterator that iterates through mugshot strings', async (done) => {
      const page = await browser.newPage();
      const mugshotUrls = await MugshotUrlChunkIterator(page, county);
      for await (const chunk of mugshotUrls) {
        expect(chunk.length).toBeTruthy();
        expect(typeof chunk[0]).toBe('string');
        break;
      }
      await page.close();
      done();
    });
  });