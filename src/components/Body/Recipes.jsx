import * as React from 'react';
import Box from '@mui/joy/Box';
import {Recipe} from './Recipe';


export function Recipes({recipes, onFavoriteChange}) {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 2,
            minHeight: 250,
            justifyItems: 'center'
        }}>
            {recipes.map(recept => (
                <Recipe key={recept.id} recept={recept} onFavoriteChange={onFavoriteChange} />
            ))}

        </Box>
    );
}