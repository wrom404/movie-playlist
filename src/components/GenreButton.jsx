const GenreButton = ({ genre }) => {
    return <button className="text-slate-200 bg-slightDark max-md:px-2 max-md:py-1 md:px-4 md:py-2 rounded-lg hover:text-blue-500">
                {genre}
            </button>;
}

export default GenreButton;