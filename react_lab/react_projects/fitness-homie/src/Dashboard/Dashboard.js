import React from 'react';
import {useState,useEffect} from 'react';
import { Redirect, useLocation } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import Navigation from '../Navigation';
import {useSelector} from 'react-redux';
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadBasicInfo} from './db-endpoints/loadProfile';





function Dashboard() {
    // var to access passed variable from Login.js
    
  
    const isLogged = useSelector(state => state.isLogged);
    
    const [userInfo, setUserInfo] = useState({
        user_id: loadFromLocalStorage("isLogged").isLogged[1],
        username: '',
        firstname: '',
        lastname: '',
        address: '',
        country: '',
    });

    useEffect( () => {
        LoadBasicInfo(userInfo.user_id)
        .then(data => {
            setUserInfo({
                user_id:loadFromLocalStorage("isLogged").isLogged[1],
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                country: data.country
            })
        })

       
    },[])
    
    console.log(userInfo);

   
   
    if (loadFromLocalStorage("isLogged").isLogged[0] === true) {
        return <div className="container-fluid text-center">
        <Navigation/>
        <h2>{userInfo.firstname}</h2>
    </div> 
    } else
   return null;
  

}
export default Dashboard;