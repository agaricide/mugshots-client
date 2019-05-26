import * as puppeteer from 'puppeteer';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { Readable } from 'stream';

let browser: puppeteer.Browser;

beforeAll(async done => {
  browser = await puppeteer.launch();
  done();
});

afterAll(async done => {
  await browser.close();
  done();
});

// describe('MugshotStream', () => {
//   it('handles errors thrown from \'scrapeMugshots\'', async (done) => {
//     const scrapeMugshots = sinon.fake.throws(new Error('Some Error'));
//     const { MugshotStream } = proxyquire.noCallThru().load('../../client/mugshots/MugshotStream.ts', {
//       scrapeMugshots
//     });

//     const assert = function () {
//       expect(this).toHaveBeenCalled();
//       expect(mockOnData).toHaveBeenCalled();
//       done();
//     };

//     const mockOnError = jest.fn(assert);
//     const mockOnData = jest.fn(() => "chunk received");
    
//     const mugshotStream: Readable = await MugshotStream({ maxChunkSize: 1 });
//     mugshotStream.on("error", mockOnError);
//     mugshotStream.on("data", () => mockOnData);
//   });
// });




it('does a thing', () => {
  expect(true).toBe(true);
});