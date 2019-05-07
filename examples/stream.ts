import { MugshotStream, Mugshot } from '../dist';

// Console.log mugshot data using stream API
(async () => {
  const mugshotStream = await MugshotStream({ maxChunkSize: 10 });
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
