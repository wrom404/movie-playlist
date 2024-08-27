import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const MovieSearchResult = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const {query} = useParams();
    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`, true);
    const [genres, setGenres] = useState([])
    console.log(movieList)

    useEffect(() => {
        const handleGenres = () => {
            setGenres(movieList.genres);
        };
        handleGenres();
    }, [movieList])

    if(error) return <div>{error.message}</div>

  return (
    <div className='bg-dark'>
        {console.log(genres)
        }
        <div className="pt-24 pb-8 px-8 lg:pt-32 lg:px-24">
            <p className="text-lg md:text-xl lg:text-4xl text-slate-200">Search "{query}"</p>
        </div>
        <div className='min-h-screen flex flex-col gap-2 bg-dark px-8 lg:px-24'>
        {!isLoading ? movieList && movieList.length > 0 ? movieList.map((movie, index) => (
            <div className='border border-slate-500 flex gap-2' key={index}>
                <div className="w-[70px] h-[120px] md:w-[90px] md:h-[150px] grid items-center ps-2 lg:ps-4">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                        className='w-full'
                        alt="pic" 
                    />
                </div>
                <div className="flex flex-col py-2 lg:py-4 text-slate-200">
                    <p className='text-sm md:text-base'>{movie.title}</p>
                    <p className='text-xs md:text-sm'>{movie.release_date}</p>
                    <div>
                        {genres && genres.length > 0 && genres.map((genre, i) => (
                            <div 
                                className='border'
                                key={i}
                            >
                                {genre}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            )) : 
            <div>
                <p className="">
                    Can't find result "{query}"", please try another.
                </p>
            </div> :
            <div>
                <p className="">
                    Loading pa tawn...
                </p>
            </div>}
        </div>
    </div>
  )
}

export default MovieSearchResult