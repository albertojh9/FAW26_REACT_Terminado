import './AboutPage.css'
import {FC} from 'react';

const AboutPage : FC = ()=>{    
    return(
        <>
<div className="row justify-content-center">
    <div className="col-md-8">
        <h1>Sobre CineFlask</h1>
        <div className="card">
            <div className="card-body">
                <h3>¿Qué es CineFlask?</h3>
                <p>CineFlask es una aplicación web desarrollada con Flask como parte del módulo de Frameworks para la Web en DAW2.</p>
                <h5>Tecnologías Utilizadas</h5>
                <ul>
                    <li>Python 3.8+</li>
                    <li>Flask 2.3</li>
                    <li>SQLite</li>
                    <li>Bootstrap 5</li>
                    <li>HTML5 + CSS3</li>
                </ul>
            </div>
        </div>
    </div>
</div>
        </>
    )
}

export default AboutPage
