import React from 'react';
import { Link } from 'react-router-dom';

const NavigationComponent: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/pages/about">About</Link>
                </li>
                <li>
                    <Link to="/pages/contacts">Contacts</Link>
                </li>
                <li>
                    <Link to="/pages/heihachi">Heihachi</Link>
                </li>
                <li>
                    <Link to="/pages/jin">Jin</Link>
                </li>
                <li>
                    <Link to="/pages/kazuya">Kazuya</Link>
                </li>
                <li>
                    <Link to="/pages/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationComponent;
