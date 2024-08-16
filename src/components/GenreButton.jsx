const GenreButton = ({ genre, isIdActive, handleClick}) => {

    return <button 
                className={`${isIdActive ? 'bg-slate-900 text-blue-500' : 'bg-slightDark text-slate-200'} max-md:px-2 max-md:py-1 md:px-4 md:py-2 rounded-lg hover:text-blue-500`}
                onClick={() => handleClick()}
            >
                {genre}
            </button>;
}

export default GenreButton;