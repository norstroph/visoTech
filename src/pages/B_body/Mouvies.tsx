import {useEffect, useState, useTransition} from 'react';
import type {Movie} from "../../@types/movieItem";
import {get} from "../../api/api.tsx";
import MovieItem from "../../components/MovieItem.tsx";
import Pages from "../../components/layout/Pages.tsx";
import {useParams} from 'react-router';
import genreData from "../../dataFake/genre.json";
import {Box, Chip} from "@mui/material";

const Movies = () => {
    const [allMovise, setMovies] = useState<Movie[]>([]);
    const [searchMouvies, setSearchMouvies] = useState<Movie[]>([]);
    const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [genreName, setGenreName] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition()
    const {search} = useParams();

    console.log(search)

    useEffect(() => {
        startTransition(async () => {
            const allMovise = await get('/movie/top_rated?&page=1');
            const searchMouvies = await get(`/search/movie?query=${search}&page=1`);
            startTransition(() => {
                setMovies(allMovise.results)
                setSearchMouvies(searchMouvies.results)

            })
        })


    }, [search]);
    const handleGenreClick = async (genreId: number, genreName: string) => {
        setSelectedGenre(genreId);
        setGenreName(genreName);
        const res = await get(`/discover/movie?with_genres=${genreId}&page=1`);
        setGenreMovies(res.results);
    };
    console.log(search)
    console.log(searchMouvies)
    return (

        <Pages title={"Movies"}>                                                                                  


            {!isPending ? (
                <>
                    <Box sx={{position: 'Sticky', top: 0, zIndex: 1000, gap: '2rem'}}>
                        {genreData.genres.map((genre) => (
                            <Chip key={genre.id} label={genre.name} color="primary" size="small"
                                  onClick={() => handleGenreClick(genre.id, genre.name)}/>))}
                    </Box>
                    <h1>{!genreName ? "Films" : genreName}</h1>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                        {selectedGenre
                            ? genreMovies.map((movie) => (
                                <MovieItem key={movie.id} movie={movie}/>
                            ))
                            : !search
                                ? allMovise.map((movie) => (
                                    <MovieItem key={movie.id} movie={movie}/>
                                ))
                                : searchMouvies.map((movie) => (
                                    <MovieItem key={movie.id} movie={movie}/>
                                ))}
                    </Box>
                </>
            ) : (<p style={{color: "white", padding: "2rem"}}>Chargement...</p>)}

        </Pages>

    )
}

export default Movies;