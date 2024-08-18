import React, { useEffect, useRef, useState } from 'react'
import { nav } from '../constants/NavLinks'
import Input from '../components/Input'
import Width from '../utils/Width';
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";


const Header = () => {
    const [isLogoVisible, setLogoVisible] = useState(true);
    const searchLogo = useRef(null);
    const [isDropdownVisible, setDropdownVIsible] = useState(true);
    const { width } = Width();

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

    return (
        <div className='flex justify-between gap-4 px-4 lg:px-24 py-4 bg-slate-900 fixed w-full z-50'>
            <h2 className="text-2xl text-blue-500 font-bold tracking-tighter cursor-pointer">
                Movie
            </h2>
            <div className='relative flex items-center' ref={searchLogo}>
                <Input 
                    onFocus={handleFocus}
                    isLogoVisible={isLogoVisible}
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
                        {nav.map(nav => (
                            <div className="dropdown dropdown-end z-50" key={nav.navName}>
                                <li 
                                    className='hover:text-blue-500 m-1'
                                    onClick={showDropdownMenu}
                                    tabIndex={0} 
                                    role="button" 
                                >
                                    {nav.navName}
                                </li>
                                <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-slate-950">
                                    <li><a>Popular</a></li>
                                    <li><a>Top Rated</a></li>
                                    <li><a>Upcoming</a></li>
                                </ul>
                            </div>
                        ))}
                    </ul>
                :   <label htmlFor="my-drawer-4" className='drawer-button text-4xl text-slate-400'>
                        <RxHamburgerMenu />
                    </label>}
            </nav>  
        </div>
    );
}

export default Header;
