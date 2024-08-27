import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { FaStar } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import VideoPlayer from '../components/VideoPlayer';

const MoviePage = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { id: movieId } = useParams();
    const [isVideoPlayer, setVideoPlayer] = useState(false);
    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const [videoKey, setVideoKey] = useState(null);
    const [genresList, setGenresList] = useState([]);

    useEffect(() => {
        const handleGenres = () => {
            setGenresList(movieList.genres);
        };
        handleGenres();
    }, [movieList]);

    const handleClick = () => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                const officialTrailer = data.results.find(video => video.name === 'Official Trailer');
                setVideoKey(officialTrailer.key);
            })
            .catch(err => console.error('Error fetching video data:', err));
        setVideoPlayer(true);
    };

    if (isLoading) return <p className='h-screen flex justify-center items-center'>Loading...</p>;
    if (error) return <p className='h-screen flex justify-center items-center'>{error}</p>;

    return (
        <div className='relative h-screen w-full'>
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: movieList ? `url(https://image.tmdb.org/t/p/w500/${movieList.backdrop_path})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(8px)',
                    zIndex: -1
                }}
            />
            <div className='bg-black absolute inset-0 opacity-50 z-10'></div>
            {movieList && 
                <div className='grid grid-cols-1 lg:grid-cols-3 md:gap-x-6 relative h-full w-full z-10 p-4'>
                    <div className='lg:col-span-1 lg:row-span-3 flex justify-center lg:justify-end items-center'>
                        <div className='max-lg:mt-16 w-44 xs:w-48 md:w-60 lg:w-80'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movieList.poster_path}`} alt="" className='w-full brightness-100'/>
                        </div>
                    </div>
                    <div className='lg:col-span-2 lg:row-span-2 flex flex-col md:gap-2 md:pt-48 h-full'>
                        <p className="text-slate-200 font-bold text-2xl md:text-3xl">
                            {movieList.title}
                        </p>
                        <div className="text-base text-slate-200 flex items-center gap-2">
                            Rating: <FaStar className='text-xl text-yellow-500' /> <span className="font-semibold">{Math.floor(movieList.vote_average * 10) / 10}</span>
                        </div>
                        <div className="text-slate-200 flex items-center gap-2">
                            Popularity: <FaFire className='text-xl text-red-500' /> <span className='font-semibold'>{movieList.popularity}</span>
                        </div>
                        <div className="text-slate-200 flex items-center gap-2">
                            Release date: <CiCalendarDate className='text-xl' /> <span className='font-semibold'>{movieList.release_date}</span>
                        </div>
                        <div className="text-slate-200 flex flex-wrap gap-2 mt-4">
                            {genresList && genresList.length > 0 && genresList.map(genre => (
                                <span 
                                    key={genre.id} 
                                    className="text-slate-200 border px-4 py-1 cursor-pointer hover:border-blue-500 hover:text-blue-500"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <button className='border px-4 py-2 hover:border-blue-500 hover:text-blue-500 text-slate-200 mt-4 max-w-[360px]' onClick={handleClick}>
                            Play Trailer
                        </button>
                    </div>
                    <div className='lg:col-span-2 lg:row-span-1 md:mb-24'>
                        <div className="text-slate-200 mt-4">
                            <p className='text-xl font-semibold'>Overview</p>
                            <p>{movieList.overview}</p>
                        </div>
                        {isVideoPlayer && (
                            <div className='mt-4'>
                                <VideoPlayer 
                                    videoKey={videoKey}
                                    setVideoPlayer={setVideoPlayer}
                                />
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

export default MoviePage;
