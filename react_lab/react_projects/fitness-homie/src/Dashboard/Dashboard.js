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
        pp_path: ''

    });

    const [userFitness,setUserFitness] = useState({
        age: '',
        heightCm: '',
        weightLbs: '',
        gender: '',
        activity: '',
        bmr:'',
        calories: '',
        calories_target: ''
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
                    console.log(data);
                    setUserInfo({
                        username: data.username,
                        firstname: data.firstname,
                        lastname: data.lastname,   
                        pp_path: data.profile_picture_path
                    })
                }
            }
        })



        // LoadProfilePicture(dashUid).then(data => {
        //     if (data !== false) {
        //         console.log(data);
        //     }
        // })
        
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
                        calories_target: data.calories_target
                    })
                }
            }
        })
         // prevents memory leak, make sure that it is mounted first
        return () => {isMounted = false; isMounted2 = false;} 
           
         
    },[dashUid])

    const [loggedUid,setLoggedUid] = useState(undefined);

    useEffect( () => {
        let isMounted = true;
        // wait to fetch logged in Object (initially undefined)
        if (loadFromLocalStorage('isLogged').isLogged[1] !== undefined)
        {
            if (isMounted === true)
            {
                setLoggedUid(loadFromLocalStorage('isLogged').isLogged[1][0]);
                
            }
        }
        return () => {isMounted = false;}
        
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
                        profile_picture={userInfo.pp_path}
                        // fitness Information
                        gender={userFitness.gender}
                        age={userFitness.age}
                        height={userFitness.height}
                        weight={userFitness.weight}
                        activityLevel={userFitness.activity}
                        calories={userFitness.calories}
                        caloriesTarget={userFitness.calories_target}
                        />
                </div>   
            </div>
            );


  
}
export default Dashboard;