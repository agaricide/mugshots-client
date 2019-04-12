import 'reflect-metadata';
import * as mongoose from 'mongoose';
import { MugshotStream, Mugshot } from '../src/index';

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Console.log mugshot data using stream API
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
