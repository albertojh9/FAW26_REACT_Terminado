import { useState } from 'react';
import { Movie } from '../models/movie';
import { searchMoviesByTMDBId, searchMoviesByQuery } from '../services/tmdbService';

interface UseSearchTMDBViewModelReturn {
  results: Movie[];
  loading: boolean;
  error: string | null;
  searchById: (id: string) => Promise<void>;
  searchByQuery: (query: string) => Promise<void>;
  clearResults: () => void;
}

/**
 * ViewModel para la búsqueda en TMDB
 */
export function useSearchTMDBViewModel(): UseSearchTMDBViewModelReturn {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar por ID de TMDB
  const searchById = async (id: string) => {
    if (!id.trim()) {
      setError('Por favor ingresa un ID válido');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const movie = await searchMoviesByTMDBId(id.trim());
      if (movie) {
        setResults([movie]);
      } else {
        setError('Película no encontrada en TMDB');
        setResults([]);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al buscar en TMDB';
      setError(errorMsg);
      console.error('Error searching TMDB:', err);
    } finally {
      setLoading(false);
    }
  };

  // Buscar por texto
  const searchByQuery = async (query: string) => {
    if (!query.trim()) {
      setError('Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const movies = await searchMoviesByQuery(query.trim());
      if (movies.length > 0) {
        setResults(movies);
      } else {
        setError('No se encontraron películas');
        setResults([]);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al buscar en TMDB';
      setError(errorMsg);
      console.error('Error searching TMDB:', err);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar resultados
  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    searchById,
    searchByQuery,
    clearResults,
  };
}
