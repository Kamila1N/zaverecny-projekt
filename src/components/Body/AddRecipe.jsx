import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase.js";
import Rating from "@mui/material/Rating";

export function AddRecipe() {
    const [form, setForm] = useState({
        title: "",
        image: "",
        description: "",
        ingredients: [{ name: "", amount: "" }],
        rating: 0,
        time: "",
        favorite: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleIngredientChange = (idx, field, value) => {
        setForm((prev) => ({
            ...prev,
            ingredients: prev.ingredients.map((ing, i) =>
                i === idx ? { ...ing, [field]: value } : ing
            )
        }));
    };

    const handleAddIngredient = () => {
        setForm((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: "", amount: "" }]
        }));
    };

    const handleRemoveIngredient = (idx) => {
        setForm((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== idx)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const { error } = await supabase.from("recipes").insert([form]);
        setLoading(false);
        if (!error) {
            navigate("/recipes-list");
        } else {
            setError("Chyba při ukládání receptu.");
        }
    };

    return (
        <div className="bg-white ">
            <div className="pt-38 max-w-4xl md:pt-[230px] lg:pt-[180px] md:pt-40 xl:pt-40 bg-gradient-to-b from-gray-200 to-teal-50 mx-auto px-4 md:px-8 pb-10 min-h-screen rounded-xl shadow-lg mt-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">Přidat nový recept</h1>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                    <div>
                        <label className="block font-semibold">Název:</label>
                        <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" required />
                    </div>
                    <div>
                        <label className="block font-semibold">Obrázek (URL):</label>
                        <input name="image" type="text" value={form.image} onChange={handleChange} className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block font-semibold">Popis (description):</label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" rows={4} />
                    </div>
                    <div>
                        <label className="block font-semibold">Ingredience:</label>
                        {form.ingredients.map((ing, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Množství"
                                    value={ing.amount}
                                    onChange={e => handleIngredientChange(idx, 'amount', e.target.value)}
                                    className="border rounded p-1 w-1/4"
                                />
                                <input
                                    type="text"
                                    placeholder="Název"
                                    value={ing.name}
                                    onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                                    className="border rounded p-1 w-2/4"
                                />
                                <button type="button" onClick={() => handleRemoveIngredient(idx)} className="text-red-600">X</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddIngredient} className="text-teal-600 underline">Přidat ingredienci</button>
                    </div>
                    <div>
                        <label className="block font-semibold">Hodnocení:</label>
                        <Rating
                            name="rating"
                            value={Number(form.rating) || 0}
                            precision={0.5}
                            max={5}
                            onChange={(_, newValue) => setForm(prev => ({ ...prev, rating: newValue }))}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Čas (libovolný text):</label>
                        <input name="time" type="text" value={form.time} onChange={handleChange} className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block font-semibold">Oblíbený:</label>
                        <input name="favorite" type="checkbox" checked={!!form.favorite} onChange={handleChange} className="ml-2" />
                    </div>
                    {error && <div className="text-red-600">{error}</div>}
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded" disabled={loading}>Přidat recept</button>
                        <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-400 text-white rounded">Zrušit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

