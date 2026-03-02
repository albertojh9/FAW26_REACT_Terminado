import './SearchTMDBPage.css';
import { FC, useState } from 'react';
import { useSearchTMDBViewModel } from '../hooks/useSearchTMDBViewModel';

const SearchTMDBPage: FC = () => {
  const { results, loading, error, searchById, searchByQuery, clearResults } =
    useSearchTMDBViewModel();
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState<'id' | 'text'>('id');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    if (searchType === 'id') {
      await searchById(searchInput);
    } else {
      await searchByQuery(searchInput);
    }
  };

  const handleClear = () => {
    clearResults();
    setSearchInput('');
  };

  return (
    <>
      <div className="mb-4">
        <h1>
          <i className="fas fa-search me-2"></i>Buscar en TMDB
        </h1>
        <p className="text-muted">
          Busca películas en The Movie Database
        </p>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="searchInput" className="form-label">
                  Búsqueda
                </label>
                <input
                  id="searchInput"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={
                    searchType === 'id'
                      ? 'Ej: 238 (El Padrino)'
                      : 'Ej: Inception, Avatar...'
                  }
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="searchType" className="form-label">
                  Tipo de búsqueda
                </label>
                <select
                  id="searchType"
                  className="form-select form-select-lg"
                  value={searchType}
                  onChange={(e) => {
                    setSearchType(e.target.value as 'id' | 'text');
                    setSearchInput('');
                  }}
                  disabled={loading}
                >
                  <option value="id">Por ID de TMDB</option>
                  <option value="text">Por texto</option>
                </select>
              </div>

              <div className="col-md-3 d-flex align-items-end gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg flex-grow-1"
                  disabled={loading || !searchInput.trim()}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-2"></i>Buscando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search me-2"></i>Buscar
                    </>
                  )}
                </button>
                {(results.length > 0 || searchInput) && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={handleClear}
                    disabled={loading}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="fas fa-exclamation-circle me-2"></i>
          <strong>Error:</strong> {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => clearResults()}
            aria-label="Close"
          ></button>
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <i className="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i>
          <h3>Buscando películas...</h3>
          <p className="text-muted">Por favor espera while buscamos en TMDB</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="mb-4">
            <h3>
              <i className="fas fa-film me-2"></i>Resultados ({results.length})
            </h3>
          </div>

          <div className="row">
            {results.map((movie) => (
                <div className="col-md-6 col-lg-4 mb-4" key={movie.id}>
                  <div className="card h-100 movie-card">
                    <div className="card-body d-flex flex-column">
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="card-img-top mb-3"
                        height="300px"
                      />
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text text-muted small">
                        <span>
                          <strong>Director:</strong> {movie.director}
                        </span>
                        <br />
                        <span>
                          <strong>Año:</strong> {movie.year}
                        </span>
                        <br />
                        <span>
                          <strong>Género:</strong> {movie.genre}
                        </span>
                        <br />
                        <span>
                          <strong>Puntuación:</strong>{' '}
                          <span className="text-warning">{movie.rating}/10</span>
                        </span>
                      </p>
                      <p className="card-text flex-grow-1 small">
                        {movie.description.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </>
      )}

      {!loading && results.length === 0 && searchInput && !error && (
        <div className="text-center py-5">
          <i className="fas fa-search fa-4x text-muted mb-3"></i>
          <h3>No se encontraron resultados</h3>
          <p className="text-muted">Intenta con otro término de búsqueda</p>
        </div>
      )}

      {!loading && results.length === 0 && !searchInput && !error && (
        <div className="text-center py-5">
          <i className="fas fa-film fa-4x text-muted mb-3"></i>
          <h3>Comienza a buscar</h3>
          <p className="text-muted">Usa el formulario superior para buscar películas en TMDB</p>
        </div>
      )}
    </>
  );
};

export default SearchTMDBPage;