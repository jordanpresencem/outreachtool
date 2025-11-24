export interface OnlyfinderProfile {
  onlyfinderRid: string | null;
  onlyfinderUsername: string | null;
  onlyfinderProfileUrl: string | null;

  onlyfansUsername: string | null;
  onlyfansUrl: string | null;

  instagramUrl?: string | null;
  instagramHandle?: string | null;

  twitterUrl?: string | null;
  twitterHandle?: string | null;

  tiktokUrl?: string | null;
  tiktokHandle?: string | null;
}

const USER_BLOCK_START_PATTERN = /<div[^>]*class="[^"]*\buser-profile\b[^"]*"[^>]*>/gi;
const ANCHOR_HREF_PATTERN = /<a[^>]*href="([^"]+)"[^>]*>/gi;
const ONLYFANS_TEXT_PATTERN = /onlyfans\.com\s*(?:>|&gt;)\s*([^<]+)/i;

function findFirstHref(block: string): string | undefined {
  const match = ANCHOR_HREF_PATTERN.exec(block);
  ANCHOR_HREF_PATTERN.lastIndex = 0;
  return match?.[1];
}

function findLink(block: string, patterns: RegExp[]): string | undefined {
  let match: RegExpExecArray | null;
  while ((match = ANCHOR_HREF_PATTERN.exec(block)) !== null) {
    const href = match[1];
    if (patterns.some((pattern) => pattern.test(href))) {
      ANCHOR_HREF_PATTERN.lastIndex = 0;
      return href;
    }
  }
  ANCHOR_HREF_PATTERN.lastIndex = 0;
  return undefined;
}

function extractHandleFromUrl(url: string): string | undefined {
  const withoutProtocol = url.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  const path = withoutProtocol.split(/[?#]/)[0];
  const segments = path.split('/').filter(Boolean);
  if (segments.length < 2) return undefined;

  const handle = segments[1].replace(/^@/, '').replace(/\/$/, '');
  return handle || undefined;
}

function extractOnlyfansUsername(block: string): string | null {
  const textMatch = ONLYFANS_TEXT_PATTERN.exec(block);
  if (!textMatch) return null;

  const username = textMatch[1]?.replace(/&gt;/g, '>').split('>')?.pop()?.trim();
  ONLYFANS_TEXT_PATTERN.lastIndex = 0;
  return username || null;
}

export function scrapeFromHtml(html: string): OnlyfinderProfile[] {
  const profiles: OnlyfinderProfile[] = [];

  const blockStarts: Array<{ index: number; opener: string }> = [];
  let startMatch: RegExpExecArray | null;

  while ((startMatch = USER_BLOCK_START_PATTERN.exec(html)) !== null) {
    blockStarts.push({ index: startMatch.index, opener: startMatch[0] });
  }

  for (let i = 0; i < blockStarts.length; i++) {
    const startIndex = blockStarts[i].index;
    const endIndex = blockStarts[i + 1]?.index ?? html.length;
    const block = html.slice(startIndex, endIndex);
    const opener = blockStarts[i].opener;

    const ridMatch = /data-rid\s*=\s*"([^"]+)"/i.exec(opener);
    const onlyfinderRid = ridMatch?.[1] ?? null;
    const usernameMatch = /data-username\s*=\s*"([^"]+)"/i.exec(opener);
    const onlyfinderUsername = usernameMatch?.[1] ?? null;

    const onlyfinderProfileUrl = findFirstHref(block) ?? null;

    const onlyfansUsername = extractOnlyfansUsername(block);
    const onlyfansUrl = onlyfansUsername ? `https://onlyfans.com/${onlyfansUsername}` : null;

    const instagramUrl = findLink(block, [/instagram\.com/i]) ?? null;
    const tiktokUrl = findLink(block, [/tiktok\.com/i]) ?? null;
    const twitterUrl = findLink(block, [/(?:twitter|x)\.com/i]) ?? null;

    profiles.push({
      onlyfinderRid,
      onlyfinderUsername,
      onlyfinderProfileUrl,
      onlyfansUsername,
      onlyfansUrl,
      instagramUrl,
      instagramHandle: instagramUrl ? extractHandleFromUrl(instagramUrl) : undefined,
      tiktokUrl,
      tiktokHandle: tiktokUrl ? extractHandleFromUrl(tiktokUrl) : undefined,
      twitterUrl,
      twitterHandle: twitterUrl ? extractHandleFromUrl(twitterUrl) : undefined,
    });
  }

  USER_BLOCK_START_PATTERN.lastIndex = 0;
  return profiles;
}

export function scrapeOnlyfinderPage(html: string): OnlyfinderProfile[] {
  return scrapeFromHtml(html);
}

export async function runHttpScrape(targetUrl?: string): Promise<OnlyfinderProfile[]> {
  const url = targetUrl || process.env.ONLYFINDER_URL || 'https://onlyfinder.co/new';

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OnlyFinder HTML from ${url}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const profiles = scrapeFromHtml(html);

  console.log(`Fetched ${profiles.length} profiles from ${url}`);
  console.log(JSON.stringify(profiles, null, 2));

  return profiles;
}
