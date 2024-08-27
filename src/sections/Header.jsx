import React, { useEffect, useRef, useState } from 'react'
import { nav } from '../constants/NavLinks'
import Input from '../components/Input'
import Width from '../utils/Width';
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';



const Header = () => {
    const [isLogoVisible, setLogoVisible] = useState(true);
    const searchLogo = useRef(null);
    const [isDropdownVisible, setDropdownVIsible] = useState(true);
    const { width } = Width();
    const navigatePage = useNavigate()
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleClickOutside = e => {
            if (searchLogo.current && !searchLogo.current.contains(e.target)) {
                setLogoVisible(true);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        setLogoVisible(!isLogoVisible);
    };

    const showDropdownMenu = () => {
        setDropdownVIsible(!isDropdownVisible);
    };

    const handleClick = () => {
        navigatePage('/')
    }

    function handleNavigateQuery(query) {
        navigatePage(`/movie/find/${query}`);
    }

    return (
        <section className='flex justify-between gap-4 px-4 lg:px-24 py-4 bg-slate-900 fixed w-full z-50'>
            <h2 
                className="text-2xl text-blue-500 font-bold tracking-tighter cursor-pointer"
                onClick={handleClick}
                >
                Movie
            </h2>
            <div className='relative flex items-center' ref={searchLogo}>
                <Input 
                    onFocus={handleFocus}
                    isLogoVisible={isLogoVisible}
                    handleQuery={handleNavigateQuery}
                    query={query}
                    setQuery={setQuery}
                />
                {isLogoVisible && 
                    <div className='absolute left-1 top-1.5 text-2xl text-slate-100 font-semibold'>
                        <CiSearch />
                    </div>
                }
            </div>
            <nav className='relative'>
                {width >= 768 ? 
                    <ul className='flex items-center justify-center h-full gap-10 text-lg cursor-pointer font-semibold text-slate-100'>
                        
                            <div className="dropdown dropdown-end z-50">
                                <li 
                                    className='hover:text-blue-500 m-1'
                                    onClick={showDropdownMenu}
                                    tabIndex={0} 
                                    role="button" 
                                >
                                    Movies
                                </li>
                                <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-slate-950">
                                    <li><Link to={`/movies/${'popular'}`}>Popular</Link></li>
                                    <li><Link to={`/movies/${'top_rated'}`}>Top Rated</Link></li>
                                    <li><Link to={`/movies/${'upcoming'}`}>Upcoming</Link></li>
                                </ul>
                            </div>
                            <div className="dropdown dropdown-end z-50">
                                <li 
                                    className='hover:text-blue-500 m-1'
                                    onClick={showDropdownMenu}
                                    tabIndex={0} 
                                    role="button" 
                                >
                                    TV Shows
                                </li>
                                <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-slate-950">
                                    <li><Link to={`/tvshows/${'popular'}`}>Popular</Link></li>
                                    <li><Link to={`/tvshows/${'top_rated'}`}>Top Rated</Link></li>
                                </ul>
                            </div>
                        
                    </ul>
                :   <label htmlFor="my-drawer-4" className='drawer-button text-4xl text-slate-400'>
                        <RxHamburgerMenu />
                    </label>}
            </nav>  
        </section>
    );
}

export default Header;
