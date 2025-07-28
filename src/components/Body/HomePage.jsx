import {useEffect, useState, useRef} from "react";
import {Recipes} from "./Recipes.jsx";
import {supabase} from "../../supabase.js";
import {Articles} from "./Articles.jsx";
import {useLocation} from "react-router-dom";

import prava from "../../assets/prava.png";
import leva from "../../assets/leva.png";

import jidlo1 from "../../assets/jidlo1.jpg";
import jidlo2 from "../../assets/jidlo2.jpg";
import jidlo3 from "../../assets/jidlo3.jpg";
import jidlo4 from "../../assets/jidlo4.jpg";
import jidlo5 from "../../assets/jidlo5.jpg";
import jidlo6 from "../../assets/jidlo6.jpg";
import rating from "daisyui/components/rating/index.js";

const images = [jidlo1, jidlo2,jidlo3, jidlo4, jidlo5, jidlo6
];

export function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);
    const [recommendedPage, setRecommendedPage] = useState(1);
    const [recommendedPerPage, setRecommendedPerPage] = useState(10);
    const [recommendedTotalCount, setRecommendedTotalCount] = useState(0);
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('search')?.toLowerCase() || "";

    useEffect(() => {
        const handleResize = () => {
            let newPerPage;
            if (window.innerWidth < 560) newPerPage = 2;
            else if (window.innerWidth < 874) newPerPage = 4;
            else if (window.innerWidth < 1222) newPerPage = 6;
            else if (window.innerWidth < 1488) newPerPage = 8;
            else newPerPage = 10;
            setRecommendedPerPage(newPerPage);
            setRecommendedPage(1); // reset na první stránku při změně velikosti okna
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
       startAutoSlide();
       return () => {clearInterval(intervalRef.current);};
    })

    useEffect(() => {
        const fetchRecommendedRecipes = async () => {
            // Získat pouze nejnovějších 10 receptů s rating >= 4
            let query = supabase.from("recipes").select("*", { count: "exact" }).order("created_at", { ascending: false }).gte('rating', 4).limit(10);
            if (searchTerm) {
                query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
            }
            const { data, error, count } = await query;
            if (!error) {
                setRecipes(data);
                if (typeof count === 'number') setRecommendedTotalCount(Math.min(count, 10));
            }
        };
        fetchRecommendedRecipes();
    }, [recommendedPerPage, searchTerm]);

    // stránkování doporučených receptů
    const totalRecommendedPages = Math.ceil(recommendedTotalCount / recommendedPerPage);
    const paginatedRecommended = recipes.slice((recommendedPage - 1) * recommendedPerPage, recommendedPage * recommendedPerPage);

    useEffect(() => {
        // Pokud je aktuální stránka mimo rozsah po změně počtu na stránku, reset na první stránku
        if ((recommendedPage - 1) * recommendedPerPage >= recommendedTotalCount) {
            setRecommendedPage(1);
        }
    }, [recommendedPerPage, recommendedTotalCount]);


    const startAutoSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000); // Change image every 3 seconds
    }


    const prev = () => {
        setCurrent((current - 1 + images.length) % images.length);
        startAutoSlide();
    };

    const next = () => {
        setCurrent((current + 1) % images.length);
        startAutoSlide();
    }

    const handleRecommendedPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalRecommendedPages) {
            setRecommendedPage(newPage);
        }
    };

    return (
        <>
            <div className="bg-gradient-to-b from-teal-50 to-gray-100 ">
                <div className="pt-[150px] md:pt-[210px] lg:pt-[150px] px-4 md:px-10 lg:px-20 max-w-[1600px] mx-auto pb-20 bg-white">

                    <div className="flex flex-col items-center mt-10">
                        <div
                            className="relative max-w-[1500px] w-full h-[100px] md:h-[170px] lg:h-[200px] xl:h-[250px] 2xl:h-[300px] object-cover flex items-center justify-center rounded-xl overflow-hidden">
                            <button
                                onClick={prev}
                                className="absolute left-5 rounded-full p-2"
                            >
                                <img src={leva} alt="prev" className={"w-7 h-7 bg-white/50"}/>
                            </button>
                            <img
                                src={images[current]}
                                alt={`Banner ${current + 1}`}
                                className="w-full h-full object-cover rounded"
                            />
                            <button
                                onClick={next}
                                className="absolute right-0 rounded-full p-2"
                            >
                                <img src={prava} alt="next" className={"w-7 h-7 bg-white/50"}/>
                            </button>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-3 h-3 rounded-full ${idx === current ? "bg-teal-600" : "bg-gray-300"}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <h1 className=" text-2xl md:text-4xl lg:text-5xl font-bold text-teal-600 mt-8 mb-4 text-center">
                            Skvělé recepty pro každý den
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 text-center max-w-2xl">
                            Objevte inspiraci na chutná jídla, která si můžete připravit kdykoliv. Procházejte recepty,
                            vybírejte
                            oblíbené a užijte si vaření!
                        </p>

                    </div>


                    <div>
                        <h2 className="font-bold text-teal-800 flex items-center gap-2 text-2xl text-center md:text-start mt-10 mb-10 pl-5 border-b-2 border-teal-600">
                            Doporučujeme </h2>

                        {/* stránkování pro doporučené recepty */}
                        <Recipes recipes={paginatedRecommended} />
                        {totalRecommendedPages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                <button onClick={() => setRecommendedPage(recommendedPage - 1)} disabled={recommendedPage === 1} className="px-3 py-1 rounded bg-teal-600 text-white disabled:bg-gray-300">Předchozí</button>
                                <span className="px-2 py-1">Strana {recommendedPage} z {totalRecommendedPages}</span>
                                <button onClick={() => setRecommendedPage(recommendedPage + 1)} disabled={recommendedPage === totalRecommendedPages} className="px-3 py-1 rounded bg-teal-600 text-white disabled:bg-gray-300">Další</button>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-700 flex items-center gap-2 text-2xl text-center md:text-start mt-20 border-b-2 pl-5 border-zinc-600">
                            Rady a typy pro snadné vaření
                        </h2>

                        <Articles/>
                    </div>
                </div>
            </div>

            </>
            );
            }