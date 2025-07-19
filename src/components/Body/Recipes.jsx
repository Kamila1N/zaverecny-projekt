import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';


//zatím si tady dám data ručně, ale časem to budu tahat z API

const recipesData = [
    {
        title: "Palačinky s javorovým sirupem",
        time: "20 min",
        img: "https://www.womanonly.cz/wp-content/uploads/fly-images/41618/palacinky-1048x0-c.jpg"
    },
    {
        title: "Pravé italské tiramisu z vaječných žloutků",
        time: "30 min",
        img: "https://www.womanonly.cz/wp-content/uploads/fly-images/18350/tiramisu2-1048x0-c.jpg"
    },

    {
        title: "Svíčková na smetaně s domácími knedlíky",
        time: "120 min",
        img: "https://www.nejrecept.cz/upload/39134757_028ef8ceafa455_full.jpg"
    },
    {
        title: "Tvarohové knedlíky s jahodami",
        time: "45 min",
        img: "https://static.toprecepty.cz/fotky/recepty/0052/rychle-tvarohove-knedliky-127352-1920-1080-nwo.webp"
    },
    {
        title: "Kuřecí prsa ve sladkokyselé omačce",
        time: "35 min",
        img: "https://static.toprecepty.cz/fotky/recepty/0112/lepkave-kruti-kousky-189154-1920-1080-nwo.webp"
    },
    {
        title: "Krtkův dort s banány a čokoládou",
        time: "60 min",
        img: "https://static.toprecepty.cz/fotky/recepty/0472/krtkuv-dort-na-plechu-224742-1920-1080-nwo.webp"
    }
    // Přidej další recepty podle potřeby
];

export function Recipes() {
    return (
        <Box
            sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: 2,
                            minHeight: 250,
                            justifyItems: 'center'
                        }}
                    >
                        {recipesData.map((recept, idx) => (
                            <Card
                                key={idx}
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
                        <img src={recept.img} loading="lazy" alt={recept.title} />
                    </AspectRatio>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography level="title-lg">
                            <Link href="#" overlay underline="none">
                                {recept.title}
                            </Link>
                        </Typography>
                        <IconButton size="sm" variant="plain" color="neutral">
                            <FavoriteBorderRoundedIcon color="danger" />
                        </IconButton>
                    </Box>
                    <Typography level="body-sm">{recept.time}</Typography>
                    <Box sx={{ display: 'flex', gap: 1.5 ,mt: 'auto' }}></Box>
                </Card>
            ))}
        </Box>
    );
}