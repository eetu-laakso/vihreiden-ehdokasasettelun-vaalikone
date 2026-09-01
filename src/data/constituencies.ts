/**
 * Electoral district keys. Each one must have a matching `constituency.<key>`
 * entry in every dictionary under `src/i18n/`. Åland is omitted because the
 * party does not run a list there; add it here if that changes.
 */
export const constituencies = [
  'helsinki',
  'uusimaa',
  'varsinais-suomi',
  'satakunta',
  'hame',
  'pirkanmaa',
  'kaakkois-suomi',
  'savo-karjala',
  'vaasa',
  'keski-suomi',
  'oulu',
  'lappi',
] as const

export type ConstituencyKey = (typeof constituencies)[number]
