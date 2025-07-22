import {Recipes} from "./Recipes.jsx";

export function RecipesList() {
    return (
        <>
            <div
                className="pt-[200px] md:pt-[260px] lg:pt-[200px] px-4 md:px-10 lg:px-20 max-w-[1700px] mx-auto h-screen">
                <h2 className="text-base text-center md:text-lg md:text-start lg:text-2xl mt-5 mb-5 border-b-2 border-gray-500">Všechny recepty </h2>

            <Recipes/>

            </div>
        </>
    )
}