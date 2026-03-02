import { useState } from 'react';
import { Movie } from '../models/movie';
import { searchMoviesByTMDBId, searchMoviesByQuery } from '../services/tmdbService';

interface UseSearchTMDBViewModelReturn {
  results: Movie[];
  loading: boolean;
  error: string | null;
  searchById: (id: string) => Promise<void>;
  searchByQuery: (query: string) => Promise<void>;
  saveMovie: (movie: Movie) => Promise<boolean>;
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

  // Guardar película en el catálogo local
  const saveMovie = async (movie: Movie): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: movie.title,
          director: movie.director,
          year: movie.year,
          genre: movie.genre,
          description: movie.description,
          rating: movie.rating,
          poster_url: movie.poster_url,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Error: ${response.status}`);
      }

      // Remover de resultados si ya estaba
      setResults((prevResults) =>
        prevResults.filter((m) => m.id !== movie.id)
      );

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al guardar película';
      setError(errorMsg);
      console.error('Error saving movie:', err);
      return false;
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
    saveMovie,
    clearResults,
  };
}
