import * as puppeteer from 'puppeteer';
import { MugshotStream } from '../../client/mugshots/MugshotStream';
import { County } from '../../client/types/County';

let browser: puppeteer.Browser;

beforeAll(async done => {
  browser = await puppeteer.launch();
  done();
});

afterAll(async done => {
  await browser.close();
  done();
});

describe('MugshotUrlIterable', () => {
  expect(true).toBe(true);
});
