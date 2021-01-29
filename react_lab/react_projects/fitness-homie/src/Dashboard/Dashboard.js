import React from 'react';
import {useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadBasicInfo,LoadFitnessInfo,getUidFromUsername} from './db-endpoints/loadProfile';
import '../assets/fonts/index.css';
import "./dashboard.css";
import Navigation from './Navigation/Navigation';
import DashboardContainer from './DashboardContainer';

function Dashboard() {

    // const history = useHistory();
    const {urlParam} = useParams();


    const [userInfo, setUserInfo] = useState({
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

    const [dashUid,setDashUid] = useState(undefined);
    useEffect(() => {
        let isMounted = true;

        getUidFromUsername(urlParam).then(uid => {
            if(isMounted === true) {
                setDashUid(uid);     
            }
        })  

        return () => {isMounted = false;}
    },[urlParam])
    
   
    useEffect( () => {
       
        let isMounted = true;
        let isMounted2 = true;
    //    comment added
        LoadBasicInfo(dashUid).then(data => {
            if (isMounted === true) {
                if (data !== false) {
                    setUserInfo({
                        username: data.username,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        country: data.country
                    })
                }
            }
        })
        
        LoadFitnessInfo(dashUid).then(data => {
            if (isMounted2 === true) {
                if (data !== false) {
                    setUserFitness({
                        gender: data.gender,
                        age: data.age,
                        height: data.height_cm,
                        weight: data.weight_lbs,
                        activity: data.activity_level,
                        calories: data.calories,
                        
                    })
                }
            }
        })
         // prevents memory leak, make sure that it is mounted first
        return () => {isMounted = false; isMounted2 = false;} 
           
         
    },[dashUid])

    const [loggedUid,setLoggedUid] = useState(undefined);

    useEffect( () => {
           
        // wait to fetch logged in Object (initially undefined)
        if (loadFromLocalStorage('isLogged').isLogged[1] !== undefined)
        {
        setLoggedUid(loadFromLocalStorage('isLogged').isLogged[1][0]);
        }
        
},[loadFromLocalStorage('isLogged').isLogged[1]])


useEffect( () => {
    console.log("dashboard mounted");
},[])

useEffect( () => {
    return () => {console.log("dashboard unmounted");}
},[])



  


        return (
            <div className="containerFluid">
                <div className="row">
                <div className="col-3 col-sm-2 col-md-2 d-flex flex-column justify-content-center">
                    <Navigation is_logged={loadFromLocalStorage('isLogged').isLogged[0]}/>
                </div>
                <DashboardContainer 
                        
                        urlParam={urlParam}    
                        uid={loggedUid}
                        username={userInfo.username}
                        firstname={userInfo.firstname}
                        lastname={userInfo.lastname}
                        country={userInfo.country}
                        // fitness Information
                        gender={userFitness.gender}
                        age={userFitness.age}
                        height={userFitness.height}
                        weight={userFitness.weight}
                        activityLevel={userFitness.activity}
                        calories={userFitness.calories}
                        />
                </div>   
            </div>
            );


  
}
export default Dashboard;