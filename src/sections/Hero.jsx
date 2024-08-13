import React from 'react';
import Header from './Header';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card';
import { nav } from '../constants/NavLinks';
import Width from '../utils/Width';
import PopularMovie from './PopularMovie';
import NowPlayingMovie from './NowPlayingMovie';
import { FaArrowRight } from "react-icons/fa6";

const Hero = () => {
  const { error, movieList } = useFetch(`https://api.themoviedb.org/3/movie/popular?api_key=cd195342e84b2de96c560c1ecbc7b217`, true);
  const { width } = Width();

  return (
    <>
      {/* daisyui sidebar */}
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Header />
          <div className="bg-dark flex flex-col-reverse lg:flex-row xs:min-h-screen md:min-h-screen">
            <div className="w-full lg:w-2/5 min-h-fit md:h-screen flex items-center flex-col">
              <p className=" max-sm:text-sm md:text-base text-slate-100 w-full px-4 md:w-[26rem] pt-12 md:pt-32 text-center md:text-left">
                Welcome to Movie Lounge, your ultimate destination for discovering the latest and most popular movies. Whether you're a fan of action-packed blockbusters, heartwarming dramas, or laugh-out-loud comedies, we've got something for everyone. Dive in and find your next favorite film today!
              </p>

              <div className='mt-8 w-full px-4 md:w-auto'>
                <div className="bg-slate-900 px-6 py-2 rounded-xl w-full md:w-fit">
                  <p className="text-blue-500 text-2xl font-semibold text-center md:text-left">
                    Featured Movie
                  </p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  {movieList && movieList.length > 0 && movieList.slice(0, 3).map((movie) => (
                    <Card 
                      m={movie}
                      key={movie.id} 
                      imgUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      title={movie.title}
                      date={movie.release_date}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-3/5 bg-dark flex items-center">
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
                        className="btn btn-circle"
                      >
                        ❮
                      </a>
                      <a 
                        href={`#slide${(i + 2)}`} 
                        className="btn btn-circle"
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
                        <p className="ms-2 text-sm md:text-2xl font-semibold">
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
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col gap-8 bg-dark px-16 md:px-28 lg:py-12">
            <p className="lg:text-4xl font-bold text-blue-500 w-full border-l-8 border-slate-900 lg:px-2 flex gap-4 cursor-pointer">
              Now Playing 
              <label className="text-slate-100 md:mt-3 text-2xl">
                <FaArrowRight />
              </label>
            </p>
            <NowPlayingMovie /> 
          </div> 
          <div className="flex justify-center items-center bg-dark md:px-16 lg:px-28 lg:py-12 border-4 border-green-500">
            <PopularMovie />
          </div>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-72 max-xxs:w-60 p-4">
            {nav.map((nav, i) => (
              // daisyui accordion
              <div className="collapse collapse-arrow bg-base-200" key={i}>
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">{nav.navName}</div>
                <div className="collapse-content">
                  <li><a>Popular</a></li>
                  <li><a>Top Rated</a></li>
                  <li><a>Upcoming</a></li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Hero;
