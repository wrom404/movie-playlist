import React from 'react';

const Card = ({ m, imgUrl, title, date }) => {
  return (
    <div className='w-24 md:w-32 md:h-64 rounded-md'>
      {console.log(m)}
      <div className='w-full overflow-hidden'>
        <img src={imgUrl} alt={title} className='w-full object-cover rounded-md hover:scale-105 transition-transform duration-300 ease-in-out' />
      </div>
      <p className="text-md text-slate-100 font-semibold leading-4">
        {title}
      </p>
      <p className="text-xs text-slate-100 mt-2">
        {date}
      </p>
    </div>
  );
}

export default Card;
