import React from 'react'

const Input = ({ onFocus, isLogoVisible, handleQuery, query, setQuery }) => {
  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleQuery(query)
    }
  }

  return (
    <>
        <input 
          onFocus={onFocus} 
          type="text"
          className={`bg-slate-900 rounded-lg py-1 px-8 outline-none w-full sm:w-60 md:w-72 box-border text-slate-200 ${isLogoVisible ? '' : 'outline outline-blue-500' }`}
          placeholder='Search...'
          onKeyDown={handleKeyDown}
          onChange={e => setQuery(e.target.value)}
        />
    </>
  )
}

export default Input