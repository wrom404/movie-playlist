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
  console.log(currentLocation.pathname);
  

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
    <>
      <div>
        <h2 className="text-xl md:text-2xl lg:text-4xl text-blue-500 font-semibold ps-6 sm:ps-12 md:ps-16   lg:ps-32 pt-24 lg:pt-28 pb-8">
          {`${type.toUpperCase()} ${basePath.toUpperCase()}`}
        </h2>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-0 gap-y-4 md:gap-x-8 md:gap-y-6 px-4 sm:px-8 md:px-16 lg:px-32'>
        {!isLoading ? 
          movieList && movieList.length > 0 && movieList.map((movie, i) => (
            <div 
              key={i} 
              className="w-[6rem] md:w-[6.5rem] lg:w-48 rounded-md"
              onClick={() => handleClick(movie.id)}
            > 
              <div className="w-full md:w-full lg:w-48 rounded-md overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                  className='hover:scale-105 transition-transform'
                  alt="pic" 
                />
              </div>
              <div className="flex flex-col gap-0 justify-start">
                <p className="text-slate-200 font-semibold text-sm lg:text-lg truncate">
                  {movie.title}
                </p>
                <p className="text-slate-200 text-xs lg:text-sm">
                  {movie.release_date}
                </p>
              </div>
            </div>
          )) : 
            
          Array.from({length: 12}).map((_,index) => (
            <div className="flex flex-col gap-4 w-24 lg:w-52" key={index}>
              <div className="skeleton h-32 w-full skeleton-dark"></div>
              <div className="skeleton h-4 w-28 skeleton-dark"></div>
              <div className="skeleton h-4 w-full skeleton-dark"></div>
              <div className="skeleton h-4 w-full skeleton-dark"></div>
          </div>
          ))
        }
      </div>
    </>
  )
}

export default MovieListPage


