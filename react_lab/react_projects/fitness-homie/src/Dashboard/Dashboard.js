import React from 'react';
import {useState,useEffect} from 'react';
import { Redirect, useLocation } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import Navigation from '../Navigation';
import {useSelector,useDispatch} from 'react-redux';


import {LoadBasicInfo} from './db-endpoints/loadProfile';


function Dashboard() {
    // var to access passed variable from Login.js
    let location = useLocation(); 
    // store location.state.user_id to session variable
    const [info, setInfo] = useState();
    /*  Only on mount ~=> catch the first user_id from log-in, store it into cache, 
        use the cache variable stored into as parameter (casted as int b.c cache stored it as a string) to  
        LoadBasicInfo (async ~ data fetch from DB)
        and store data returned by api (php) to info state.

        OTHEREWISE
        if uid === <empty string> means that the user id was never caught, hence the user never lgged in
        resend them to the log in page.
    */

    const isLogged = useSelector(state => state.isLogged);
    
    // comment from refactor
    console.log(isLogged);
    
    useEffect(() => {
      
    try {
        localStorage.setItem('userId',location.state.user_id);
       
    } catch {}                      
     LoadBasicInfo(parseInt(localStorage.getItem('userId')))
     .then(data => {setInfo(data);})
    },[location])
 
   

// *** if user info.username is <empty string> send them to a 'getting started form' ***
// wait for object to be filled with data that is fetched within some TIME.



   if (info !== undefined) {
     
        // no info about user yet (form hasnt filled yet)
      if(info === false) {
       return (
        <Redirect to = "/login/setup"/>
       );
         
        
      } else {
        //   when userInfo is valid, send
        localStorage.setItem('userName',info.username);
        return (
            <div className="container-fluid text-center">
                <Navigation/>
                <h2>{info.firstname}</h2>
            </div> 
    );
      }
   
} else { return (<h2>Error with fetching logged in user's data from server.. Are you logged in ?!</h2>)}

}
export default Dashboard;