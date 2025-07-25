import * as React from 'react';
import Box from '@mui/joy/Box';
import {Recipe} from './Recipe';

export function Recipes({recipes, filter, onFavoriteChange}) {

    const filteredRecipes = filter?.rating
        ? recipes.filter(r => r.rating >= filter.rating)
        : recipes;


    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 2,
            minHeight: 250,
            justifyItems: 'center'
                        }}>
            {filteredRecipes.map(recept => (
                <Recipe key={recept.id} recept={recept} onFavoriteChange={onFavoriteChange}  />
            ))}

        </Box>
    );
}