import React from 'react';
import {useState,useEffect} from 'react';
import {getUidFromUsername} from '../db-endpoints/loadProfile';
import './userprofile.css';
import Popup from './Popup/Popup';

const UserProfile = ({userid,username,firstname,lastname,profile_picture,usernameSearched,gender,age,height,weight,activityLevel,calories,caloriesTarget}) => {

        // console.log(loadFromLocalStorage('isLogged').isLogged[1]);
      


    let edit,edit2,edit3;



    const netLostGainCalories = (burning,consuming,display) => {

        let caloriesPerPound = 3500;

        switch(display) {
            case 'daily':
            if (Math.sign(burning - consuming) === 1) {
                return   "Loosing: "+((burning - consuming) / caloriesPerPound).toFixed(4)+" lbs per day.";
            }
            else if (Math.sign(burning-consuming) === -1) {
                return   "Gaining: "+(Math.abs((burning - consuming) / caloriesPerPound).toFixed(4))+" lbs per day.";           
            }
            else {return "not loosing/gaining  weight."}
            case 'weekly':

            if (Math.sign(burning - consuming) === 1) {
                return  "Loosing: "+((burning - consuming) / caloriesPerPound).toFixed(4) * 7 +" lbs per week.";
            }
            else if (Math.sign(burning-consuming) === -1) {
                return  "Gaining: "+(Math.abs((burning - consuming) / caloriesPerPound).toFixed(4)) * 7+" lbs per week.";
            }
            else {return "Not loosing/gaining  weight."}
           
        }
    }



   
    const [suid,setSuid] = useState(undefined);

    useEffect(() => {
        console.log("userprofile mounted");
    },[])

    useEffect(() => {
        return () => {console.log("userprofile unmounted")}
    },[])

    useEffect( () => {
        let isMounted = true;
        getUidFromUsername(username).then(searchedUid => {
            if(isMounted)
            setSuid(searchedUid);
        },[username])
        return () => {isMounted = false};  
    },[username])
 

            if (userid === suid)
            {
                edit =  <Popup identity="userProfile" userId ={userid} username={username} firstname={firstname} lastname={lastname} gender={gender} age={age} height={height} weight={weight} activityLevel={activityLevel}/>
                edit2 = <Popup identity="userStats" userId ={userid} username={username} firstname={firstname} lastname={lastname} gender={gender} age={age} height={height} weight={weight} activityLevel={activityLevel} caloriesTarget={caloriesTarget}/>
                edit3 = <Popup identity="userTargetCalories" userId ={userid} username={username} firstname={firstname} lastname={lastname} gender={gender} age={age} height={height} weight={weight} activityLevel={activityLevel}/>
            }
            
            // console.log(selector);
            // console.log("loggedIn: "+userid);
            // console.log("current: "+suid);

 
            console.log(netLostGainCalories(calories,caloriesTarget,'weekly'));


        // validate that username exists
        if(username !== "")
        {
            
            return (
                <div className="user-profile-container">
                    <div className="user-profile-item">
                    <h2 className="">PROFILE {edit}
                    
                    
                    
                    
                    </h2>
                        <div>
                        <span className="userName">{username}</span>
                        <span className="name">{firstname +" "+lastname}</span>
                        {profile_picture}
                        </div>
                    </div>


                    <div className="user-profile-item">
                        <h3 className="m-1">JOURNAL {edit2}</h3>
                        <div className="journal-items-container">
                            <div className="journal-item"><h4>STATS</h4>
                                <ul>
                                    <li>gender: <span>{gender}</span></li>
                                    <li>age: <span>{age}</span></li>
                                    <li>height: <span>{height} cm</span></li>
                                    <li>weight: <span>{weight} lbs</span></li>
                                </ul>
                            </div>
                            <div className="journal-item"><h4>PROGRESS</h4>
                                <ul>
                                   <li>Activity Level: <span>{activityLevel}</span></li>
                                   <li>Daily Burn: <span>{calories} Calories</span></li>
                                   <li>Daily Calories:<span>{caloriesTarget} Calories</span></li>
                                    <li className="lossGainCalories">{netLostGainCalories(calories,caloriesTarget,'weekly')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>




                    <div className="user-profile-item"><h3>WORKOUT</h3> <ul>weekly workout playlist (coming to v1.1)</ul></div>      
                </div>  
            );
        } else {
            return (<div className="user-profile-container">
            <div className="user-profile-item">Profile
            <h3>@{usernameSearched} doesnt exist..</h3>
            
            </div>
            <div className="user-profile-item">Journal</div>
            <div className="user-profile-item">Workout</div>
            </div>  
            );
        }

   
}

export default UserProfile;
