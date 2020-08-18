import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul className="right">
            {/*<li><NavLink to='/signup'>Sign Up</NavLink></li>*/}
            <li className="waves-effect"><NavLink to='/decks'>Decks</NavLink></li>
            <li className="waves-effect"><NavLink to='/signin'>Log In</NavLink></li>
        </ul>
    )
};

export default SignedOutLinks;