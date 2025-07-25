import {Recipes} from "./Recipes.jsx";
import {useEffect, useState} from "react";
import {supabase} from "../../supabase.js";
import {useParams} from "react-router-dom";
import {useCallback} from "react";

export function RecipesList() {
    const { filter } = useParams();
    const showFavoritePage = filter === "favorite";
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(15); // počet na stránku

    // Dynamická změna počtu receptů na stránku podle velikosti okna
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 560) setRecipesPerPage(3)
            else if (window.innerWidth < 874) setRecipesPerPage(6)
            else if (window.innerWidth < 1222) setRecipesPerPage(9)
            else if (window.innerWidth < 1488) setRecipesPerPage(12)
            else setRecipesPerPage(15);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const fetchRecipes = useCallback(async () => {
        try {
            let query = supabase.from('recipes').select('*').order('id');
            if (showFavoritePage) {
                query = query.eq('favorite', true);
            }
            const { data, error } = await query;
            if (!error) {
                setRecipes(data);
            }
        } catch (error) {
        }
    }, [showFavoritePage]);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    // stránkování
    const totalPages = Math.ceil(recipes.length / recipesPerPage);
    const paginatedRecipes = recipes.slice((page - 1) * recipesPerPage, page * recipesPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <>
            <div
                className="pt-[200px] md:pt-[260px] lg:pt-[200px] px-4 md:px-10 lg:px-20 max-w-[1700px] mb-5 mx-auto min-h-screen">
                <h2 className="text-base text-center md:text-lg md:text-start lg:text-2xl mt-5 mb-5 border-b-2 border-gray-500">
                    {showFavoritePage ? "Oblíbené recepty" : "Všechny recepty"} </h2>

                <Recipes recipes={paginatedRecipes} onFavoriteChange={fetchRecipes} />

                {/* stránkování */}
                <div className="flex justify-center gap-2 mt-8">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-3 py-1 rounded bg-teal-600 text-white disabled:bg-gray-300">Předchozí</button>
                    <span className="px-2 py-1">Strana {page} z {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-3 py-1 rounded bg-teal-600 text-white disabled:bg-gray-300">Další</button>
                </div>
            </div>
        </>
    )
}