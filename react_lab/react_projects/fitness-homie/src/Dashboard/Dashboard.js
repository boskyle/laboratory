import React from 'react';
import {useState,useEffect} from 'react';
import { Redirect} from "react-router-dom";
import {useHistory} from 'react-router-dom';
import Navigation from '../Navigation';
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadBasicInfo} from './db-endpoints/loadProfile';





function Dashboard() {
    // var to access passed variable from Login.js
    
  

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
            // only
            if (data === false && loadFromLocalStorage('isLogged').isLogged[0] === true) {
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

        
    },[history,userInfo.user_id])



    console.log(userInfo);
 

   
   
    if (loadFromLocalStorage("isLogged").isLogged[0] === true) {
            
        return <div className="container-fluid text-center">
        <Navigation/>
        <h2>{userInfo.firstname}</h2>
    </div> 
    } else
   return <Redirect to="/" />;
  

}
export default Dashboard;