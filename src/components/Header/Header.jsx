import {useState} from "react";
import './Header.scss'
import logo from '../../assets/logo.jpg'
import searchIcon from '../../assets/loupe.png'
import heartIcon from '../../assets/heart.png'
import heartBlackIcon from '../../assets/heart-black.png'
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router-dom";

export function Header() {

    const location = useLocation();
    const isFavoritePage = location.pathname.includes('/recipes-list/favorite');
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    return (

        <header className="bg-white shadow-md pb-4 fixed top-0 left-0 w-full z-100">

            <div className="text-teal-600 pt-5 px-5 lg:flex md:justify-between md:items-center md:px-10 relative">

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

                    <NavLink className="bg-teal-600 hover:bg-teal-400 text-white font-bold px-5 py-1 border border-teal-600 rounded-xl"
                       to={"/newRecipes"}>Přidat recept</NavLink>
                    <NavLink className="text-black font-medium px-5 py-2 hover:text-teal-600"
                       to="/recipes-list">Recepty</NavLink>
                    <NavLink className="text-black font-medium px-5 py-2 flex items-center gap-2 hover:text-teal-600"
                             to={"/recipes-list/favorite"}>
                        {/*<span className="hidden md:inline">Oblíbené</span>*/}
                        <img
                            src={isFavoritePage ? heartIcon : heartBlackIcon}
                            alt="favorite"
                            className={`w-7 h-7 ${isFavoritePage ? "filter-red" : ""}`}
                        />
                    </NavLink>

                </nav>
            </div>

            <div className=" flex justify-center items-centerpx-5">
                <div className="flex items-center gap-4 px-4 md:w-auto mt-2">

                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Vyhledat recept..."
                        className="border border-teal-600 rounded-xl px-4 py-2 w-80 md:w-150"
                    />
                    <button
                    onClick={() => setIsOpen(!isOpen)}>
                        <img src={searchIcon} alt="search" className="w-7 h-7 hover:scale-130 transition-transform duration-300 ease-in-ou"/>
                    </button>
                </div>
            </div>


        </header>


    )
}
