import React, { useReducer, useState } from 'react'
import useFetch from '../hooks/useFetch'
import GenreButton from '../components/GenreButton';

    const reducer = (state, action) => {
        switch (action.type) {
            case 'Action':
            case 'Adventure':
            case 'Animation':
            case 'Comedy':
            case 'Fantasy':
            case 'Horror':
            case 'Romance':
            case 'Science Fiction':
                return action.type; 
            default:
                return state;  
        }
    }


const MovieCategory = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    const [state, dispatch] = useReducer(reducer, 'Action');

    if (isLoading) return <p className='text-4xl text-slate-100'>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const validGenres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Fantasy', 'Horror', 'Romance', 'Science Fiction'];
    const filteredGenres = movieList?.genres?.filter((genre) => validGenres.includes(genre.name));
    
    console.log(state)
    return (
        <div className='bg-dark px-8 md:px-32 md:py-8'>
            <p className="text-blue-500 text-xl md:text-2xl lg:text-4xl font-bold border-l-8 border-slate-900 ps-2">
                Movies
            </p>
            <div className='flex gap-x-6 md:gap-x-8 gap-y-2 flex-wrap mt-2'>
                {filteredGenres.map((genre, i) => (
                    <div key={i}>
                        <GenreButton 
                            genre={genre.name} 
                            handleClick={() => dispatch({ type: genre.name })}
                        />
                    </div>
                ))}
            </div>
            <p className="text-slate-200 text-4xl">
            {state}
            </p>
        </div>
    )
}

export default MovieCategory;
