import React from 'react'

const Footer = () => {
  return (
    <section className='h-40 sm:h-52 md:h-64 bg-dark flex flex-col justify-center items-center'>
      <div className="text-xs md:text-sm text-center py-2">
        This website is currently under development and is not yet finished.
      </div>
      <p className='text-xs md:text-sm lg:text-base'>Copyright ©2024 | Created by wrom404</p>
    </section>
  )
}

export default Footer