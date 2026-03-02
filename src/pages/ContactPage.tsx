import './ContactPage.css'
import {FC} from 'react';

const ContactPage : FC = ()=>{    
    return(
        <>
<div className="row justify-content-center">
    <div className="col-md-8">
        <h1>Contacto</h1>
        <div className="card">
            <div className="card-body">
                <form method="POST">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="name" className="form-label">Nombre *</label>
                            <input type="text" className="form-control" id="name" name="name" required></input>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">Email *</label>
                            <input type="email" className="form-control" id="email" name="email" required></input>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Asunto</label>
                        <input type="text" className="form-control" id="subject" name="subject"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Mensaje *</label>
                        <textarea className="form-control" id="message" name="message" rows={5} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar mensaje</button>
                </form>
            </div>
        </div>
    </div>
</div>
        </>
    )
}

export default ContactPage
