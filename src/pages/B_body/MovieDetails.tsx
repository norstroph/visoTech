import { useEffect, useState, useTransition} from 'react';
import {useParams} from 'react-router';
import {get} from '../../api/api.tsx';
import {
    Box,

    Typography,

    Chip,
    CircularProgress,

    Button, Stack,
    Rating
} from '@mui/material';
import type {Movie} from "../../@types/movieItem";

const MovieDetails = () => {


    const [isPending, startTransition] = useTransition()
    const {id} = useParams()
    const [movie, setMovie] = useState<Movie>()
    useEffect(() => {
        startTransition(async () => {
            const movie = await get(`/movie/${id}`)
            startTransition(() => {
                setMovie(movie)
            })
        })
    }, []);


    if (isPending) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
                <CircularProgress color="secondary"/>
            </Box>
        );
    }

    if (!movie) {
        return <Typography color="error">Aucun film trouvé</Typography>;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            gap: 4,
            padding: 4,
            color: 'white',
        }}>

            <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{
                    width: {xs: '100%', md: 300},
                    borderRadius: 2,
                    boxShadow: 4
                }}
            />


            <Box sx={{flex: 1}}>
                <Typography variant="h4" gutterBottom>{movie.title}</Typography>
                <Typography variant="subtitle1" gutterBottom sx={{opacity: 0.7}}>
                    {movie.tagline}
                </Typography>


                <Stack direction="row" spacing={1} sx={{my: 2, flexWrap: 'wrap'}}>
                    {movie.genres.map((genre) => (
                        <Chip key={genre.id} label={genre.name} color="primary"/>
                    ))}
                </Stack>


                <Typography variant="body1" gutterBottom>
                    <strong>Durée :</strong> {movie.runtime} min
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Date de sortie :</strong> {movie.release_date}
                </Typography>
                <Rating
                    name="read-only"
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                    sx={{mb: 2}}
                />


                <Typography variant="body2" sx={{mt: 3, lineHeight: 1.8}}>
                    {movie.overview}
                </Typography>

                <Button
                    variant="contained"
                    sx={{mt: 4, bgcolor: 'red'}}
                    href={`https://www.themoviedb.org/movie/${movie.id}`}
                    target="_blank"
                >
                    Voir sur TMDB
                </Button>
            </Box>
        </Box>
    );
};

export default MovieDetails;


