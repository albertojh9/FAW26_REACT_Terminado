import './Footer.css'
import {FC} from 'react'

const Footer : FC = ()=>{
    return(
        <>
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <div className="container">
                <p>&copy; 2025 CineFlask - Proyecto DAW2 Frameworks. <small>Hecho con Flask </small></p>
            </div>
        </footer>
        </>
    )
}

export default Footer
