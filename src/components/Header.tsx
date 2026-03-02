import './Header.css'
import { Link } from 'react-router'
import {FC} from 'react'

const Header : FC = ()=>{
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <i className="fas fa-film me-2"></i>CineFlask
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <i className="fas fa-home me-1"></i>Inicio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/movies">
                            <i className="fas fa-video me-1"></i>Películas
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/search-tmdb">
                            <i className="fas fa-search me-1"></i>Buscar TMDB
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">
                            <i className="fas fa-info-circle me-1"></i>Sobre
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">
                            <i className="fas fa-envelope me-1"></i>Contacto
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
        </>
    )
}

export default Header
