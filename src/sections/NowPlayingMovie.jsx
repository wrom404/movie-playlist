import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';

const NowPlayingMovie = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`, true);


  return (
    // daisyui carousel
    <div className="carousel flex gap-4 rounded-none w-[100%] md:w-[90%] lg:w-[85%]">
      {movieList && movieList.length > 0 && movieList.map(movie => (
        <div className="carousel-item flex flex-col w-24 lg:w-52" key={movie.id}>
          <img
            className='w-24 lg:w-52 rounded-md'
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="Burger" 
          />
          <div className="pt-1">
            <p className="text-sm md:text-lg text-slate-100 truncate">
              {movie.title}
            </p>
            <p className="text-xs md:text-sm text-slate-100">
              {movie.release_date}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NowPlayingMovie