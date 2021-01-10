import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import './Burger/burger.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import {useSelector,useDispatch} from 'react-redux';
import {userLoggedOut} from './redux/actions';

// remove uid from superglobal associative araray local.storage ~~ and redirect to login page


const Navigation = (props) => {
    
    const dispatch = useDispatch();

    let history = useHistory();
    
    const logOut = () => {
        dispatch(userLoggedOut());
        history.push("/login");
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        
       console.log("push");
    }
    
    return (
        <div id="outer-container">
            <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } className="text-left">
                <Link to="/feed" style={{textDecoration:"none", color:"black"}}><span>Feed</span></Link>
                <Link to="/dashboard" style={{textDecoration:"none", color:"black"}}><span>Profile</span></Link>
                <Link to="/journal" style={{textDecoration:"none", color:"black"}}><span>Journal</span></Link>
                <button onClick={logOut}>Log out</button>
            </Menu>
                
        </div>
    );
}






export default Navigation;