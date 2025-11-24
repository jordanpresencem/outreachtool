import { readFile } from 'fs/promises';
import path from 'path';
import { scrapeFromHtml } from './scrapers/onlyfinder';

async function main(): Promise<void> {
  try {
    const samplePath = path.resolve(__dirname, '..', 'samples', 'sample.html');
    const html = await readFile(samplePath, 'utf8');

    const profiles = scrapeFromHtml(html);
    console.log('Parsed profiles from sample HTML:');
    console.log(JSON.stringify(profiles, null, 2));
  } catch (error) {
    console.error('Failed to run scrape test:', error);
    process.exitCode = 1;
  }
}

void main();
