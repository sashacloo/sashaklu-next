import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 't8936xyj',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});
