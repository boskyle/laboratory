import React from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {userLoggedOut} from '../../redux/actions';
import {LoadBasicInfo} from '../db-endpoints/loadProfile';
import {loadFromLocalStorage} from '../../LocalStorage';
import './navigation.css';
import { FaInfoCircle } from 'react-icons/fa';





const Navigation = ({is_logged,is_loggedId}) => {
 
    const dispatch = useDispatch();
    const history = useHistory();
    const logOut = () => {
        // remove uid from superglobal associative araray local.storage ~~ and redirect to login page
        dispatch(userLoggedOut());
        history.push("/");
    }


    const [navUsername,setNavUsername] = useState(undefined);

    useEffect(() => {
        LoadBasicInfo(is_loggedId).then(data => {
            console.log(data.username);
            setNavUsername(data.username);
        })
    },[])

    if (is_logged === true)
    {
        return (
        <div className="navigation-container">
                <div className="navigation-item">
                    <Link className="link" to={`/${navUsername}`}><h2>Dashboard</h2></Link>
                    <h2>Settings</h2>
                </div>

                <div className="navigation-item" id="navigation-out">
                <Link className="link" onClick={logOut}><h2>Log Out</h2></Link>
                </div>
        </div>
        )
    } else {
        return (
            <h3>Haven't Logged In ? / Sign up ?</h3>
        );
    }
    



}






export default Navigation;