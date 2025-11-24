import { OnlyfinderProfile } from '../scrapers/onlyfinder';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function buildFields(profile: OnlyfinderProfile): Record<string, string | null> {
  return {
    onlyfinderRid: profile.onlyfinderRid ?? null,
    onlyfinderUsername: profile.onlyfinderUsername ?? null,
    onlyfinderProfileUrl: profile.onlyfinderProfileUrl ?? null,
    onlyfansUsername: profile.onlyfansUsername ?? null,
    onlyfansUrl: profile.onlyfansUrl ?? null,
    instagramUrl: profile.instagramUrl ?? null,
    instagramHandle: profile.instagramHandle ?? null,
    twitterUrl: profile.twitterUrl ?? null,
    twitterHandle: profile.twitterHandle ?? null,
    tiktokUrl: profile.tiktokUrl ?? null,
    tiktokHandle: profile.tiktokHandle ?? null,
  };
}

export async function upsertOnlyfinderProfile(profile: OnlyfinderProfile): Promise<void> {
  const apiKey = requireEnv('AIRTABLE_API_KEY');
  const baseId = requireEnv('AIRTABLE_BASE_ID');
  const tableName = requireEnv('AIRTABLE_MODELS_TABLE_NAME');

  if (!profile.onlyfinderRid) {
    throw new Error('onlyfinderRid is required to upsert into Airtable');
  }

  const baseUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const filterFormula = encodeURIComponent(`{onlyfinderRid} = '${profile.onlyfinderRid}'`);
  const queryUrl = `${baseUrl}?maxRecords=1&filterByFormula=${filterFormula}`;

  const existingResponse = await fetch(queryUrl, { headers });
  if (!existingResponse.ok) {
    const body = await existingResponse.text();
    throw new Error(`Failed to query Airtable: ${existingResponse.status} ${body}`);
  }

  const existingData: { records?: Array<{ id: string }> } = await existingResponse.json();
  const existingRecordId = existingData.records?.[0]?.id;

  const fields = buildFields(profile);

  if (existingRecordId) {
    const updateResponse = await fetch(`${baseUrl}/${existingRecordId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ fields }),
    });

    if (!updateResponse.ok) {
      const body = await updateResponse.text();
      throw new Error(`Failed to update Airtable record: ${updateResponse.status} ${body}`);
    }

    return;
  }

  const createResponse = await fetch(baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ fields }),
  });

  if (!createResponse.ok) {
    const body = await createResponse.text();
    throw new Error(`Failed to create Airtable record: ${createResponse.status} ${body}`);
  }
}
