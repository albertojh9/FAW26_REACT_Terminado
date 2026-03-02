import './Layout.css'
import Header from './Header'
import Footer from './Footer'
import {FC, ReactNode} from 'react'

interface elementosComponente{
    children : ReactNode;
}

const Layout:FC<elementosComponente> = ({children}) => {
    return(
        <>
        <Header />
        <main className = 'container'>
            {children}
        </main>
        <Footer />
        </>
    )
}

export default Layout
