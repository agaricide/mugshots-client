import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { CountyModel, County } from './models/County';
import { scrapeAllCountyPages } from '../src/index';
import { MugshotModel } from './models/Mugshot';
import { shuffle } from './utils/shuffle';

// Set environment variables
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const cap = 400;

(async () => {
    console.log('Getting all counties...');
    const counties = await CountyModel.find();
    shuffle(counties);

    for (const [i, county] of counties.entries()) {
        const scraped = await scrapeAllCountyPages(county, cap);
        const valids = scraped.filter(mugshot => {
            return mugshot.charges && !mugshot.charges.toLowerCase().includes('n/a');
        });
        console.log(`Chunk ${i}/${cap} completed.`);
        MugshotModel.insertMany(valids);
    }
})();
