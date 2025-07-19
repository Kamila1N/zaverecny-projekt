import {useState} from "react";
import './Header.scss'
import logo from '../../assets/logo.jpg'
import searchIcon from '../../assets/loupe.png'
import heartIcon from '../../assets/heart.png'
import heartBlackIcon from '../../assets/heart-black.png'

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    return (

        <header className="bg-white shadow-md pb-10 fixed top-0 left-0 w-full z-100">

            <div className="text-teal-600 pt-5 pb-5 px-10 lg:flex md:justify-between md:items-center  relative">

                <div className="flex justify-between items-center md:justify-center">

                    <h1 className="text-4xl font-bold italic flex items-center">
                        <a href="/" className="flex items-center">
                            <img src={logo} alt="logo" className="w-20 h-20"/>
                            RecipeBook
                        </a>
                    </h1>


                    <button className="md:hidden text-3xl" onClick={() => setIsOpen(!isOpen)}>
                        &#9776;
                    </button>
                </div>
                <nav
                    className={`flex flex-col md:flex-row justify-center items-center mt-5 lg:mt-0 ${isOpen ? '' : 'hidden'} md:flex`}>

                    <a className="bg-teal-600 hover:bg-teal-400 text-white font-bold px-10 py-2 border border-teal-600 rounded-xl"
                       href={"/newRecipes"}>Přidat recept</a>
                    <a className="text-black font-medium px-8 py-2 hover:text-teal-600"
                       href={"/"}>Recepty</a>
                    <a className="text-black font-medium px-5 py-2 flex items-center gap-2 hover:text-teal-600"
                       href={"/favorite"}>
                        <span className="hidden md:inline">Oblíbené</span>
                        <img src={heartBlackIcon} alt="favorite" className="w-7 h-7"/></a>

                </nav>
            </div>

            <div className="flex justify-center items-center gap-4 px-10">
                <div className="flex items-center gap-4 px-4 md:w-auto">

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
