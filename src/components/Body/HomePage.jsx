import {useEffect, useState,useRef} from "react";
import {Recipes} from "./Recipes.jsx";

import {Articles} from "./Articles.jsx";

import prava from "../../assets/prava.png";
import leva from "../../assets/leva.png";

import jidlo1 from "../../assets/jidlo1.jpg";
import jidlo2 from "../../assets/jidlo2.jpg";
import jidlo3 from "../../assets/jidlo3.jpg";
import jidlo4 from "../../assets/jidlo4.jpg";
import jidlo5 from "../../assets/jidlo5.jpg";
import jidlo6 from "../../assets/jidlo6.jpg";

const images = [jidlo1, jidlo2,jidlo3, jidlo4, jidlo5, jidlo6
];

export function HomePage() {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
       startAutoSlide();
       return () => {clearInterval(intervalRef.current);};
    })

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

    return (
        <div className="pt-[150px] md:pt-[210px] lg:pt-[150px] px-4 md:px-10 lg:px-20 max-w-[1700px] mx-auto">

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
                <h2 className="text-base text-center md:text-lg md:text-start lg:text-2xl mt-5 mb-5 border-b-2 border-gray-500">Doporučujeme </h2>

                {/*//zde potřebuju zobrazit recepty které mají hodnocení vyšší jak 4*/}

                <Recipes/>
            </div>

            <div>
                <h2 className="text-base text-center md:text-lg md:text-start lg:text-2xl mt-10 mb-5 border-b-2 border-gray-500">
                    Rady a typy pro snadné vaření
                </h2>
                <Articles />
            </div>

        </div>
    );
}