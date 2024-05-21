import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white p-4 rounded-sm shadow-md">
            <div className="container mx-auto flex justify-center items-center">
                <Link to="/" className="text-md md:text-xl font-bold hover:scale-105">User Management Application</Link>
            </div>
        </nav>
    );
};

export default Navbar;
