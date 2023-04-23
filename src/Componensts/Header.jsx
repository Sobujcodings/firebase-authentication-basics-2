import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <div>
            <nav className='nav '>
                <Link to="/">Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                <Link to='/register-RBS'>RegisterRBS</Link>

            </nav>
        </div>
    );
};

// RBS -- React Bootstrap

export default Header;