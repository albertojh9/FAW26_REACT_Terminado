import { Movie } from '../models/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  poster_path: string | null;
  genres?: Array<{ id: number; name: string }>;
  credits?: {
    crew: Array<{ job: string; name: string }>;
  };
}

interface TMDBGenres {
  genres: Array<{ id: number; name: string }>;
}

let genresCache: { [key: number]: string } = {};

/**
 * Obtener géneros desde TMDB para mapear IDs a nombres
 */
async function fetchGenres(): Promise<void> {
  if (Object.keys(genresCache).length > 0) return;

  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es`
    );
    if (!response.ok) throw new Error('Error fetching genres');
    const data = (await response.json()) as TMDBGenres;
    data.genres.forEach((genre) => {
      genresCache[genre.id] = genre.name;
    });
  } catch (err) {
    console.error('Error fetching TMDB genres:', err);
  }
}

/**
 * Mapear película de TMDB a nuestro modelo Movie
 */
function mapTMDBToMovie(tmdbMovie: TMDBMovie): Movie {
  const year = tmdbMovie.release_date
    ? new Date(tmdbMovie.release_date).getFullYear()
    : 0;

  // Extraer director del crew
  const director =
    tmdbMovie.credits?.crew?.find((c) => c.job === 'Director')?.name || 'N/A';

  // Mapear géneros
  const genres = (tmdbMovie.genres || [])
    .map((g) => g.name)
    .join(', ') || 'N/A';

  const posterUrl = tmdbMovie.poster_path
    ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return new Movie(
    tmdbMovie.id,
    tmdbMovie.title,
    director,
    year,
    genres,
    tmdbMovie.overview || 'No hay descripción disponible',
    tmdbMovie.vote_average || 0,
    posterUrl,
    false // not favorite by default
  );
}

/**
 * Buscar película por ID de TMDB
 */
export async function searchMoviesByTMDBId(id: string): Promise<Movie | null> {
  try {
    if (!API_KEY) {
      throw new Error('VITE_TMDB_API_KEY no está configurado');
    }

    await fetchGenres();

    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es&append_to_response=credits`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error: ${response.status}`);
    }

    const data = (await response.json()) as TMDBMovie;
    return mapTMDBToMovie(data);
  } catch (err) {
    console.error('Error searching TMDB by ID:', err);
    throw err;
  }
}

/**
 * Buscar películas por texto
 */
export async function searchMoviesByQuery(query: string): Promise<Movie[]> {
  try {
    if (!API_KEY) {
      throw new Error('VITE_TMDB_API_KEY no está configurado');
    }

    await fetchGenres();

    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es&query=${encodeURIComponent(
        query
      )}&page=1`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    interface TMDBSearchResponse {
      results: TMDBMovie[];
    }

    const data = (await response.json()) as TMDBSearchResponse;
    const movies = data.results
      .filter((movie) => movie.poster_path) // Filtrar películas sin póster
      .slice(0, 10) // Limitar a 10 resultados
      .map(mapTMDBToMovie);

    return movies;
  } catch (err) {
    console.error('Error searching TMDB by query:', err);
    throw err;
  }
}

/**
 * Obtener películas populares de TMDB
 */
export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  try {
    if (!API_KEY) {
      throw new Error('VITE_TMDB_API_KEY no está configurado');
    }

    await fetchGenres();

    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    interface TMDBPopularResponse {
      results: TMDBMovie[];
      total_pages: number;
    }

    const data = (await response.json()) as TMDBPopularResponse;
    const movies = data.results
      .filter((movie) => movie.poster_path) // Filtrar películas sin póster
      .map(mapTMDBToMovie);

    return movies;
  } catch (err) {
    console.error('Error fetching popular movies from TMDB:', err);
    throw err;
  }
}

/**
 * Obtener películas en cartelera (now playing) de TMDB
 */
export async function getNowPlayingMovies(page: number = 1): Promise<Movie[]> {
  try {
    if (!API_KEY) {
      throw new Error('VITE_TMDB_API_KEY no está configurado');
    }

    await fetchGenres();

    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    interface TMDBPlayingResponse {
      results: TMDBMovie[];
      total_pages: number;
    }

    const data = (await response.json()) as TMDBPlayingResponse;
    const movies = data.results
      .filter((movie) => movie.poster_path) // Filtrar películas sin póster
      .map(mapTMDBToMovie);

    return movies;
  } catch (err) {
    console.error('Error fetching now playing movies from TMDB:', err);
    throw err;
  }
}

// Funciones de compatibilidad hacia atrás
export async function searchMovies(query: string): Promise<Movie[]> {
  return searchMoviesByQuery(query);
}

export async function searchMovieById(id: string): Promise<Movie | null> {
  return searchMoviesByTMDBId(id);
}