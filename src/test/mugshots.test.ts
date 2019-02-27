import * as mugshots from '../client/mugshots';
import * as puppeteer from 'puppeteer';

jest.setTimeout(15 * 1000);

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
    browser = await puppeteer.launch();
});

beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(async () => {
    page.close();
});

afterAll(async () => {
    await browser.close();
});

describe('getMugshotHrefs', () => {
    it('returns a list of urls w/ a valid mugshot on a page', async (done) => {            
        await page.goto('https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/');
        const result = await mugshots.getMugshotHrefs(page);
        expect(typeof result).toBe('object');
        expect(typeof result[0]).toBe('string');
        done();
    });
});

describe('getMugshotsFromHrefs', () => {
    it('returns a list of mugshot objects of the length specified', async (done) => {
        await page.goto('https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/');
        const hrefs = await mugshots.getMugshotHrefs(page);
        
        const results = await mugshots.getMugshotsFromHrefs(page, hrefs, 1);
        expect(results.length).toBe(1);
        expect(typeof results[0]).toBe('object');
        done();
    });
});