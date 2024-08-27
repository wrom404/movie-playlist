import React from 'react';
import Header from './Header';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card';
import { nav } from '../constants/NavLinks';
import Width from '../utils/Width';
import PopularMovie from './PopularMovie';
import NowPlayingMovie from './NowPlayingMovie';
import { FaArrowAltCircleRight } from "react-icons/fa";
import Footer from './Footer';
import MovieCategory from './MovieCategory';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import MovieCarousel from './MovieCarousel';

const Hero = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const {isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, true);
  const { width } = Width();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`movie/${id}`)
  }

  return (
    <>
      {/* daisyui sidebar */}
      <section className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">

          <div className="bg-dark flex flex-col-reverse lg:flex-row xs:min-h-screen md:min-h-screen">
            <div className="w-full lg:w-2/5 min-h-fit md:h-screen flex items-center flex-col">
              <p className=" max-sm:text-sm md:text-base text-slate-100 w-full px-4 md:w-[26rem] pt-12 md:pt-32 text-center md:text-left">
                Welcome to Movie tambayan, your ultimate destination for discovering the latest and most popular movies. Whether you're a fan of action-packed blockbusters, heartwarming dramas, or laugh-out-loud comedies, we've got something for everyone. Dive in and find your next favorite film today!
              </p>

              <div className='mt-8 w-full px-4 md:w-auto'>
                <div className="bg-slate-900 px-6 py-2 rounded-xl w-full md:w-fit">
                  <p className="text-blue-500 text-2xl font-semibold text-center md:text-left">
                    Featured Movie
                  </p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  {isLoading ? (
                    // Render Skeleton Loaders when data is still loading
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex w-24 lg:w-28 xl:w-32 md:h-64 rounded-md flex-col gap-4">
                        <div className="skeleton h-32 w-full bg-semiDark skeleton-dark"></div>
                        <div className="skeleton h-4 w-3/4 bg-semiDark skeleton-dark"></div>
                        <div className="skeleton h-4 w-full bg-semiDark skeleton-dark"></div>
                        <div className="skeleton h-4 w-full bg-semiDark skeleton-dark"></div>
                      </div>
                    ))
                  ) : (
                    // Render Movie Cards once data is loaded
                    movieList && movieList.length > 0 ? (
                      movieList.slice(0, 3).map((movie) => (
                        <Card 
                          handleClick = {handleClick}
                          // m={movie}
                          key={movie.id} 
                          id={movie.id}
                          imgUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          title={movie.title}
                          date={movie.release_date}
                        />
                      ))
                    ) : (
                      <p className='text-2xl text-slate-200'>No movies found.</p>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-3/5 bg-dark flex items-center">
              {!isLoading ? 
                <div className="carousel w-full lg:w-11/12 pt-12 lg:pt-8">
                  {movieList && movieList.length > 0 && movieList.map((movie, i) => (
                    <div id={`slide${i + 1}`} key={i} className="carousel-item relative w-full">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                        className="w-full"
                        alt={`Slide ${i + 1}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a 
                          href={`#slide${(i)}`} 
                          className="btn btn-circle bg-dark border-none text-slate-500"
                        >
                          ❮
                        </a>
                        <a 
                          href={`#slide${(i + 2)}`} 
                          className="btn btn-circle bg-dark text-slate-500 border-none"
                        >
                          ❯
                        </a>
                      </div>
                      <div className="flex absolute left-12 bottom-2 text-slate-100 ">
                        <div className="flex-[2]">
                          <div className="ms-4 w-12 md:w-28">
                            <img 
                              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                              alt="pic" 
                              className='w-full object-cover rounded-md'
                            />
                          </div>
                        </div>
                        <div className="flex-[8] text-slate-100 flex flex-col justify-end mb-4 pr-8">
                          <p className="ms-2 text-sm md:text-2xl font-semibold text-slate-100">
                            {movie.title}
                          </p>
                          {width >= 425 && <p className="text-sm">
                              {movie.overview}
                            </p>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div> :
                <div className="skeleton w-full max-sm:h-56 h-72 lg:h-2/3 lg:w-11/12 bg-semiDark skeleton-dark"></div>

              }
              

            </div>
          </div>
          <div className="flex justify-center items-center flex-col gap-2 lg:gap-4 bg-dark px-4 md:px-28 lg:py-4 w-full">
            <p className="text-2xl lg:text-4xl font-bold text-blue-500 w-full border-l-8 border-slate-900 ps-2   lg:px-2 flex gap-2 lg:gap-4 cursor-pointer max-sm:mt-12">
              Now playing 
              <label className="text-slate-200 mt-2 md:mt-3 text-xl lg:text-2xl cursor-pointer">
                <FaArrowAltCircleRight />
              </label>
            </p>
            <NowPlayingMovie 
              handleClick={handleClick}
            /> 
          </div> 
          <div className="flex justify-center items-center flex-col gap-2 lg:gap-4 bg-dark px-4 md:px-28 lg:py-12 w-full">
            <p className="text-2xl lg:text-4xl font-bold text-blue-500 w-full border-l-8 border-slate-900 ps-2   lg:px-2 flex gap-2 lg:gap-4 cursor-pointer max-sm:mt-12">
              Hot picks 
              <label className="text-slate-200 mt-2 md:mt-3 text-xl lg:text-2xl cursor-pointer">
                <FaArrowAltCircleRight />
              </label>
            </p>
            <PopularMovie 
              handleClick={handleClick}
            /> 
          </div> 
          <div className=''>
            <MovieCarousel />
          </div>
          <div className='bg-dark xxs:pt-12'>
          <MovieCategory 
            handleClick={handleClick}
          />
          </div>
            <div>
              <Footer />
            </div>
          </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu text-base-content min-h-full w-72 max-xxs:w-60 p-4 bg-dark">

              <div className="collapse collapse-arrow bg-dark">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium text-slate-200">Movies</div>
                <div className="collapse-content text-slate-200">
                  <li><Link to={`/movies/${'popular'}`}>Popular</Link></li>
                  <li><Link to={`/movies/${'top_rated'}`}>Top Rated</Link></li>
                  <li><Link to={`/movies/${'upcoming'}`}>Upcoming</Link></li> 
                </div>
              </div>

              <div className="collapse collapse-arrow bg-dark">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium text-slate-200">TV Shows</div>
                <div className="collapse-content text-slate-200">
                  <li><Link to={`/tvshows/${'popular'}`}>Popular</Link></li>
                  <li><Link to={`/tvshows/${'top_rated'}`}>Top Rated</Link></li>
                </div>
              </div>

          </ul>
        </div>
      </section>
    </>
  );
}

export default Hero;
