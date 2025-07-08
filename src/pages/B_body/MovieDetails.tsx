import {startTransition, useEffect, useState, useTransition} from 'react';
import {useParams} from 'react-router';
import {get} from '../../api/api.tsx';
import {
    Box,
    Container,
    Typography,
    Grid,
    Chip,
    CircularProgress,
    Rating,
    Button
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
        <Container maxWidth="lg" sx={{py: 4}}>
            <Grid container spacing={4}>
                {/* Image */}
                <Grid item xs={12} md={4}>
                    <Box
                        component="img"
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        sx={{
                            width: '100%',

                            borderRadius: 2,
                            boxShadow: 3
                        }}
                    />
                </Grid>

                {/* Infos */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>{movie.title}</Typography>
                    <Rating
                        name="read-only"
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                        sx={{mb: 2}}
                    />
                    <Typography variant="body1" paragraph>{movie.overview}</Typography>

                    <Box sx={{mb: 2}}>
                        {movie.genres?.map((genre) => (
                            <Chip
                                key={genre.id}
                                label={genre.name}
                                color="secondary"
                                variant="outlined"
                                sx={{mr: 1, mb: 1}}
                            />
                        ))}
                    </Box>

                    <Typography variant="subtitle1">Date de sortie : {movie.release_date}</Typography>
                    <Typography variant="subtitle1">Durée : {movie.runtime} min</Typography>
                    <Typography variant="subtitle1">Langue originale
                        : {movie.original_language.toUpperCase()}</Typography>

                    <Box mt={3}>
                        <Button variant="contained" color="primary">
                            Ajouter aux favoris
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MovieDetails;


