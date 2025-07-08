import {useEffect, useState} from "react";
import {get} from "../api/api";

 const SearchMovies = (valueInput:string) => {

    const [results, setResults] = useState([]);

    useEffect(() => {
        if (valueInput.trim() === "") {
            setResults([]);
            return;
        }


        const delayInpute = setTimeout(() => {
            const fetchMovies = async () => {
                try {
                    const res = await get(`/search/movie`, {
                        params: {valueInput}
                    });
                    setResults(res.results);
                    return results
                } catch (error) {
                    console.error("Erreur de recherche :", error);
                    setResults([]);
                }
            };

            fetchMovies();
        }, 500);

        return () => clearTimeout(delayInpute);

    }, [valueInput])
}
export default SearchMovies;