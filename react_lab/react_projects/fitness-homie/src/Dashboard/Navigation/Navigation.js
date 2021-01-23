import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {userLoggedOut} from '../../redux/actions';
import {LoadBasicInfo} from '../db-endpoints/loadProfile';
import {loadFromLocalStorage} from '../../LocalStorage';
import './navigation.css';





const Navigation = ({is_logged}) => {
 
    const dispatch = useDispatch();
    const history = useHistory();
    const logOut = () => {
        // remove uid from superglobal associative araray local.storage ~~ and redirect to login page
        dispatch(userLoggedOut());
        history.push("/");
    }

    if (is_logged === true)
    {
        return (
        <div className="navigation-container">
            <button onClick={logOut}>Log out</button>
        </div>
        )
    } else {
        return (
            <h3>Haven't Logged In ? / Sign up ?</h3>
        );
    }
    



}






export default Navigation;