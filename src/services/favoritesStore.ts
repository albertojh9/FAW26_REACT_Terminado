const FAVORITES_STORAGE_KEY = 'movie-favorites';

type FavoritesMap = Record<number, boolean>;

function readFavorites(): FavoritesMap {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as FavoritesMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeFavorites(favorites: FavoritesMap): void {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavoriteMovie(movieId: number): boolean {
  const favorites = readFavorites();
  return Boolean(favorites[movieId]);
}

export function setFavoriteMovie(movieId: number, value: boolean): void {
  const favorites = readFavorites();

  if (value) {
    favorites[movieId] = true;
  } else {
    delete favorites[movieId];
  }

  writeFavorites(favorites);
}

export function applyFavoritesToMovies<T extends { id: number; isFavorite?: boolean }>(
  movies: T[]
): T[] {
  return movies.map((movie) => ({
    ...movie,
    isFavorite: isFavoriteMovie(movie.id),
  }));
}
