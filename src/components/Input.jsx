import React from 'react'

const Input = ({onFocus, isLogoVisible}) => {
  return (
    <>
        <input 
          onFocus={onFocus} 
          type="text"
          className={`bg-slate-900 rounded-lg py-1 px-8 outline-none w-full sm:w-60 md:w-72 box-border ${isLogoVisible ? '' : 'outline outline-blue-500' }`}
          placeholder='Search...'
        />
    </>
  )
}

export default Input