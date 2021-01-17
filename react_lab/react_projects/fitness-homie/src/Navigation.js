import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import './Burger/burger.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {userLoggedOut} from './redux/actions';
import {LoadBasicInfo} from './Dashboard/db-endpoints/loadProfile';
// remove uid from superglobal associative araray local.storage ~~ and redirect to login page


const Navigation = (props) => {
    
    const dispatch = useDispatch();

    let history = useHistory();
    
    const logOut = () => {
        dispatch(userLoggedOut());
        history.push("/");
        // localStorage.removeItem('userId');
        // localStorage.removeItem('userName');
    }

    const [username,setUsername] = useState("");
    useEffect( () => {

        LoadBasicInfo(props.userId).then( data => {
            setUsername(data.username);
        })
    
    },[])

    console.log(username);


    const sendToProfile = () => {
        history.push(`/${username}`);
    }
    
    
    return (
        <div id="outer-container">
            <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } className="text-left">
                <Link to="/feed" style={{textDecoration:"none", color:"black"}}><span>Feed</span></Link>
                <Link to={`/${username}`} style={{textDecoration:"none", color:"black"}} onClick={sendToProfile}><span>Profile</span></Link>
                <Link to="/journal" style={{textDecoration:"none", color:"black"}}><span>Journal</span></Link>
                <button onClick={logOut}>Log out</button>
            </Menu>
                
        </div>
    );
}






export default Navigation;