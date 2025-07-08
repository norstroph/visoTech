
import MovieItem from "../components/MovieItem.tsx";


import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./Caroucel.css";
import type {Movie} from "../@types/movieItem";

type props = {
    movies: Movie[]
}

const Carousel = ({movies}: props) => {
        console.log('Movies in Carousel:', movies);



    const settings = {
        slidesToShow: 3,
        centerMode: true,
        centerPadding: "0px",
        slidesToScroll: 1,
        arrows: true,
        prevArrow: (
            <div className="prev-slick-arrow">
                <ArrowBackIosIcon sx={{color: "white"}}></ArrowBackIosIcon>

            </div>
        ),
        nextArrow: (
            <div className="next-slick-arrow">
                <ArrowForwardIosIcon sx={{color: "white"}}></ArrowForwardIosIcon>
            </div>
        ),
    };
    return (
        <>
            <h1> Top film</h1>
            <div className={"carousel"}>
                <Slider {...settings}  >


                    {
                        movies.map((movie) =>

                            <MovieItem key={movie.id} movie={movie}/>
                        )
                    }
                </Slider>
            </div>
        </>
    )
}
export default Carousel;