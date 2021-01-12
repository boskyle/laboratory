import React from 'react';
import {useState,useEffect} from 'react';
import { Redirect, useLocation } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import Navigation from '../Navigation';
import {useSelector,useDispatch} from 'react-redux';
import {LoadBasicInfo} from './db-endpoints/loadProfile';



const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('isLogged');
            if (data === null) return undefined;
            return JSON.parse(data);
    } catch (e) {console.log(e)}
}

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