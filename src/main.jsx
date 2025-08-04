import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import {HomePage} from './components/Body/HomePage.jsx'
import {RecipesList} from "./components/Body/RecipesList.jsx";
import {DetailRecipe} from "./components/Body/DetailRecipe.jsx";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddRecipes} from "./components/Body/AddRecipes.jsx";



createRoot(document.getElementById('root')).render(
    <StrictMode>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="recipes-list" element={<RecipesList />} />
                    <Route path="recipes-list/:filter" element={<RecipesList />} />
                    <Route path="newRecipes" element={<AddRecipes />} />
                    <Route path="recept/:id" element={<DetailRecipe />} />

                </Route>

            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
