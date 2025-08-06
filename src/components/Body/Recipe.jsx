import * as React from 'react';
import { useState } from 'react';
import { supabase } from '../../supabase.js';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AspectRatio from '@mui/joy/AspectRatio';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';


export function Recipe({ recept, onFavoriteChange, stopPropagation }) {

    //nastavení oblíbeného receptu
    const [favorite, setFavorite] = useState(recept.favorite);
    // stav pro hodnocení
    const [rating, setRating] = useState(recept.rating);

    const handleFavoriteClick = async () => {
        const newFavoriteStatus = !favorite;
        setFavorite(newFavoriteStatus);
        await supabase.from("recipes")
            .update({ favorite: newFavoriteStatus })
            .eq('id', recept.id);
        if (onFavoriteChange){
            onFavoriteChange();
        }
    }

    // změna hodnocení receptu
    const handleRatingChange = async (_, newValue) => {
        if (newValue !== null) {
            const oldRating = rating;
            setRating(newValue);
            const { error } = await supabase.from('recipes').update({ rating: newValue }).eq('id', recept.id);
            if (error) {
                setRating(oldRating);
                // případně zobrazit chybu
            }
            if (onFavoriteChange) {
                onFavoriteChange();
            }
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                maxWidth: 300,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                transition: 'transform 0.3s, border 0.3s',
                '&:hover': {
                    borderColor: 'primary.outlinedHoverBorder',
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <AspectRatio variant="soft" sx={{ width: '100%' }}>
                <img src={recept.image} loading="lazy" alt={recept.title} style={{cursor: 'pointer'}}/>
            </AspectRatio>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <a href={`/recept/${recept.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }} onClick={e => stopPropagation(e)}>
                    <Typography level="title-lg" sx={{ cursor: 'pointer' }}>
                        {recept.title}
                    </Typography>
                </a>
                <IconButton size="sm" variant="plain" color="neutral" onClick={e => { stopPropagation(e); handleFavoriteClick(); }}>
                    {favorite ? ( <FavoriteRoundedIcon sx={{ color: 'red' }} />):(<FavoriteBorderRoundedIcon />) }

                </IconButton>
            </Box>
            <Stack spacing={1}>
                <Rating
                    name={`rating-${recept.id}`}
                    value={Number(rating) || 0}
                    precision={0.5}
                    max={5}
                    onClick={stopPropagation}
                    onChange={(e, newValue) => {
                        stopPropagation(e);
                        handleRatingChange(e, newValue);
                    }}
                />
            </Stack>

            <Typography level="body-sm">{recept.time}</Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}></Box>
        </Card>
    );
}