import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li className="waves-effect"><NavLink to='/decks'>Decks</NavLink></li>
            <li className="waves-effect"><NavLink to='/createcard'>New Card</NavLink></li>
            <li className="waves-effect"><NavLink to='/createdeck'>New Deck</NavLink></li>
            <li className="waves-effect"><a onClick={ props.signOut } href='/'>Log Out</a></li>
            <li className="waves-effect"><NavLink to='/' className='btn btn-floating pink lighten-1'>{ props.profile.initials }</NavLink></li>
        </ul>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks);