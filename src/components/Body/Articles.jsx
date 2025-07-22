import React from "react";
import {useEffect, useState} from "react";
import {supabase} from "../../supabase.js";
import Grid from '@mui/joy/Grid';
import {ArticleCard} from "./ArticleCard.jsx";


export function Articles(){
    const [articles, setArticles] = useState(null);


    useEffect(() => {
        getArticles()
    }, []);

    const getArticles = async () => {
        const {data, error} = await supabase
            .from('articles')
            .select();

        if (error) {
            console.error("Error fetching articles:", error);
            return;
        }

        setArticles(data);
    }

    return (
        <>
            {articles === null
                ? <p>Loading...</p>
                : <Grid container spacing={5} sx={{marginTop: '20px'}}>
                    {articles.map((article) => (
                        <Grid xs={12} sm={12} md={6} lg={6} xl={4} key={article.id}>
                            <ArticleCard article={article} />
                        </Grid>
                    ))}
                </Grid>
            }

        </>
    )
}