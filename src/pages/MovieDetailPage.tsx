import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {FC} from 'react';
import './MovieDetailPage.css'
import { useMovieDetailViewModel } from '../hooks/useMovieDetailViewModel';

const MovieDetailPage : FC = ()=>{   
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const movieId = Number.parseInt(id ?? '', 10);
    const { movie, loading, error, toggleFavorite, deleteMovie } = useMovieDetailViewModel(movieId);

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta película?')) {
            await deleteMovie();
            navigate('/movies');
        }
    };
    
    if (Number.isNaN(movieId)) {
        return <Navigate to="/"/>
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <i className="fas fa-spinner fa-spin fa-2x text-muted mb-3"></i>
                <h3>Cargando película...</h3>
            </div>
        );
    }

    if (error || !movie) {
        return <Navigate to="/"/>
    }

    return(
        <>
           <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                    <li className="breadcrumb-item"><Link to="/movies">Películas</Link></li>
                    <li className="breadcrumb-item active">{movie.title}</li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <img src={movie.poster_url} 
             className="img-fluid rounded shadow" alt={ movie.title}></img>
                    <button 
                        className={`btn w-100 mt-3 ${movie.isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={toggleFavorite}
                    >
                        <i className={`fas fa-heart me-2 ${movie.isFavorite ? '' : 'far'}`}></i>
                        {movie.isFavorite ? 'Favorita' : 'Añadir a favoritos'}
                    </button>
                </div>
                <div className="col-md-8">
                    <h1>{ movie.title }</h1>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <p><strong><i className="fas fa-user-tie me-2"></i>Director:</strong> { movie.director }</p>
                            <p><strong><i className="fas fa-calendar me-2"></i>Año:</strong> { movie.year }</p>
                        </div>
                        <div className="col-sm-6">
                            <p><strong><i className="fas fa-tag me-2"></i>Género:</strong> { movie.genre }</p>
                            <p><strong><i className="fas fa-star me-2"></i>Puntuación:</strong> 
                                <span className="fs-5 text-warning">{ movie.rating }/10</span>
                            </p>
                        </div>
                    </div>
                    <h3>Sinopsis</h3>
                    <p className="lead">{ movie.description }</p>
                    <div className="mt-4 d-flex gap-2">
                        <Link to="/movies" className="btn btn-secondary">
                            <i className="fas fa-arrow-left me-2"></i>Volver al catálogo
                        </Link>
                        <button 
                            className="btn btn-outline-danger"
                            onClick={handleDelete}
                        >
                            <i className="fas fa-trash me-2"></i>Eliminar película
                        </button>
                    </div>
                </div>
            </div>
            <hr className="my-5"></hr>
            <div className="row">
    <div className="col-12">
        <h3><i className="fas fa-comments me-2"></i>Reseñas</h3>
        <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            Las reseñas estarán disponibles en la próxima versión.
        </div>
        </div>
    </div>
        </>
    )
}

export default MovieDetailPage
