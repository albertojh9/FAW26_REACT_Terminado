export function getTmdbApiKey(): string {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) {
    throw new Error('Missing TMDB API key. Check .env.local');
  }
  return key;
}
