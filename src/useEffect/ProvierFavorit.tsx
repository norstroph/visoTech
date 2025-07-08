import {createContext, useContext, useState} from 'react';
import type {ReactNode} from 'react';
import type {Movie} from '../@types/movieItem';


type FavoritesContextType = {
    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (movieId: number) => boolean;
};


const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);


export const FavoritesProvider = ({children}: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);


    const toggleFavorite = (movie: Movie) => {
        setFavorites((element) => {
            if (element.find((fav) => fav.id === movie.id)) {

                return element.filter((fav) => fav.id !== movie.id);
            } else {
                console.log([...element, movie])
                return [...element, movie];
            }
        });
    };

    const isFavorite = (movieId: number) => {
        return favorites.some((fav) => fav.id === movieId);
    };

    return (
        <FavoritesContext.Provider value={{favorites, toggleFavorite, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites =() => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};