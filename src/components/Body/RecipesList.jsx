import React from "react";
import {Recipes} from "./Recipes.jsx";
import {useEffect, useState, useCallback} from "react";
import {supabase} from "../../supabase.js";
import {useParams, useLocation} from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function RecipesList() {
    const { filter } = useParams();
    const showFavoritePage = filter === "favorite";
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(15);
    const [totalCount, setTotalCount] = useState(0);
    const query = useQuery();
    const searchTerm = query.get('search')?.toLowerCase() || "";

    const fetchRecipes = useCallback(async (pageToLoad = page, perPageToLoad = recipesPerPage) => {
        const from = (pageToLoad - 1) * perPageToLoad;
        const to = from + perPageToLoad - 1;
        let query = supabase.from('recipes').select('*', { count: 'exact' }).order('id').range(from, to);
        if (showFavoritePage) {
            query = query.eq('favorite', true);
        }
        if (searchTerm) {
            query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }
        const { data, error, count } = await query;
        if (!error) {
            setRecipes(data);
            if (typeof count === 'number') setTotalCount(count);
        }
    }, [showFavoritePage, searchTerm, page, recipesPerPage]);

    useEffect(() => {
        fetchRecipes(page, recipesPerPage);
    }, [fetchRecipes, page, recipesPerPage]);

    useEffect(() => {
        const handleResize = () => {
            let newPerPage;
            if (window.innerWidth < 560) newPerPage = 3;
            else if (window.innerWidth < 874) newPerPage = 6;
            else if (window.innerWidth < 1222) newPerPage = 9;
            else if (window.innerWidth < 1488) newPerPage = 12;
            else newPerPage = 15;
            setRecipesPerPage(newPerPage);
            setPage(1); // reset na první stránku při změně velikosti okna
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const totalPages = Math.ceil(totalCount / recipesPerPage);
    const paginatedRecipes = recipes;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="pt-[200px] md:pt-[260px] lg:pt-[200px] px-4 md:px-10 lg:px-20 max-w-[1700px] mb-5 mx-auto min-h-screen">
            <h2 className="text-base text-center md:text-lg md:text-start lg:text-2xl mt-5 mb-5 border-b-2 border-gray-500">
                {showFavoritePage ? "Oblíbené recepty" : "Všechny recepty"}
            </h2>
            <Recipes recipes={paginatedRecipes} onFavoriteChange={fetchRecipes} />
            <div className="flex justify-center gap-2 mt-8">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-3 py-1 rounded bg-teal-600 text-white disabled:bg-gray-300">Předchozí</button>
                <span className="px-2 py-1">Strana {page} z {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-3 py-1 rounded bg-teal-600 text-white disabled:bg-gray-300">Další</button>
            </div>
        </div>
    )
}