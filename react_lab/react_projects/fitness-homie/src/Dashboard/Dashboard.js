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
    let location = useLocation(); 
  
    const isLogged = useSelector(state => state.isLogged);
    console.log(isLogged);

  
   console.log(loadFromLocalStorage().isLogged[0]);
   console.log(loadFromLocalStorage().isLogged[1]);
   
    if (loadFromLocalStorage().isLogged[0] === true) {
        return <Navigation/>
    } else
   return null;
  

}
export default Dashboard;