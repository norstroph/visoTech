import Pages from "../../components/layout/Pages.tsx"
import type {Movie} from "../../@types/movieItem";


import './DashBord.css'
import Carousel from "../../layout/Carousel.tsx";
import {useEffect, useState, useTransition} from "react";
import CarouselCAtegorie from "../../layout/CarouselCAtegorie.tsx";
import {get} from "../../api/api.tsx";

const Dashboard = () => {
    const [moviesTopRated, setMovieTopRated] = useState<Movie[]>([]);
    const [moviesUpComing, setMovieUpComing] = useState<Movie[]>([]);
    const [moviesPopular, setMoviesPopular] = useState<Movie[]>([]);
    const [isPending, startTransition] = useTransition()
    useEffect(() => {
        startTransition(async() => {
            const moviesTopRated = await get('/movie/top_rated?&page=1');
            const moviesUpComing = await get('/movie/upcoming?&page=1');
            const moviesPopular = await get('/movie/popular?&page=1');

            const filterValidMovies = (list: Movie[]) =>
                list.filter((movie) =>
                    movie.overview?.trim() !== "" && movie.poster_path !== null
                );
            startTransition(() => {
                setMovieTopRated(moviesTopRated.results)
                setMovieUpComing(moviesUpComing.results)
                setMoviesPopular(filterValidMovies(moviesPopular.results))
            })
        })
    }, []);
    return (
        <>
            <Pages title={"Dashboard"}>
                {!isPending ? (
                    <>
                        <Carousel movies={moviesTopRated}/>
                        <h2>Films à venir</h2>
                        <CarouselCAtegorie movies={moviesUpComing}/>
                        <h2>Films populaires</h2>
                        <CarouselCAtegorie movies={moviesPopular}/>
                    </>

                ) : (
                    <p style={{color: "white", padding: "2rem"}}>Chargement...</p>
                )}
            </Pages>
        </>
    )
}

export default Dashboard;
