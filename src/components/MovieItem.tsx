import Card from '@mui/material/Card';


import Typography from '@mui/material/Typography';
import {Box, Rating, Stack} from '@mui/material';
import type {Movie} from "../@types/movieItem";
import {useNavigate} from 'react-router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import {useState} from "react";
import styled from '@emotion/styled';
import {useFavorites} from '../useEffect/ProvierFavorit.tsx';
import {useLogin} from "../useEffect/Login.tsx";


const MovieItem = ({movie}: { movie: Movie }) => {
    const {toggleFavorite, isFavorite} = useFavorites();
    const {isLoggedIn} = useLogin();
    const navigate = useNavigate();
    const [value, setValue] = useState(false);
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    });
    return (
        <>
            <Card component="div" sx={{
                width: 250,
                borderRadius: '50px',
                position: 'relative',

            }}>
                <Box
                    sx={{
                        height: 380,
                        backgroundImage: `url(https://image.tmdb.org/t/p/w300${movie.poster_path})`,
                        backgroundSize: 'cover',
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',

                        backgroundPosition: 'center',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    }}
                    onClick={() => {
                        navigate(`/movies/${movie.id}`)
                    }}
                />

                <Box
                     sx={{
                         maxWidth: 345,
                         height: value ? 380 : 150,
                         mt: 'auto',
                         bottom: 0,
                         backdropFilter: 'blur(8px)',
                         overflow: value ? 'visible' : 'hidden',
                         zIndex: 100,
                         position: 'absolute',
                         transition: "all ease 0.35s",

                     }}>
                    <Typography gutterBottom variant="h6" component="h6" sx={{
                        color: 'white',
                        fontSize: '1rem',
                        lineHeight: '1.2', paddingTop: '5px', textAlign: "center", margin: value ? "0 30px" : "5px 5px"
                    }}>
                        {movie.title}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <StyledRating
                            onClick={isLoggedIn ? () => toggleFavorite(movie) : () => navigate('/login')}
                            value={isFavorite(movie.id) ? 1 : 0}
                            name="customized-color"
                            defaultValue={1}
                            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            size="small"
                            max={1}
                            icon={<FavoriteIcon fontSize="inherit"/>}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                        />
                        <Stack spacing={1}>
                            <Rating name="size-small" defaultValue={2} size="small"/>

                        </Stack>
                    </Box>
                    <Box onClick={() => value ? setValue(false) : setValue(true)}>
                        <Typography variant="body2" sx={{
                            color: 'white', fontSize: '0.8rem', display: value ? 'block' : '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: value ? 'none' : 2,
                            whiteSpace: value ? 'normal' : 'initial',
                            overflow: value ? 'visible' : 'hidden',
                            paddingLeft: '5px',
                            paddingRight: '5px',
                            textOverflow: 'ellipsis',
                        }}>
                            {movie.overview}
                        </Typography>
                        <KeyboardArrowDownIcon sx={{
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }} onClick={() => value ? setValue(false) : setValue(true)}></KeyboardArrowDownIcon>
                    </Box>
                </Box>
            </Card>
        </>
    );
};


export default MovieItem;
