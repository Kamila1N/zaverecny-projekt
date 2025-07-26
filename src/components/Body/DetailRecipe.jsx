import {useEffect, useState} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {supabase} from "../../supabase.js";
import Rating from "@mui/material/Rating";
import * as React from "react";

export function DetailRecipe() {
    const { id } = useParams();
    const [recept, setRecept] = useState(null);
    const [checked, setChecked] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError("");
            const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single();
            if (!error) setRecept(data);
            else setError("Recept nenalezen nebo došlo k chybě.");
            setLoading(false);
        };
        fetchRecipe();
    }, [id]);

    if (loading) return <div className="pt-40 text-center">Načítání…</div>;
    if (error) return <div className="pt-40 text-center text-red-600">{error}</div>;
    if (!recept) return null;

    let ingredients = [];
    if (Array.isArray(recept.ingredients)) {
        ingredients = recept.ingredients.map(
            ing => `${ing.amount ? `${ing.amount} ` : ''}${ing.name}`
        );
    }

    const handleCheck = idx => {
        setChecked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    };

    const handleDelete = async () => {
        if (!window.confirm("Opravdu chcete tento recept smazat?")) return;
        setLoading(true);
        const { error } = await supabase.from('recipes').delete().eq('id', id);
        setLoading(false);
        if (!error) {
            navigate('/recipes-list');
        } else {
            setError("Chyba při mazání receptu.");
        }
    };

    const handleEdit = () => {
        navigate(`/edit-recept/${id}`);
    };

    const handleBack = () => {
        // Pokud je v query parametru návratová adresa, použij ji, jinak použij history.back
        const backTo = new URLSearchParams(location.search).get('backTo');
        if (backTo) {
            navigate(backTo);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="bg-white ">
            <div
                className="pt-32 max-w-4xl md:pt-40 lg:pt-32 bg-gradient-to-b from-gray-200 to-teal-50 mx-auto px-4 md:px-8 pb-10 min-h-screen rounded-xl shadow-lg mt-10">
                <button
                    onClick={handleBack}
                    className="mb-6 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white mt-4 px-4 py-1.5 rounded-lg font-semibold shadow transition text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                    Zpět
                </button>
                <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">{recept.title} </h1>
                <div className="flex justify-center items-center mb-2 gap-2">
                    <Rating name="half-rating-read" defaultValue={recept.rating} precision={0.5} readOnly
                            size="medium"/>

                </div>

                <img src={recept.image} alt={recept.title}
                     className="w-full max-h-60 object-cover rounded-lg mb-3 mx-auto shadow"/>
                <div className="flex gap-2 mb-4 justify-center">
                    <button onClick={handleEdit}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded font-semibold text-md">Editovat
                    </button>
                    <button onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-semibold text-md">Smazat
                    </button>
                    {/* Velké srdíčko indikující oblíbenost receptu */}
                </div>
                <div className="flex justify-end mr-10">
                    {recept.favorite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-red-500" fill="currentColor"
                             viewBox="0 0 24 24">
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-gray-300" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>

                        <h2 className="text-lg font-bold mb-2">Ingredience:</h2>
                        <ul className="mb-4">
                            {ingredients.map((name, idx) => (
                                <li key={idx} className="flex items-center gap-2 mb-1 text-md">
                                    <input type="checkbox" checked={checked.includes(idx)}
                                           onChange={() => handleCheck(idx)}/>
                                    <span
                                        className={checked.includes(idx) ? "line-through text-gray-400" : ""}>{name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mt-10 mb-2">Postup:</h2>
                        <div className="p-2 text-gray-700 whitespace-pre-line text-sm bg-white rounded shadow-sm">
                            {recept.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
