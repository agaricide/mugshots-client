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
const scrapeMugshot_1 = require("./scrapeMugshot");
const defaults = {
    maxChunkSize: 100
};
function scrapeMugshots(pagePool, urls, opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = Object.assign({}, defaults, opts);
        const mugshots = urls
            .slice(0, options.maxChunkSize)
            .map((url) => __awaiter(this, void 0, void 0, function* () {
            const page = yield pagePool.acquire();
            const mugshot = yield scrapeMugshot_1.scrapeMugshot(page, url);
            pagePool.release(page);
            return mugshot;
        }));
        return Promise.all(mugshots);
    });
}
exports.scrapeMugshots = scrapeMugshots;
//# sourceMappingURL=scrapeMugshots.js.map