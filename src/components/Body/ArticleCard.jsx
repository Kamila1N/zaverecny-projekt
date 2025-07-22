import React, { useState} from "react";

function getShortText(text, maxLength) {
    if (text.length <= maxLength) return text;
    const cut = text.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");
    return cut.slice(0, lastSpace) + "…";
}

export function ArticleCard({ article }) {
    const [showMore, setShowMore] = useState(false);
    const maxLength = 100;
    const isLong = article.content.length > maxLength;
    const displayContent = showMore
        ? article.content
        : getShortText(article.content, maxLength);


    return (

        <div className="mb-4 p-4 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-md">

            <h2 className="font-semibold mb-3 text-base md:text-lg lg:text-xl xl: text-2xl">{article.title}</h2>

            <div className="flex md:flex-row items-start md:items-center gap-4">
                <p className=" "></p>
                <img className="xl:60 lg:w-50 md:w-40 sm:w-35 w-25 h-auto object-center" src={article.image}/>
                <p className=" mb-2 text-sm md:text-base xl:text-lg  text-gray-700 italic">
                    {article.summary}
                    {displayContent}
                    {isLong && !showMore && (
                        <button className="text-teal-600 hover:underline ml-2" onClick={() => setShowMore(true)}>
                            Zobrazit více
                        </button>
                    )}
                    {isLong && showMore && (
                        <button className="text-teal-600 hover:underline ml-2" onClick={() => setShowMore(false)}>
                            Zobrazit méně
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
}
