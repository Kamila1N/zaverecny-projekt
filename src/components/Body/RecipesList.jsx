import {Recipes} from "./Recipes.jsx";
import {useEffect, useState} from "react";
import {supabase} from "../../supabase.js";
import {useParams} from "react-router-dom";
import {useCallback} from "react";

export function RecipesList() {

    const { filter } = useParams();
    const showFavoritePage = filter === "favorite";
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = useCallback(async () => {
        try {
            let query = supabase.from('recipes').select('*');
            if (showFavoritePage) {
                query = query.eq('favorite', true);
            }
            const { data, error } = await query;
            if (error) {
                console.error("Chyba při načítání receptů:", error);
            } else {
                setRecipes(data);
                console.table("Načtené recepty:", data);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }, [showFavoritePage]);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);



    return (
        <>
            <div
                className="pt-[200px] md:pt-[260px] lg:pt-[200px] px-4 md:px-10 lg:px-20 max-w-[1700px] mx-auto h-screen">
                <h2 className="text-base text-center md:text-lg md:text-start lg:text-2xl mt-5 mb-5 border-b-2 border-gray-500">
                    {showFavoritePage ? "Oblíbené recepty" : "Všechny recepty"} </h2>

            <Recipes recipes={recipes} onFavoriteChange={fetchRecipes} />

            </div>
        </>
    )
}