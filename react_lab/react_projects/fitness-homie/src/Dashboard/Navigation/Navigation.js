import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userLoggedOut} from '../../redux/actions';
import {loadFromLocalStorage} from '../../LocalStorage';
import './navigation.css';
import {ImProfile} from 'react-icons/im';
import {RiUserSettingsLine} from 'react-icons/ri';
import {BiLogOutCircle} from 'react-icons/bi';

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
                    <NavLink to={`/${loadFromLocalStorage('isLogged').isLogged[1][1]}`} className="link" activeClassName="link-active"><span><h2 className="mr-2" style={{display:"inline"}}>Dashboard</h2><ImProfile className="nav-icon"/></span></NavLink>
                </div>
                <div className="nav-item d-flex flex-column justify-content-center text-left">    
                    <NavLink to={`/settings`} className="link"   activeClassName="link-active"><span><h2 className="mr-2" style={{display:"inline"}}>Settings</h2><RiUserSettingsLine className="nav-icon"/></span></NavLink>
                </div>
            
               <div className="nav-item d-flex flex-column justify-content-center text-left"><Link onClick={logOut} className="link"><span><h2 className="mr-2" style={{display:"inline"}}>Log Out</h2><BiLogOutCircle className="nav-icon mb-2 ml-2"/></span></Link>
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