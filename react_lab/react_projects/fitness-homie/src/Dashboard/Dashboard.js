import React from 'react';
import {useState,useEffect} from 'react';
import { Redirect, useLocation } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import Navigation from '../Navigation';
import {useSelector} from 'react-redux';
import {loadFromLocalStorage,saveToLocalStorage} from '../LocalStorage';
import {LoadBasicInfo} from './db-endpoints/loadProfile';





function Dashboard() {
    // var to access passed variable from Login.js
    
  
    const isLogged = useSelector(state => state.isLogged);
    const history = useHistory();
    
    const [userInfo, setUserInfo] = useState({
        user_id: loadFromLocalStorage("isLogged").isLogged[1],
        username: '',
        firstname: '',
        lastname: '',
        address: '',
        country: '',
    });

    useEffect( () => {
        // this async function returns false when userInfo hasnt ben filled yet
        LoadBasicInfo(userInfo.user_id)
        .then(data => {
            if (data === false) {
                history.push({
                    pathname: '/login/setup',
                    isDataGiven: data
                })
            } else {            
                setUserInfo({
                    user_id:loadFromLocalStorage("isLogged").isLogged[1],
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    address: data.address,
                    country: data.country
                })
            }
       
        })
        // redirect to /login/setup

        
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