import React from 'react';
import {useState,useEffect} from 'react';
import { Redirect} from "react-router-dom";
import {useHistory} from 'react-router-dom';
import Navigation from '../Navigation';
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadBasicInfo,LoadFitnessInfo} from './db-endpoints/loadProfile';
import '../assets/fonts/index.css';
import './dashboard.css';





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

    const [userFitness,setUserFitness] = useState({
        age: '',
        heightCm: '',
        weightLbs: '',
        gender: '',
        activity: '',
        bmr:'',
        calories: ''
    });

 

    
    useEffect( () => {
        // this async function returns false when userInfo hasnt ben filled yet

        let isCancelled = false;

        LoadBasicInfo(userInfo.user_id)
        .then(data => {
            // only
            if (data === false && loadFromLocalStorage('isLogged').isLogged[0] === true) {
                history.push({
                    pathname: '/login/setup',
                    isDataGiven: data
                })
            } else {     
                if (!isCancelled)     
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


        LoadFitnessInfo(userInfo.user_id)
        .then(data => {
            // only
            if (data === false && loadFromLocalStorage('isLogged').isLogged[0] === true) {
                history.push({
                    pathname: '/login/setup',
                    isDataGiven: data
                })
            } else {     
                if (!isCancelled)     
                setUserFitness({
                    age: data.age,
                    heightCm: data.height_cm,
                    weightLbs: data.weight_lbs,
                    gender: data.gender,
                    activity: data.activity_level,
                    bmr: data.BMR,
                    calories: data.calories
                })
            }
       
        })

        // prevents memory leak, make sure that it is mounted first
        return () => {
            isCancelled = true;
        }    
    },[])



 

   
   
    if (loadFromLocalStorage("isLogged").isLogged[0] === true) {
            
        return  <div className="container-fluid">
                    <Navigation/>
                        <div className="container-flex">
                            <div className="flex-item" id="flex-item-profile">
                                <h2>PROFILE</h2>
                            </div>

                            <div className="flex-item" id="flex-item-journal">
                                <h2>JOURNAL</h2>
                            </div>

                            <div className="flex-item" id="flex-item-workout">
                                <h2>WORKOUT</h2>
                            </div>

                        </div>
                </div> 
    } else
   return <Redirect to="/" />;
  

}
export default Dashboard;