import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userLoggedOut} from '../../redux/actions';
import {loadFromLocalStorage} from '../../LocalStorage';
import './navigation.css';
import {ImProfile} from 'react-icons/im';
import {RiUserSettingsLine} from 'react-icons/ri';
import {BiLogOutCircle,BiBook} from 'react-icons/bi';

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
                <div className="nav-item d-flex flex-column justify-content-center text-left">
                    <NavLink to={`/${loadFromLocalStorage('isLogged').isLogged[1][1]}`} className="link" activeClassName="link-active"><span><ImProfile className="nav-icon"/><h2 className="ml-3" style={{display:"inline"}}>Dashboard</h2></span></NavLink>
                </div>
                <div className="nav-item d-flex flex-column justify-content-center text-left">
                <NavLink to={`/logbook`} className="link"   activeClassName="link-active"><span><BiBook className="nav-icon"/><h2 className="ml-3" style={{display:"inline"}}>Logbook</h2></span></NavLink>
                </div>   
                <div className="nav-item d-flex flex-column justify-content-center text-left">    
                    <NavLink to={`/settings`} className="link"   activeClassName="link-active"><span><RiUserSettingsLine className="nav-icon"/><h2 className="ml-3" style={{display:"inline"}}>Settings</h2></span></NavLink>
                </div>
               <div className="nav-item d-flex flex-column justify-content-center text-left"><h3   onClick={logOut} className="link"><span><BiLogOutCircle className="nav-icon mb-2 ml-2"/><h2 className="ml-3" style={{display:"inline"}}>Log Out</h2></span></h3>
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