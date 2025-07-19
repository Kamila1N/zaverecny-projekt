import {useState} from "react";
import './Header.scss'
import logo from '../../assets/logo.jpg'
import searchIcon from '../../assets/loupe.png'
import heartIcon from '../../assets/heart.png'
import closeIcon from '../../assets/close.png'
import heartBlackIcon from '../../assets/heart-black.png'

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header
            className="text-teal-600 py-10 px-10 lg:flex md:justify-between md:items-center bg-white shadow-md relative">
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
                <button
                    className="text-black font-medium px-8 py-2 flex items-center"
                    onClick={() => setShowSearch(true)}
                >
                    <img src={searchIcon} alt="search"
                         className="w-7 h-7 hover:scale-130 transition-transform duration-300 ease-in-out"/>
                </button>
                <a className="text-black font-medium px-8 py-2"
                   href={"/favorite"}><img src={heartBlackIcon} alt="favorite"
                                           className="w-7 h-7 hover:scale-130 transition-transform duration-300 ease-in-out"/></a>


            </nav>

            {showSearch && (
                <div
                    className="fixed inset-0 md:bg-white/70 bg-white/90 flex justify-center items-center"
                    onClick={() => setShowSearch(false)}
                >
                    <div
                        className="bg-white rounded-xl p-8 shadow-lg flex gap-5 md:w-max flex items-center justify-center relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="absolute -top-1 -right-3"
                        onClick={() => setShowSearch(false)}>
                            <img src={closeIcon} alt="close"
                            className="w-7 h-7 hover:scale-130 transition-transform duration-300 ease-in-out "/>
                        </button>
                        <input
                            type="text"
                            placeholder="Vyhledat recept..."
                            className="border border-teal-600 rounded-xl px-4 py-2 w-50 md:w-80 md:mt-5 md:mb-5"
                            autoFocus
                        />
                        <button
                            className="px-6 py-2 bg-teal-600 text-white rounded-xl"
                        >Hledat
                        </button>

                    </div>
                </div>
            )}
        </header>
        //
        // <header className="text-teal-600 py-10 px-10 lg:flex md:justify-between md:items-center bg-white shadow-md">
        //     <div className="flex justify-between items-center md:justify-center">
        //         <h1 className="text-4xl font-bold italic flex items-center">
        //             <img src={logo} alt="logo" className="w-20 h-20"/>
        //             RecipeBook
        //         </h1>
        //         {/* Hamburger ikona */}
        //         <button className="md:hidden text-3xl" onClick={() => setIsOpen(!isOpen)}>
        //             &#9776;
        //         </button>
        //     </div>
        //     {/* Navigace */}
        //     <nav
        //         className={`flex flex-col md:flex-row justify-center items-center mt-5 lg:mt-0 ${isOpen ? '' : 'hidden'} md:flex`}>
        //         <a className="bg-teal-600 hover:bg-teal-400 text-white font-bold px-10 py-2 border border-teal-600 rounded-xl"
        //            href={"/newRecipes"}>Přidat recept</a>
        //         <a className="text-black font-medium px-8 py-2 hover:text-teal-600"
        //            href={"/"}>Recepty</a>
        //         <a className="text-black font-medium px-8 py-2"
        //            href={"/favorite"}><img src={heartIcon} alt="favorite" className="w-7 h-7 hover:scale-130 transition-transform duration-300 ease-in-out"/></a>
        //         <a className="text-black font-medium px-8 py-2"
        //            href={"/search"}>
        //             <img src={searchIcon} alt="search" className="w-7 h-7 hover:scale-130 transition-transform duration-300 ease-in-out"/>
        //         </a>
        //     </nav>
        // </header>
    )
}