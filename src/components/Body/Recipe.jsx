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


export function Recipe({ recept, onFavoriteChange }) {

    const [favorite, setFavorite] = useState(recept.favorite);

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
                <img src={recept.image} loading="lazy" alt={recept.title} />
            </AspectRatio>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography level="title-lg">
                    <Link href="#" overlay underline="none">
                        {recept.title}
                    </Link>
                </Typography>
                <IconButton size="sm" variant="plain" color="neutral" onClick={handleFavoriteClick}>
                    {favorite ? ( <FavoriteRoundedIcon sx={{ color: 'red' }} />):(<FavoriteBorderRoundedIcon />) }

                </IconButton>
            </Box>
            <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={recept.rating} precision={0.5} readOnly />
            </Stack>

            <Typography level="body-sm">{recept.time}</Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}></Box>
        </Card>
    );
}