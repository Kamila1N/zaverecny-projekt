import './App.css'

import {Header} from './components/Header/Header.jsx'
import {Footer} from './components/Footer/Footer.jsx'
import {HomePage} from './components/Body/HomePage.jsx'
import {RecipesList} from './components/Body/RecipesList.jsx'
import {Articles} from './components/Body/Articles.jsx'
import {Outlet} from 'react-router-dom'


function App() {

    return (
        <>
            <Header/>
            {/*<HomePage />*/}
            {/*<RecipesList />*/}
            {/*  <Articles />*/}
            <Outlet />
            <Footer/>
        </>
    )
}

export default App
