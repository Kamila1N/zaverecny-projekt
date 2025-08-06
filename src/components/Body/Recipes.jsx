import * as React from 'react';
import Box from '@mui/joy/Box';
import {Recipe} from './Recipe';
import {useNavigate} from 'react-router-dom';


export function Recipes({recipes, onFavoriteChange}) {
    const navigate = useNavigate();
    const location = window.location;
    // Funkce pro zastavení propagace kliknutí z dětí (hvězdičky, srdíčko)
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 2,
            minHeight: 250,
            justifyItems: 'center'
        }}>
            {recipes.map(recept => (
                <div key={recept.id} style={{width: '100%'}}
                     onClick={() => navigate(`/recept/${recept.id}?backTo=${encodeURIComponent(location.pathname + location.search)}`)}>
                    <Recipe
                        recept={recept}
                        onFavoriteChange={onFavoriteChange}
                        highlight={recept.highlight}
                        searchTerm={recept.searchTerm}
                        stopPropagation={stopPropagation}
                    />
                </div>
            ))}

        </Box>
    );
}