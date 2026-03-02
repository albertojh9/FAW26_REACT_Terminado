import { useEffect, useState } from 'react';
import { Movie } from '../models/movie';
import { URL_BACKEND } from '../services/environment';
import { getPopularMovies } from '../services/tmdbService';
import { applyFavoritesToMovies, isFavoriteMovie, setFavoriteMovie } from '../services/favoritesStore';

interface UseMoviesViewModelReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  deleteMovie: (id: number) => Promise<void>;
  toggleFavorite: (id: number) => void;
  addMovie: (movie: Movie) => void;
  refreshMovies: () => Promise<void>;
}

/**
 * ViewModel para la pantalla de películas
 * Centraliza la lógica de estado y fetching de datos
 * Sincroniza películas del backend local con TMDB
 */
export function useMoviesViewModel(): UseMoviesViewModelReturn {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función helper para deduplicar películas
  const deduplicateMovies = (movies: Movie[]): Movie[] => {
    const seen = new Set<string>();
    return movies.filter(movie => {
      const key = `${movie.title.toLowerCase().trim()}|${movie.year}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  // Cargar películas del backend
  const loadMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      // Cargar películas locales
      const localResponse = await fetch(URL_BACKEND);
      if (!localResponse.ok) {
        throw new Error(`Error: ${localResponse.status}`);
      }
      const localData = await localResponse.json() as any[];
      const localMovies = localData.map(
        (item) =>
          new Movie(
            item.id,
            item.title,
            item.director,
            item.year,
            item.genre,
            item.description,
            item.rating,
            item.poster_url,
            isFavoriteMovie(item.id)
          )
      );

      // Intentar cargar TODAS las películas populares de TMDB
      let allTmdbMovies: Movie[] = [];
      try {
        // Cargar múltiples páginas para obtener más películas
        // TMDB devuelve 20 películas por página, cargaremos hasta 5 páginas (100 películas)
        const maxPages = 5;
        for (let page = 1; page <= maxPages; page++) {
          try {
            const popularMovies = await getPopularMovies(page);
            allTmdbMovies = allTmdbMovies.concat(popularMovies);
          } catch (pageErr) {
            console.warn(`Error cargando página ${page} de TMDB:`, pageErr);
            // Continuar con las páginas cargadas
            break;
          }
        }
        console.log(`Se cargaron ${allTmdbMovies.length} películas de TMDB`);
      } catch (tmdbErr) {
        console.warn('No se pudieron cargar películas de TMDB:', tmdbErr);
        // Continuar con películas locales si TMDB falla
      }

      // Combinar y deduplicar: primero las locales, luego las de TMDB sin duplicados
      const combinedMovies: Movie[] = [...localMovies];
      
      // Agregar películas de TMDB que no están en el catálogo
      for (const tmdbMovie of allTmdbMovies) {
        const alreadyExists = combinedMovies.some(
          m => m.title.toLowerCase().trim() === tmdbMovie.title.toLowerCase().trim() &&
               m.year === tmdbMovie.year
        );
        
        if (!alreadyExists) {
          combinedMovies.push(tmdbMovie);
        }
      }

      // Aplicar deduplicación final para asegurar no hay duplicados
      const finalMovies = deduplicateMovies(combinedMovies);
      setMovies(applyFavoritesToMovies(finalMovies));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar películas');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar películas al montar
  useEffect(() => {
    loadMovies();
  }, []);

  // Eliminar una película del catálogo
  const deleteMovie = async (id: number) => {
    try {
      const response = await fetch(`${URL_BACKEND}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setFavoriteMovie(id, false);
      // Actualizar estado local
      setMovies((prevMovies) => prevMovies.filter((m) => m.id !== id));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al eliminar película';
      setError(errorMsg);
      console.error('Error deleting movie:', err);
    }
  };

  // Toggle de favorito
  const toggleFavorite = (id: number) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      );

      const targetMovie = updatedMovies.find((movie) => movie.id === id);
      if (targetMovie) {
        setFavoriteMovie(id, Boolean(targetMovie.isFavorite));
      }

      return updatedMovies;
    });
  };

  // Añadir una nueva película (desde TMDB)
  const addMovie = (movie: Movie) => {
    setMovies((prevMovies) => {
      // Evitar duplicados por título y año (case-insensitive y trimmed)
      const isDuplicate = prevMovies.some(
        m => m.title.toLowerCase().trim() === movie.title.toLowerCase().trim() &&
             m.year === movie.year
      );
      
      if (isDuplicate) {
        console.warn(`Película duplicada detectada: ${movie.title} (${movie.year})`);
        return prevMovies;
      }
      
      return applyFavoritesToMovies([movie, ...prevMovies]);
    });
  };

  // Actualizar lista de películas
  const refreshMovies = async () => {
    await loadMovies();
  };

  return {
    movies,
    loading,
    error,
    deleteMovie,
    toggleFavorite,
    addMovie,
    refreshMovies,
  };
}
