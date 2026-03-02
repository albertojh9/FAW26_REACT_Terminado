// src/components/MovieCard.tsx
// Componente visual para mostrar una película
import { FC } from "react";
import { Link } from 'react-router-dom';
import { Movie } from "../models/movie";
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  showDetails?: boolean;
  onDelete?: () => void;
}

const MovieCard: FC<MovieCardProps> = ({ 
  movie, 
  showDetails = false,
  onDelete
}) => {
  return (
    <div className="card h-100 movie-card">
      <div className="card-body d-flex flex-column position-relative">
        
        <img src={movie.poster_url} alt={movie.title} className="card-img-top mb-3" height="300px" />
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text text-muted small">
          <span><strong>Director:</strong> {movie.director}</span><br />
          <span><strong>Año:</strong> {movie.year}</span><br />
          <span><strong>Género:</strong> {movie.genre}</span><br />
          <span><strong>Puntuación:</strong> <span className="text-warning">{movie.rating}/10</span></span>
        </p>
        <p className="card-text flex-grow-1 small">{movie.description.substring(0, 100)}...</p>
        
        <div className="d-grid gap-2 mt-auto">
          {showDetails && (
            <Link to={`/movie/${movie.id}`} className="btn btn-outline-primary btn-sm">
              <i className="fas fa-eye me-1"></i>Ver detalles
            </Link>
          )}
          {onDelete && (
            <button 
              className="btn btn-outline-danger btn-sm" 
              onClick={onDelete}
            >
              <i className="fas fa-trash me-1"></i>Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

// Comentarios:
// - Usa los campos del modelo Movie.
// - Adapta el nombre del campo poster_url/poster según la fuente de datos.
// - Puedes añadir más detalles visuales si lo necesitas.
// - onDelete es callback opcional para manejar eliminación de películas