"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const stream_1 = require("stream");
const CountyIterable_1 = require("../counties/CountyIterable");
const MugshotUrlIterable_1 = require("../mugshots/MugshotUrlIterable");
const scrapeMugshots_1 = require("../mugshots/scrapeMugshots");
const PagePool_1 = require("../utils/PagePool");
const MugshotStream = (options = {}) => __awaiter(this, void 0, void 0, function* () {
    let county;
    let urls;
    let mugshotIterator;
    const browser = yield puppeteer_1.launch();
    const pagePool = PagePool_1.PagePool(browser, Object.assign({ max: 10 }, options));
    const page = yield pagePool.acquire();
    const counties = yield CountyIterable_1.CountyIterator(page);
    county = yield counties.next();
    mugshotIterator = yield MugshotUrlIterable_1.MugshotUrlChunkIterator(page, county.value);
    const destroy = function (error, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (error)
                    this.emit('error', error);
                yield browser.close();
                callback(null);
            }
            catch (error) {
                callback(error);
            }
        });
    };
    const read = function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!urls || !urls.done) {
                    urls = yield mugshotIterator.next();
                }
                if (urls.done && !county.done) {
                    county = yield counties.next();
                    mugshotIterator = yield MugshotUrlIterable_1.MugshotUrlChunkIterator(page, county.value);
                    urls = yield mugshotIterator.next();
                }
                if (urls.done && county.done) {
                    return false;
                }
                const mugshots = yield scrapeMugshots_1.scrapeMugshots(pagePool, urls.value, options);
                this.push(mugshots);
            }
            catch (error) {
                this.emit('error', error);
                this.push([]);
            }
        });
    };
    return new stream_1.Readable({
        objectMode: true,
        destroy,
        read,
    });
});
exports.MugshotStream = MugshotStream;
//# sourceMappingURL=MugshotStream.js.map