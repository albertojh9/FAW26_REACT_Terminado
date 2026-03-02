import './HomePage.css'
import {FC} from 'react';
import { Link } from 'react-router'

const HomePage : FC = ()=>{    
    return(
        <>
<div className="hero-section bg-primary text-white rounded p-5 mb-4">
    <div className="row align-items-center">
        <div className="col-md-8">
            <h1 className="display-4">¡Bienvenido a CineFlask!</h1>
            <p className="lead">Tu portal personal de películas desarrollado con Flask</p>
            <p>Explora nuestra colección de películas, lee reseñas y comparte tus opiniones.</p>
            
            <Link to="/movies" className="btn btn-light btn-lg">
                <i className="fas fa-video me-2"></i>Ver Películas
            </Link>
        </div>
        <div className="col-md-4 text-center">
            <i className="fas fa-film fa-5x opacity-75"></i>
        </div>
    </div>
</div>

<div className="row">
    <div className="col-md-4 mb-3">
        <div className="card h-100">
            <div className="card-body text-center">
                <i className="fas fa-star fa-3x text-warning mb-3"></i>
                <h5 className="card-title">Catálogo de Calidad</h5>
                <p className="card-text">Descubre películas cuidadosamente seleccionadas con información detallada.</p>
            </div>
        </div>
    </div>
    <div className="col-md-4 mb-3">
        <div className="card h-100">
            <div className="card-body text-center">
                <i className="fas fa-users fa-3x text-info mb-3"></i>
                <h5 className="card-title">Comunidad</h5>
                <p className="card-text">Conecta con otros cinéfilos y comparte tus reseñas y recomendaciones.</p>
            </div>
        </div>
    </div>
    <div className="col-md-4 mb-3">
        <div className="card h-100">
            <div className="card-body text-center">
                <i className="fas fa-code fa-3x text-success mb-3"></i>
                <h5 className="card-title">Proyecto Flask</h5>
                <p className="card-text">Desarrollado como parte del módulo de Frameworks en DAW2.</p>
            </div>
        </div>
    </div>
</div>
        </>
    )
}

export default HomePage
