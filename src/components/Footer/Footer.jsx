import {NavLink} from "react-router-dom";
import logo from "../../assets/logo.jpg";

export function Footer() {
    return (
        <footer className="bg-teal-900 text-white py-4 mt-0">
            <div className="container mx-auto text-center">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold italic flex items-center justify-center text-white">
                    RecipeBook</h1>
                <p className="text-sm mt-2">Váš průvodce světem receptů</p>


                    <p className="text-sm">Kamila Novotná © {new Date().getFullYear()} Závěrečný projekt.</p>

            </div>
        </footer>
);
}