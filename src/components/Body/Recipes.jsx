import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import {Recipe} from './Recipe'; // Import Recipe component

//zatím si tady dám data ručně, ale časem to budu tahat z API

const recipesData = [
    {
        title: "Palačinky s javorovým sirupem",
        time: "20 min",
        rating: 4.5,
        img: "https://www.womanonly.cz/wp-content/uploads/fly-images/41618/palacinky-1048x0-c.jpg"
    },
    {
        title: "Pravé italské tiramisu z vaječných žloutků",
        time: "30 min",
        rating: 4,
        img: "https://www.womanonly.cz/wp-content/uploads/fly-images/18350/tiramisu2-1048x0-c.jpg"
    },

    {
        title: "Svíčková na smetaně s domácími knedlíky",
        time: "120 min",
        rating: 3.5,
        img: "https://www.nejrecept.cz/upload/39134757_028ef8ceafa455_full.jpg"
    },
    {
        title: "Tvarohové knedlíky s jahodami",
        time: "45 min",
        rating: 4,
        img: "https://static.toprecepty.cz/fotky/recepty/0052/rychle-tvarohove-knedliky-127352-1920-1080-nwo.webp"
    },
    {
        title: "Kuřecí prsa ve sladkokyselé omačce",
        time: "35 min",
        rating: 5,
        img: "https://static.toprecepty.cz/fotky/recepty/0112/lepkave-kruti-kousky-189154-1920-1080-nwo.webp"
    },
    {
        title: "Krtkův dort s banány a čokoládou",
        time: "60 min",
        rating: 4.5,
        img: "https://static.toprecepty.cz/fotky/recepty/0472/krtkuv-dort-na-plechu-224742-1920-1080-nwo.webp"
    }
    ,
    {
        title: "Domácí pizza s čerstvou bazalkou",
        time: "90 min",
        rating: 4,
        img: "https://receptyzpostele.cz/wp-content/uploads/2018/03/Dom%C3%A1c%C3%AD-pizza-Margherita-768x576.jpg"
    }
    // Přidej další recepty podle potřeby
];

export function Recipes() {

    const doporucujeme = recipesData.filter(recept => recept.rating >= 4);


    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 2,
            minHeight: 250,
            justifyItems: 'center'
                        }}>
                        {doporucujeme.map((recept, idx) => (
                            <Recipe key={idx} recept={recept} />
                        ))}

        </Box>
    );
}