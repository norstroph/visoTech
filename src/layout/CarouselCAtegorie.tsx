


import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./CarouselCategorie.css";
import MovieItem from "../components/MovieItem.tsx";

import type {Movie} from "../@types/movieItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


type props = {
    movies: Movie[]
}
const CarouselCAtegorie = ({movies}: props) => {

    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,

        prevArrow: (

                <div className="prev-slick-arrow">
                    <ArrowBackIosIcon sx={{color: "white"}}></ArrowBackIosIcon>
                </div>

        ),
        nextArrow : (

                <div className="next-slick-arrow">
                    <ArrowForwardIosIcon sx={{color: "white"}}></ArrowForwardIosIcon>
                </div>

        ),
    };
    return (
        <>
            <div className="content">
                <div className="container">
                    <Slider {...settings}>
                        {
                            movies.map((movie) =>

                                <MovieItem key={movie.id} movie={movie}/>
                            )
                        }
                    </Slider>
                </div>
            </div>
        </>
    );

}
export default CarouselCAtegorie;