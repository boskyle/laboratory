import React from 'react';
import {useState,useEffect} from 'react';
import {getUidFromUsername} from '../db-endpoints/loadProfile';
import './userprofile.css';
import Popup from './Popup/Popup';
import defaultPicture from '../../assets//images/defaulProfilePicture.png';






const UserProfile = ({userid,username,firstname,lastname,profile_picture,usernameSearched,gender,age,height,weight,activityLevel,calories,caloriesTarget,setUserInfo}) => {

        // console.log(loadFromLocalStorage('isLogged').isLogged[1]);
      
   
 

    let edit,edit2;

    // const profilePictureImg = `http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/assets/user_assets/${username}/images/${username}.jpeg`;
    const [picture,setPicture] = useState(defaultPicture);



    const netLostGainCalories = (burning,consuming,display) => {

        let caloriesPerPound = 3500;

        switch(display) {
            case 'daily':
            if (Math.sign(burning - consuming) === 1) {
                return   "Loosing: "+Math.round( (((burning - consuming) / caloriesPerPound)) * 1e2 ) / 1e2+" lbs per day.";
            }
            else if (Math.sign(burning-consuming) === -1) {
                return   "Gaining: "+Math.round( Math.abs(((burning - consuming) / caloriesPerPound)) * 1e2 ) / 1e2+" lbs per day.";           
            }
            else {return "not loosing/gaining  weight."}
            case 'weekly':

            if (Math.sign(burning - consuming) === 1) {
                return  "Loosing: "+Math.round( (((burning - consuming) / caloriesPerPound) * 7) * 1e2 ) / 1e2+" lbs per week.";
            }
            else if (Math.sign(burning-consuming) === -1) {
                return  "Gaining: "+Math.round( Math.abs(((burning - consuming) / caloriesPerPound) * 7) * 1e2 ) / 1e2+" lbs per week.";
            }
            else {return "Not loosing/gaining  weight."}
           
        }
    }



   
    const [suid,setSuid] = useState(undefined);
  

    useEffect(() => {
        console.log("userprofile mounted");
 
    },[])

    useEffect( () => {
        console.log(profile_picture);
        if (profile_picture !== null) {
            setPicture(profile_picture);
        } else {setPicture(defaultPicture)}
    },[profile_picture])

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
                edit =  <Popup identity="userProfile" userId ={userid} username={username} firstname={firstname} lastname={lastname} gender={gender} age={age} height={height} weight={weight} activityLevel={activityLevel} profile_picture={profile_picture} setUserInfo={setUserInfo}/>
                edit2 = <Popup identity="userStats" userId ={userid} username={username} firstname={firstname} lastname={lastname} gender={gender} age={age} height={height} weight={weight} activityLevel={activityLevel} caloriesTarget={caloriesTarget}setUserInfo={setUserInfo}/>
           
            }
            
            // console.log(selector);
            // console.log("loggedIn: "+userid);
            // console.log("current: "+suid);

 
            // console.log(netLostGainCalories(calories,caloriesTarget,'weekly'));


        // validate that username exists
        if(username !== "")
        {
            
            return (
                <div className="user-profile-container">
                    <div className="user-profile-item d-flex flex-column">
                    <h2 className="">PROFILE {edit}
                
                    
                    
                    
                    
                    </h2>
                        <img src={picture}  alt="" className="profilePicture mx-auto"/>
                        <div className="mx-auto text-center mt-3">
                        <span className="userName">{username}</span>
                        <span className="name">{firstname +" "+lastname}</span>
                     
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
