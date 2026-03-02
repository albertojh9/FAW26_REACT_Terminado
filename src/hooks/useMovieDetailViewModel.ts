import { useEffect, useState } from 'react';
import { Movie } from '../models/movie';
import { URL_BACKEND_DETAILS } from '../services/environment';
import { isFavoriteMovie, setFavoriteMovie } from '../services/favoritesStore';

interface UseMovieDetailViewModelReturn {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
  toggleFavorite: () => void;
  deleteMovie: () => Promise<void>;
}

/**
 * ViewModel para la pantalla de detalles de película
 */
export function useMovieDetailViewModel(id: number): UseMovieDetailViewModelReturn {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar película desde mock o backend
  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${URL_BACKEND_DETAILS}${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const loadedMovie = new Movie(
          data.id,
          data.title,
          data.director,
          data.year,
          data.genre,
          data.description,
          data.rating,
          data.poster_url,
          isFavoriteMovie(data.id)
        );
        setMovie(loadedMovie);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar película');
        console.error('Error fetching movie detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  // Toggle de favorito
  const toggleFavorite = () => {
    setMovie((prevMovie) => {
      if (!prevMovie) return null;
      const nextValue = !prevMovie.isFavorite;
      setFavoriteMovie(prevMovie.id, nextValue);
      return { ...prevMovie, isFavorite: nextValue };
    });
  };

  // Eliminar película
  const deleteMovie = async () => {
    if (!movie) return;
    try {
      const response = await fetch(`${URL_BACKEND_DETAILS}${movie.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setFavoriteMovie(movie.id, false);
      setMovie(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al eliminar película';
      setError(errorMsg);
      console.error('Error deleting movie:', err);
    }
  };

  return {
    movie,
    loading,
    error,
    toggleFavorite,
    deleteMovie,
  };
}
