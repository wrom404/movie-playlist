import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';


const MoviePage = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const movieId = useParams();

    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`, true);
    console.log(error)
    

  return (
    <div className='text-4xl text-red-500 h-screen w-full grid items-center'>
        {movieList && movieList.length > 0 && <>{movieList}</>}
    </div>
  )
}

export default MoviePage