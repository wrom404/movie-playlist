import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const MovieListPage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const {type} = useParams();
  const currentLocation = useLocation();
  const basePath = currentLocation.pathname.split('/')[1];
  let isLoading, error, movieList =[];
  let slicedWord;

  function sliceWord(word) {
    return word === 'movies' ? word.split('').slice(0, word.length - 1).join('') : word.split('').slice(0, word.length - 5).join('');
  }

  function fetchMovies(basePath, type) {
    ({ isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/${basePath}/${type}?api_key=${apiKey}`, true));
  }

  switch (basePath) {
    case 'movies':
      switch (type) {
        case 'popular':
          slicedWord = sliceWord(basePath);
          fetchMovies(slicedWord, type)
          break;
        case 'top_rated':
          slicedWord = sliceWord(basePath);
          fetchMovies(slicedWord, type)
          break;
        case 'upcoming':
          slicedWord = sliceWord(basePath);
          fetchMovies(slicedWord, type)
          break;
      
        default:
          <p>none</p>
          break;
      }
      break;
    case 'tvshows':
      switch (type) {
        case 'popular':
          slicedWord = sliceWord(basePath);
          fetchMovies(slicedWord, type)
          break;
        case 'top_rated':
          slicedWord = sliceWord(basePath);
          fetchMovies(slicedWord, type)
          break;
        case 'upcoming':
          slicedWord = sliceWord(basePath);
          fetchMovies(slicedWord, type)
          break;
      
        default:
          <p>none</p>
          break;
      }
      break;
  
    default:
      <p>none</p>
      break;
  }
  

  return (
    <div className='h-screen flex justify-center items-center text-slate-200'>
        
    </div>
  )
}

export default MovieListPage


