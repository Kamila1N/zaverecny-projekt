import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import {HomePage} from './components/Body/HomePage.jsx'
import {RecipesList} from "./components/Body/RecipesList.jsx";

import {BrowserRouter, Route, Routes} from "react-router-dom";



createRoot(document.getElementById('root')).render(
    <StrictMode>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="recipes-list" element={<RecipesList />} />
                    <Route path="recipes-list/:filter" element={<RecipesList />} />

                </Route>

            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
