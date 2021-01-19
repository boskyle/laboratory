import React from 'react';
import {useState,useEffect} from 'react';
import {Redirect,useHistory,useParams} from "react-router-dom";
import Navigation from '../Navigation';
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadBasicInfo,LoadFitnessInfo,getUidFromUsername} from './db-endpoints/loadProfile';
import '../assets/fonts/index.css';
import  UserProfile from './UserProfile';
import './dashboard.css';
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

        // Viewers only
    
            return  (
                <div className="container-fluid" style={{position:'relative'}}>
                    <SearchBox placeholder="Enter username.."/>
                <Navigation/>
                <UserProfile 
                username={userInfo.username} 
                firstname={userInfo.firstname}
                lastname={userInfo.lastname}
                country={userInfo.country}
                userCalories={userFitness.calories}
                />
                </div> 
            );
        


   
  
}
export default Dashboard;