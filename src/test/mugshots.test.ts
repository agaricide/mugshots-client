import * as mugshots from '../client/mugshots';
import * as puppeteer from 'puppeteer';
import { cases as testCases } from './cases.json';

jest.setTimeout(15 * 1000);

const TEST_COUNTY = 'https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/';
let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async (done) => {
    browser = await puppeteer.launch();
    done();
});

afterAll(async (done) => {
    await browser.close();
    done();
});

beforeEach(async (done) => {
    page = await browser.newPage();
    done();
});

afterEach(async (done) => {
    await page.close();
    done();
});

describe('getMugshotHrefs', () => {
    it('returns a list of urls w/ a valid mugshot on a page', async (done) => {            
        await page.goto(TEST_COUNTY);
        const result = await mugshots.getMugshotHrefs(page);
        expect(typeof result).toBe('object');
        expect(typeof result[0]).toBe('string');
        done();
    });
});

describe('getMugshotsFromHrefs', () => {
    it('returns a list of mugshot objects of the length specified', async (done) => {
        await page.goto(TEST_COUNTY);
        const hrefs = await mugshots.getMugshotHrefs(page);
        
        const results = await mugshots.getMugshotsFromHrefs(page, hrefs, 1);
        expect(results.length).toBe(1);
        expect(typeof results[0]).toBe('object');
        done();
    });
});


describe('scrapeMugshot', () => {
    it(`handles mugshot test case #1 from cases.json`, async (done) => {
        const test = testCases[0];
        await page.goto(test.url);
        const mugshot = await mugshots.scrapeMugshot(page);
        expect(mugshot.name).toBe(test.expected.name);
        expect(mugshot.age).toBe(test.expected.age);
        expect(mugshot.charge).toBe(test.expected.charge);
        expect(mugshot.state).toBe(test.expected.state);
        done();
    });
});