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
    const [isVideoPlayer, setVideoPlayer] = useState(false)
    const { isLoading, error, movieList } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const [videoKey, setVideoKey] = useState(null);
    const [genresList, setGenresList] = useState([]);

    useEffect(() => {
        const handleGenres = () => {
            setGenresList(movieList.genres)
        };
        handleGenres();
    },[movieList])

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
    }
    genresList && console.log(genresList)
    if (isLoading) return <p className='h-screen flex justify-center items-center'>Loading...</p>;
    if (error) return <p className='h-screen flex justify-center items-center'>{error}</p>;

    return (
        <div 
            className='relative h-screen w-full grid items-center'
        >
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
                <div className='relative h-screen flex gap-8 z-10'>
                    <div className='flex-[3] flex justify-end items-center pt-16'>
                        <div className='w-80'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movieList.poster_path}`} alt="" className='w-full brightness-100'/>
                        </div>
                    </div>
                    <div className='flex-[7] flex justify-start items-center pt-8 '>
                        <div className='h-[28rem] flex flex-col gap-2'>
                            <p className="text-slate-200 font-bold text-3xl">
                                {movieList.title}
                            </p>
                            <div className="text-base text-slate-200 flex">
                                Rating: <span className='text-xl text-yellow-500 mx-2'><FaStar /></span> <p className="font-semibold text-base">{Math.floor(movieList.vote_average * 10) / 10}</p>
                            </div>
                            <div className="text-slate-200 flex gap-2">
                                Popularity: <span className='text-xl text-red-500'><FaFire /></span> <p className='font-semibold'>{movieList.popularity}</p>
                            </div>
                            <div className="text-slate-200 flex gap-2">
                                Release date: <span className='text-xl'><CiCalendarDate /></span> <p className='font-semibold'>{movieList.release_date}</p>
                            </div>
                            <div className="text-slate-200 flex gap-2 my-4">
                                {genresList && genresList.length > 0 && genresList.map(genre => (
                                    <span 
                                        key={genre.id} 
                                        className="text-slate-200 border-2 rounded-lg px-4 py-1 cursor-pointer hover:border-blue-500 hover:text-blue-500"
                                    >
                                            {genre.name}
                                    </span>
                                ))}
                            </div>
                            <button className='border px-2 py-1  hover:border-blue-500 hover:text-blue-500 text-slate-200 w-80' onClick={handleClick}>Play Trailer</button>
                            <div className="text-slate-200 flex gap-2 w-[80%] flex-col mt-4">
                                <p className='text-xl text-slate-200 font-semibold'>Overview</p>
                                {movieList.overview}
                            </div>
                            <div>
                                
                                {isVideoPlayer ? 
                                    <VideoPlayer 
                                    videoKey={videoKey}
                                    setVideoPlayer={setVideoPlayer}
                                    /> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default MoviePage;
