import { runHttpScrape } from '../scrapers/onlyfinder';

async function main() {
  try {
    await runHttpScrape();
  } catch (error) {
    console.error('Failed to scrape OnlyFinder:', error);
    process.exitCode = 1;
  }
}

main();
