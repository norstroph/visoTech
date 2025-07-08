import Pages from "../../components/layout/Pages";

import {useFavorites} from '../../useEffect/ProvierFavorit.tsx';
import MovieItem from '../../components/MovieItem';
const Favorite = () => {
    const {favorites} = useFavorites();
    return (
        <>
            <Pages title={"Favorite"}>
                <div>
                    {favorites.length > 0 ? (
                        <>
                    <h1>Mes favoris</h1>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                        {favorites.map((movie) => (
                            <MovieItem key={movie.id} movie={movie}/>
                        ))}
                    </div>
                        </>
                        ):(<p style={{color: "white", padding: "2rem"}}>Chargement...</p>)}


                </div>
            </Pages>
        </>
    );
};

export default Favorite;

