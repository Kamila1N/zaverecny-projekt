import {useState} from "react";
import './Header.scss'
import logo from '../../assets/logo.jpg'
import searchIcon from '../../assets/loupe.png'
import heartIcon from '../../assets/heart.png'

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (

        <header className="text-teal-600 py-10 px-10 lg:flex md:justify-between md:items-center bg-white shadow-md">
            <div className="flex justify-between items-center md:justify-center">
                <h1 className="text-4xl font-bold italic flex items-center">
                    <img src={logo} alt="logo" className="w-20 h-20"/>
                    RecipeBook
                </h1>
                {/* Hamburger ikona */}
                <button className="md:hidden text-3xl" onClick={() => setIsOpen(!isOpen)}>
                    &#9776;
                </button>
            </div>
            {/* Navigace */}
            <nav
                className={`flex flex-col md:flex-row justify-center items-center mt-5 lg:mt-0 ${isOpen ? '' : 'hidden'} md:flex`}>
                <a className="bg-teal-600 hover:bg-teal-400 text-white font-bold px-10 py-2 border border-teal-600 rounded-xl"
                   href={"/newRecipes"}>Přidat recept</a>
                <a className="text-black font-medium px-8 py-2 hover:text-teal-600"
                   href={"/"}>Recepty</a>
                <a className="text-black font-medium px-8 py-2"
                   href={"/favorite"}><img src={heartIcon} alt="favorite" className="w-7 h-7 hover:scale-130 transition-transform duration-300 ease-in-out"/></a>
                <a className="text-black font-medium px-8 py-2"
                   href={"/search"}>
                    <img src={searchIcon} alt="search" className="w-7 h-7 hover:scale-130 transition-transform duration-300 ease-in-out"/>
                </a>
            </nav>
        </header>
    )
}