import { useEffect, useState } from 'react';
import { Movie } from '../models/movie';
import { URL_BACKEND } from '../services/environment';
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

  // Cargar películas del backend
  const loadMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      // Cargar solo películas locales del backend
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

      // Solo mostrar películas del backend local
      setMovies(applyFavoritesToMovies(localMovies));
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
