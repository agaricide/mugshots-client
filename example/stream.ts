import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { MugshotModel } from './models/Mugshot';
import { MugshotStream, Mugshot } from '../src/index';

// Set environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Ingest mugshots using iterables
(async () => {
  const mugshotStream = await MugshotStream();
  console.log('Stream created.');

  mugshotStream.on('error', (error) => {
      console.log(error);
  });

  mugshotStream.on('close', () => {
      console.log('Stream closed.');
  });

  mugshotStream.on('data', (mugshots: Mugshot[]) => {
    console.log('data', mugshots);
  });
})();

