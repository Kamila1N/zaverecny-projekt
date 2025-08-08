import {useEffect, useState, useRef} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {supabase} from "../../supabase.js";
import Rating from "@mui/material/Rating";
import * as React from "react";
import Modal from "@mui/material/Modal";

export function DetailRecipe() {
    const { id } = useParams();
    const [recept, setRecept] = useState(null);
    const [checked, setChecked] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editImageFile, setEditImageFile] = useState(null);
    const editFileInputRef = useRef();

    // Načtení receptu podle ID z URL
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

    if (loading) return <div className="pt-40 text-center">Načítán��…</div>;
    if (error) return <div className="pt-40 text-center text-red-600">{error}</div>;
    if (!recept) return null;

    // Zpracování ingrediencí do pole textů
    let ingredients = [];
    if (Array.isArray(recept.ingredients)) {
        ingredients = recept.ingredients.map(
            ing => `${ing.amount ? `${ing.amount} ` : ''}${ing.name}`
        );
    }

    // Přepínání zaškrtnutí ingredience
    const handleCheck = idx => {
        setChecked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    };

    // Smazání receptu
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

    // Funkce pro otevření editace
    const handleEdit = () => {
        setEditData({
            ...recept,
            ingredients: Array.isArray(recept.ingredients) ? recept.ingredients : []
        });
        setEditMode(true);
        setModalOpen(true);
    };

    // Funkce pro změnu hodnot ve formuláři
    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Funkce pro změnu ingrediencí
    const handleIngredientChange = (idx, field, value) => {
        setEditData(prev => ({
            ...prev,
            ingredients: prev.ingredients.map((ing, i) =>
                i === idx ? { ...ing, [field]: value } : ing
            )
        }));
    };

    // Přidání nové ingredience
    const handleAddIngredient = () => {
        setEditData(prev => ({
            ...prev,
            ingredients: [...(prev.ingredients || []), { name: '', amount: '' }]
        }));
    };

    // Odebrání ingredience
    const handleRemoveIngredient = (idx) => {
        setEditData(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== idx)
        }));
    };

    // Funkce pro změnu souboru při editaci
    const handleEditFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEditImageFile(e.target.files[0]);
            setEditData(prev => ({ ...prev, image: "" })); // smaž url pokud vybírám nový obrázek
        }
    };

    // Uložení změn v editaci receptu
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!window.confirm('Opravdu chcete uložit změny v receptu?')) return;
        setLoading(true);
        let imageUrl = editData.image;
        if (editImageFile) {
            const fileExt = editImageFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage.from('recipeimage').upload(fileName, editImageFile, { cacheControl: '3600', upsert: false });
            if (uploadError) {
                setError('Chyba při nahrávání obrázku.');
                setLoading(false);
                return;
            }
            const { data: publicUrlData } = supabase.storage.from('recipeimage').getPublicUrl(fileName);
            imageUrl = publicUrlData.publicUrl;
        }
        const { error } = await supabase.from('recipes').update({ ...editData, image: imageUrl }).eq('id', id);
        setLoading(false);
        if (!error) {
            setRecept({ ...editData, image: imageUrl });
            setEditMode(false);
            setModalOpen(false);
            setEditImageFile(null);
        } else {
            setError('Chyba při ukládání změn.');
        }
    };

    // Zavření modálního okna
    const handleCloseModal = () => {
        setEditMode(false);
        setModalOpen(false);
    };

    // Návrat zpět na předchozí stránku nebo na zadanou adresu
    const handleBack = () => {
        const backTo = new URLSearchParams(location.search).get('backTo');
        if (backTo) {
            navigate(backTo);
        } else {
            navigate(-1);
        }
    };
  //nové hodnocení receptu a oblíbenosti, už by mělo fungovat bez přenáčítání stránky a měli by být ošetřeny i chyby
    const handleRatingChange = async (_, newValue) => {
        if (newValue !== null) {
            const oldRating = recept.rating;
            setRecept(prev => ({ ...prev, rating: newValue }));
            const { error } = await supabase.from('recipes').update({ rating: newValue }).eq('id', id);
            if (error) {
                setRecept(prev => ({ ...prev, rating: oldRating }));
                setError("Chyba při ukládání hodnocení.");
            }
        }
    };

    // Přepnutí oblíbenosti receptu
    const handleFavoriteToggle = async (e) => {
        e?.preventDefault?.();
        const oldFavorite = recept.favorite;
        setRecept(prev => ({ ...prev, favorite: !prev.favorite }));
        const { error } = await supabase.from('recipes').update({ favorite: !recept.favorite }).eq('id', id);
        if (error) {
            setRecept(prev => ({ ...prev, favorite: oldFavorite }));
            setError("Chyba při ukládání oblíbenosti.");
        }
    };

    return (
        <div className="bg-white ">
            <div
                className="pt-38 max-w-4xl md:pt-[230px] lg:pt-[180px] md:pt-40 xl:pt-40 bg-gradient-to-b from-gray-200 to-teal-50 mx-auto px-4 md:px-8 pb-10 min-h-screen rounded-xl shadow-lg mt-10">
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
                    <Rating
                        name="rating-detail"
                        value={Number(recept.rating) || 0}
                        precision={0.5}
                        max={5}
                        onChange={handleRatingChange}
                    />

                </div>

                <img src={recept.image && recept.image !== "" ? recept.image : "/no-image-icon.jpg"} alt={recept.title}
                     className="w-full max-h-80 object-cover rounded-lg mb-3 mx-auto shadow"/>
                <div className="flex gap-2 mb-4 justify-center">
                    <button onClick={handleEdit}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded font-semibold text-md">
                        Editovat
                    </button>
                    <button onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-semibold text-md">Smazat
                    </button>
                    {/* Velké srdíčko indikující oblíbenost receptu */}
                </div>
                <div className="flex justify-end mr-10">
                    <button
                        type="button"
                        onClick={handleFavoriteToggle}
                        className="focus:outline-none"
                        aria-label={recept.favorite ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
                    >
                        {recept.favorite ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-red-500"
                                 fill="currentColor"
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
                    </button>
                </div>

                {recept.time && (
                    <div className="flex justify-center mt-2 mb-2">
                        <span
                            className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Čas přípravy: {recept.time}
                        </span>
                    </div>
                )}
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
                        <h2 className="text-2xl font-bold mt-10 mb-2">Postup:</h2>
                        <div className="p-2 text-gray-700 whitespace-pre-line text-md bg-white rounded shadow-sm">
                            {recept.description}
                        </div>
                    </div>
                </div>
                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                        <div
                            className="bg-white p-4 md:p-8 rounded shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative">
                            <button onClick={handleCloseModal}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
                            {editData && (
                                <form onSubmit={handleSaveEdit} className="space-y-4">
                                    <h2 className="text-2xl font-bold mb-4">Editace receptu</h2>
                                    <div>
                                        <label className="block font-semibold">Název:</label>
                                        <input name="title" value={editData.title || ''} onChange={handleEditChange}
                                               className="w-full border rounded p-2" required/>
                                    </div>

                                    <div>
                                        <label className="block font-semibold">Popis (description):</label>
                                        <textarea name="description" value={editData.description || ''}
                                                  onChange={handleEditChange} className="w-full border rounded p-2"
                                                  rows={4}/>
                                    </div>
                                    <div>
                                        <label className="block font-semibold">Ingredience:</label>
                                        {editData.ingredients && editData.ingredients.map((ing, idx) => (
                                            <div key={idx} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Množství"
                                                    value={ing.amount || ''}
                                                    onChange={e => handleIngredientChange(idx, 'amount', e.target.value)}
                                                    className="border rounded p-1 w-1/4"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Název"
                                                    value={ing.name || ''}
                                                    onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                                                    className="border rounded p-1 w-2/4"
                                                />
                                                <button type="button" onClick={() => handleRemoveIngredient(idx)}
                                                        className="text-red-600">X
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={handleAddIngredient}
                                                className="text-teal-600 underline">Přidat ingredienci
                                        </button>
                                    </div>
                                    <div>
                                        <label className="block font-semibold">Hodnocení:</label>
                                        <Rating
                                            name="rating-edit"
                                            value={Number(editData.rating) || 0}
                                            precision={0.5}
                                            max={5}
                                            onChange={(_, newValue) => handleEditChange({
                                                target: {
                                                    name: 'rating',
                                                    value: newValue
                                                }
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">Čas (libovolný text):</label>
                                        <input name="time" type="text" value={editData.time || ''}
                                               onChange={handleEditChange} className="w-full border rounded p-2"/>
                                    </div>
                                    <div>
                                        <label className="block font-semibold">Oblíbený:</label>
                                        <input name="favorite" type="checkbox" checked={!!editData.favorite}
                                               onChange={handleEditChange} className="ml-2"/>
                                    </div>
                                    <div>
                                        <label className="block font-semibold">Obrázek:</label>
                                        <div>
                                            <label htmlFor="edit-image-upload" className="text-teal-600 underline cursor-pointer">
                                                Vybrat obrázek
                                            </label>
                                            <input
                                                id="edit-image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleEditFileChange}
                                                ref={editFileInputRef}
                                                className="hidden"
                                            />
                                        </div>
                                        {editImageFile && (
                                            <div className="relative inline-block mt-2">
                                                <img src={URL.createObjectURL(editImageFile)} alt="náhled" className="max-h-32 rounded shadow" />
                                                <button
                                                    type="button"
                                                    onClick={() => { setEditImageFile(null); setEditData(prev => ({ ...prev, image: "" })); }}
                                                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full text-red-600 font-bold w-6 h-6 flex items-center justify-center shadow hover:bg-red-100"
                                                    title="Odebrat obrázek"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                        {/* Pokud není obrázek, zobrazuj defaultní obrázek */}
                                        {!editImageFile && (!editData.image || editData.image === "") && (
                                            <div className="relative inline-block mt-2">
                                                <img src="/no-image-icon.jpg" alt="chybí obrázek" className="max-h-32 rounded shadow opacity-60" />
                                            </div>
                                        )}
                                        {/* Pokud je obrázek, zobrazuj jej */}
                                        {!editImageFile && editData.image && editData.image !== "" && (
                                            <div className="relative inline-block mt-2">
                                                <img src={editData.image} alt="náhled" className="max-h-32 rounded shadow" />
                                                <button
                                                    type="button"
                                                    onClick={() => { setEditImageFile(null); setEditData(prev => ({ ...prev, image: "" })); }}
                                                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full text-red-600 font-bold w-6 h-6 flex items-center justify-center shadow hover:bg-red-100"
                                                    title="Odebrat obrázek"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="submit"
                                                className="px-4 py-2 bg-teal-600 text-white rounded">Uložit změny
                                        </button>
                                        <button type="button" onClick={handleCloseModal}
                                                className="px-4 py-2 bg-gray-400 text-white rounded">Zrušit
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
