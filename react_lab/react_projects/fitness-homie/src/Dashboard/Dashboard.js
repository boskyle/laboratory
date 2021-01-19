import React from 'react';
import {useState,useEffect} from 'react';
import {Redirect,useHistory,useParams} from "react-router-dom";
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadBasicInfo,LoadFitnessInfo,getUidFromUsername} from './db-endpoints/loadProfile';
import  UserProfile from './UserProfile/UserProfile';
import "./dashboard.css";
import SearchBox from './SearchBox/SearchBox';



function Dashboard() {
    // var to access passed variable from Login.js
    const history = useHistory();
    const {username} = useParams();

    
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
       
        console.log(loadFromLocalStorage('isLogged').isLogged[1]);
        console.log(username);
        getUidFromUsername(username).then(uid => {
            console.log(uid)
            let isCancelled = false;

            LoadBasicInfo(uid)
            .then(data => {
                // only
                if (data === false && loadFromLocalStorage('isLogged').isLogged[0] === true) {
                    // history.push({
                    //     pathname: '/login/setup',
                    //     isDataGiven: data
                    // })
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
    
    
            LoadFitnessInfo(uid)
            .then(data => {
                // only
                if (data === false && loadFromLocalStorage('isLogged').isLogged[0] === true) {
                    history.push({
                        // pathname: '/login/setup',
                        // isDataGiven: data
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

        });
    },[])

   
    console.log(userInfo);
     
            return  (
                // main component (gridbox and will be injected)
                <div className="containerFluid">
                    <div className="row">
                        <div className="col-2    col-sm-2 col-md-3   text-center">Navigation</div>
                        <div className="col-10   col-sm-8 col-md-7 " >
                            <UserProfile />                  
                        </div>
                        <div className="col-sm-2 col-md-2 d-none d-sm-block text-center">Search</div>
                    </div>
                </div>
            );
        


   
  
}
export default Dashboard;