import * as puppeteer from 'puppeteer';
import { Mugshot } from './types/Mugshot';
import { County } from './types/County';

// Returns all Mugshot profile urls w/ a picture on a given page
export async function getMugshotHrefs(page: puppeteer.Page): Promise<string[]> {
    return await page.evaluate(() => {
        const els: NodeListOf<Element> = document.querySelectorAll('a[class="image-preview"]');
        return Array.from(els)
            .filter(el => !el.querySelector('div[class="no-image"]'))
            .map(el => window.origin + el.getAttribute('href'));
    });
}

export async function getMugshotsFromHrefs(page: puppeteer.Page, hrefs: string[], max: number = 100) {
    const mugshots = [];
    for (const [i, href] of hrefs.entries()) {
        if (i >= max) break;
        await page.goto(href);
        mugshots.push(await scrapeMugshot(page));
    }
    return mugshots;
}

export async function scrapeMugshot(page: puppeteer.Page): Promise<Mugshot> {
    const model: Mugshot = await page.evaluate(() => {
        const fieldNames = document.querySelectorAll('[class="name"]');
        const names = Array.from(fieldNames)
            .map(f => f.innerHTML)
            .map(s => s.toLowerCase());
        const fieldValues = document.querySelectorAll('[class="value"]');
        const values = Array.from(fieldValues).map(f => f.innerHTML);
    
        const name = window.location.href
            .split('/')
            .pop()
            .replace(/.[0-9]+.html/, '')
            .replace(/-/g, ' ');

        const imgUrl = document.querySelector('img[class="hidden-narrow"]')
            .getAttribute('src');
        
        let charge = '';
        let age = 0;

        return {
            url: window.location.href,
            name,
            imgUrl,
            age,
            charge
        };
    });

    return model;
}