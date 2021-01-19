import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import './Burger/burger.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {userLoggedOut} from './redux/actions';
import {loadFromLocalStorage} from './LocalStorage';
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

    const [basicInfo,setBasic] = useState("");
    useEffect( () => {

        LoadBasicInfo(loadFromLocalStorage('isLogged').isLogged[1]).then( data => {
            setBasic(data);
        })
    
    },[])

    useEffect(() => {

        return () => {
            console.log("cleaned up");
        }
    })

    console.log(basicInfo);
    // this is saying if the user is not logged in that means dont show navbar
    if (basicInfo.userlogin_id !== undefined)
    {
        return (
            <div id="outer-container">
                <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } className="text-left">
                    
                    <Link to="/feed" style={{textDecoration:"none", color:"black"}}><span>Feed</span></Link>
                    <Link to="/temp" style={{textDecoration:"none", color:"black"}}><span>{basicInfo.username}</span></Link>
                    <Link to="/journal" style={{textDecoration:"none", color:"black"}}><span>Journal</span></Link>
                    <button onClick={logOut}>Log out</button>
                </Menu>
                    
            </div>
        );
    } else 
    
    // we can add a link to make then register / login here
    {return null;}
}






export default Navigation;