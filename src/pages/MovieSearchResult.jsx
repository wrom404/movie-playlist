import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const MovieSearchResult = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const {query} = useParams();
    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`, true);
    const navigate = useNavigate();

    if(error) return <div>{error.message}</div>

    const navigatePage = (id) => {
        navigate(`/movie/${id}`)
    }

  return (
    <div className='bg-dark'>
        <div className="pt-24 pb-8 px-8 lg:pt-32 lg:px-24">
            <p className="text-lg md:text-xl lg:text-4xl text-slate-200">Search "{query}"</p>
        </div>
        <div className='min-h-screen flex flex-col gap-2 bg-dark px-8 lg:px-24'>
        {!isLoading ? movieList && movieList.length > 0 ? movieList.map((movie, index) => (
            <div 
                className='border border-slate-600 flex gap-2 hover:bg-slightDark hover:border-slate-700' 
                key={index}
                onClick={() => navigatePage(movie.id)}
            >
                <div className="w-[70px] h-[100px] md:w-[90px] md:h-[150px] grid items-center ps-2 lg:ps-4">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                        className='w-full'
                        alt="pic" 
                    />
                </div>
                <div className="flex flex-col mt-4 lg:py-4 text-slate-200 w-4/5">
                    <p className='text-sm md:text-base 2xl:text font-semibold'>{movie.title}</p>
                    <p className='text-xs'>{movie.release_date}</p>
                    <div className='w-full flex flex-col py-2'>
                        <p className="truncate text-sm ">{movie.overview}</p>
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
                    Loading...
                </p>
            </div>}
        </div>
    </div>
  )
}

export default MovieSearchResult