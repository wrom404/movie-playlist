import React from 'react'
import useFetch from '../hooks/useFetch'

const PopularMovie = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, true);

  return (
    // daisyui carousel
    <>
      {!isLoading ? 
        <div className="carousel flex gap-4 rounded-none w-[100%] md:w-[90%] lg:w-[100%]">
        {movieList && movieList.length > 0 && movieList.map(movie => (
          <div className="carousel-item flex flex-col w-24 lg:w-52" key={movie.id}>
            <div className='w-24 lg:w-52 rounded-md overflow-hidden'>
              <img
                className='w-24 lg:w-52 rounded-md hover:scale-105 transition-transform'
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="Burger" 
              />
            </div>
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
      </div> :
      <div className='flex gap-4'>
        {Array.from({length: 6}).map((index) => (
          <div className="flex flex-col gap-4 w-24 lg:w-52">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ))}
      </div>}
    </>
  )
}

export default PopularMovie