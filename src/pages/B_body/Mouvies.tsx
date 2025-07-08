import {useEffect, useState, useTransition} from 'react';
import type {Movie} from "../../@types/movieItem";
import {get} from "../../api/api.tsx";
import MovieItem from "../../components/MovieItem.tsx";
import Pages from "../../components/layout/Pages.tsx";
import {useParams} from 'react-router';

const Movies = () => {
    const [allMovise, setMovies] = useState<Movie[]>([]);
    const [searchMouvies, setSearchMouvies] = useState<Movie[]>([]);
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
    console.log(search)
    console.log(searchMouvies)
    return (

        <Pages title={"Movies"}>
            <div>
                {!isPending ? (
                    <>
                        <h1>Films</h1>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                            {!search || "" ? allMovise.map((movie) => (
                                <MovieItem key={movie.id} movie={movie}/>
                            )) : searchMouvies.map((movie) => (
                                <MovieItem key={movie.id} movie={movie}/>
                            ))}
                        </div>
                    </>
                ) : (<p style={{color: "white", padding: "2rem"}}>Chargement...</p>)}
            </div>
        </Pages>

    )
}

export default Movies;