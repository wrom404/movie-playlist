import React, { useEffect } from 'react';
import { useRef } from 'react';

const VideoPlayer = ({ setVideoPlayer, videoKey}) => {
    const ref = useRef()
    const videoUrl = `https://www.youtube.com/embed/${videoKey}`; // Embed URL
    const handleClick = () => {
        setVideoPlayer(false);
    }

    useEffect(() => {
        const handleEvent = () => {
            document.addEventListener('click', e => {
                if(e.target.contains(ref.current)) {
                    setVideoPlayer(false)
                }
            })
        }
        handleEvent();
    }, [])

  return (
    <div className='fix w-full'>
        <div className="absolute inset-0 bg-black opacity-75"></div>

        <div className="absolute inset-0 flex justify-center items-center">
            <div ref={ref} className='w-[50%] h-[50%]' onClick={handleClick}> 
                <iframe
                    className='w-full h-full'
                    src={videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
      
    </div>
  );
};

export default VideoPlayer;

