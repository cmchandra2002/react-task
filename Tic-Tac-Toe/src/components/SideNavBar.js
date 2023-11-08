import React from 'react';
import '../styles/SideNavBar.css'; // Import the CSS file
import { Outlet, Link } from 'react-router-dom';


function SideNav() {

    return (
        <>
            <nav className='side-nav'>
                <ul>
                    <li>
                        <Link to="/">About</Link>
                    </li>
                    <li>
                        <Link to="/game">Play</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/sinup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}
export default SideNav;