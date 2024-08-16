import React, { useEffect, useReducer, useState } from 'react'
import useFetch from '../hooks/useFetch'
import GenreButton from '../components/GenreButton';
import Movies from './Movies';

const MovieCategory = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    const [stateId, setStateId] = useState(28)
    const [isActive, setActive] = useState(28)

    if (isLoading) return <p className='text-4xl text-slate-100'>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const validGenres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Fantasy', 'Horror', 'Romance', 'Science Fiction'];
    const filteredGenres = movieList?.genres?.filter((genre) => validGenres.includes(genre.name));

    const handleState = (id) => {
        setStateId(id);
        setActive(id);
    }
    
    return (
        <div className='bg-dark px-8 md:px-32 md:py-8'>
            <p className="text-blue-500 text-2xl md:text-2xl lg:text-4xl font-bold border-l-8 border-slate-900 ps-2">
                Movies
            </p>
            <div className='flex gap-x-6 md:gap-x-8 gap-y-2 flex-wrap mt-2'>
                {filteredGenres.map((genre, i) => (
                    <div key={i}>
                        <GenreButton 
                            genre={genre.name}
                            isIdActive={isActive === genre.id}
                            handleClick={() => handleState(genre.id)}
                        />
                    </div>
                ))}
            </div>
            <Movies id={stateId} />
        </div>
    )
}

export default MovieCategory;
