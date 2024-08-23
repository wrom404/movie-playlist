import React, { useEffect, useState } from 'react'
import ImageCarousel from '../components/ImageCarousel';
import useFetch from '../hooks/useFetch';

const MovieCarousel = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`, true);
    movieList && console.log(movieList)

  return (
    <section className="flex justify-center items-center bg-gray-900 w-full py-4 sm:py-8 md:py-16 px-8 sm:px-16 md:px-32">
      <ImageCarousel movieList={movieList} interval={3000} />
    </section>
  )
}

export default MovieCarousel