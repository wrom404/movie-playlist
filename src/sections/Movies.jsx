import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'

const Movies = ({state, id}) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}`, true);

  return (
    <div className='grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-6 mt-8'>
        {!isLoading ? 
            movieList && movieList.length > 0 && movieList.map((movie, i) => (
                <div key={i} className="w-[6.5rem] lg:w-48 rounded-md">
                    <div className="w-[6.5rem] md:w-32 lg:w-48 rounded-md overflow-hidden">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                            className='hover:scale-105 transition-transform'
                            alt="pic" 
                        />
                    </div>
                    <div className="flex flex-col gap-0 justify-start">
                        <p className="text-slate-200 font-semibold lg:text-lg truncate">
                            {movie.title}
                        </p>
                        <p className="text-slate-200 text-sm">
                            {movie.release_date}
                        </p>
                    </div>
                </div>
            )) : 
            
                Array.from({length: 12}).map((index) => (
                    <div className="flex flex-col gap-4 w-24 lg:w-52">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ))
            }
    </div>

  )
}

export default Movies