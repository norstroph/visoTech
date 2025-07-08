import {Route, Routes } from "react-router";
import Dashboard from "../pages/B_body/Dashboard";
import Favorite from "../pages/B_body/Favorite";

import PeopleDetails from "../pages/B_body/PeopleDetails.tsx";
import MovieDetails from "../pages/B_body/MovieDetails.tsx";
import Movies from "../pages/B_body/Mouvies.tsx";
import Setting from "../pages/B_body/Setting.tsx";
import Register from "../pages/B_body/Register.tsx";


const Router= () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="movies/:id/" element={<MovieDetails/>}/>
                <Route path="movies/" element={<Movies/>}/>
                <Route path="search/:search" element={<Movies/>}/>
                <Route path="login/" element={<Setting/>}/>
                <Route path="register/" element={<Register/>}/>
                <Route path="favorite" element={<Favorite/>}/>
                <Route path="pepole" element={<PeopleDetails/>}/>
            </Routes>
        </>
    );
};

export default Router;
