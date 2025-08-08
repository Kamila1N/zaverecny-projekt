import {useState, useEffect} from "react";
import React from "react";
import './Header.scss'
import logo from '../../assets/logo.jpg'
import searchIcon from '../../assets/loupe.png'
import heartIcon from '../../assets/heart.png'
import heartBlackIcon from '../../assets/heart-black.png'
import {NavLink, useNavigate, useLocation} from "react-router-dom";

export function Header() {
    const location = useLocation();
    const isFavoritePage = location.pathname.includes('/recipes-list/favorite');
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Při změně stránky nastav input podle query parametru
    useEffect(() => {
        // Pokud jsem na detailu receptu, input bude vždy prázdný
        if (location.pathname.startsWith('/recept/')) {
            setSearch("");
        } else {
            const params = new URLSearchParams(location.search);
            setSearch(params.get('search') || "");
        }
    }, [location.pathname, location.search]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() !== "") {
            navigate(`/recipes-list?search=${encodeURIComponent(search)}`);
            setTimeout(() => setSearch(""), 0);
        } else {
            navigate('/recipes-list');
            setTimeout(() => setSearch(""), 0);
        }
    };

    return (
        <header className=" bg-white shadow-md pb-4 fixed top-0 left-0 w-full z-100">
            <div className="text-teal-600 pt-5 px-10 lg:flex md:justify-between md:items-center md:px-10 relative">
                <div className="flex justify-between items-center md:justify-center">
                    <h1 className="text-4xl md:text-5xl lg:6xl font-bold italic flex items-center">
                        <NavLink to="/" className="flex items-center">
                            <img src={logo} alt="logo" className="w-20 h-20"/>
                            RecipeBook
                        </NavLink>
                    </h1>
                    <button className="md:hidden text-3xl" onClick={() => setIsOpen(!isOpen)}>
                        &#9776;
                    </button>
                </div>
                <nav
                    className={`flex flex-col md:flex-row justify-center items-center mt-5 lg:mt-0 ${isOpen ? '' : 'hidden'} md:flex`}>
                    <NavLink className="bg-teal-600 hover:bg-teal-400 text-white font-bold md:text-lg lg:text-xl px-5 py-1 border border-teal-600 rounded-xl"
                       to={"/newRecipes"}>Přidat recept</NavLink>
                    <NavLink className="text-black font-medium px-5 py-2 hover:text-teal-600 md:text-lg lg:text-xl xl:text-2xl"
                       to="/recipes-list">Recepty</NavLink>
                    <NavLink className="flex items-center justify-center text-black font-medium px-2 w-full md:w-auto hover:text-teal-600"
                             to={"/recipes-list/favorite"}>
                        <span className="flex items-center justify-center">
                        <img
                            src={isFavoritePage ? heartIcon : heartBlackIcon}
                            alt="favorite"
                            className={`w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 ${isFavoritePage ? "filter-red" : ""}`}
                        />
                            </span>
                    </NavLink>
                </nav>
            </div>
            <div className=" flex justify-center items-centerpx-5">
                <form className="flex items-center gap-4 px-4 md:w-auto mt-2" onSubmit={handleSearch}>
                    <input
                        type="text"
                        id="search" // přidáno id
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Vyhledat recept..."
                        className="border-2 border-teal-600 rounded-xl px-4 py-2 w-80 md:w-150 lg:w-170 xl:w-200 2xl:w-250"
                    />
                    <button type="submit">
                        <img src={searchIcon} alt="search" className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:h-10 xl:w-10 hover:scale-130 transition-transform duration-300 ease-in-ou"/>
                    </button>
                </form>
            </div>
        </header>
    )
}
