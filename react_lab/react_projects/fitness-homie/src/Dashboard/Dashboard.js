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
  
    const [info, setInfo] = useState();

    // comment from refactor
    const isLogged = useSelector(state => state.isLogged);

   console.log(loadFromLocalStorage().isLogged);

    if (loadFromLocalStorage().isLogged === true) {
        return <Navigation/>
    }
   return null;
  

}
export default Dashboard;