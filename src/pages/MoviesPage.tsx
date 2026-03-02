import './MoviesPage.css'

import {FC} from 'react';
import { useMoviesViewModel } from '../hooks/useMoviesViewModel';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const MoviesPage : FC = ()=>{
    // Usar el ViewModel para gestionar el estado
    const { movies, loading, error, deleteMovie } = useMoviesViewModel();

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta película?')) {
            await deleteMovie(id);
        }
    };

    return(
        <>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1><i className="fas fa-video me-2"></i>Catálogo de Películas</h1>
            <div className="d-flex gap-2">
                <span className="badge bg-primary fs-6">{ movies.length } películas</span>
                <Link to="/search-tmdb" className="btn btn-sm btn-outline-primary">
                    <i className="fas fa-plus me-2"></i>Añadir desde TMDB
                </Link>
            </div>
        </div>

        {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="fas fa-exclamation-circle me-2"></i>
                <strong>Error:</strong> {error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )}

        {loading ? (
            <div className="text-center py-5">
                <i className="fas fa-spinner fa-spin fa-2x text-muted mb-3"></i>
                <h3>Cargando películas...</h3>
            </div>
        ) : movies.length > 0 ? (
            <div className='row'>
                {movies.map(movie =>(
                    <div className="col-md-6 col-lg-4 mb-4" key={movie.id}>
                        <MovieCard 
                            movie={movie} 
                            showDetails 
                            onDelete={() => handleDelete(movie.id)}
                        />
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-5">
                <i className="fas fa-film fa-4x text-muted mb-3"></i>
                <h3>No hay películas disponibles</h3>
                <p className="text-muted">Pronto añadiremos más contenido.</p>
                <Link to="/search-tmdb" className="btn btn-primary">
                    <i className="fas fa-search me-2"></i>Buscar películas en TMDB
                </Link>
            </div>
        )}
        </>
    )
}

export default MoviesPage
