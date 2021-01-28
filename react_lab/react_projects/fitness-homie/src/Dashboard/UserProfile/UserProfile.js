import React from 'react';
import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getUidFromUsername} from '../db-endpoints/loadProfile';
import './userprofile.css';
import Popup from './Popup/Popup';

const UserProfile = ({userid,username,firstname,lastname,country,usernameSearched,gender,age,height,weight,activityLevel,calories}) => {

        // console.log(loadFromLocalStorage('isLogged').isLogged[1]);
      
    console.log(activityLevel);

    let edit,edit2;
   
    const [suid,setSuid] = useState(undefined);

    const matched = (loggedUserName,currentUserName) => {
        console.log(loggedUserName + ":"+ currentUserName);
        if (loggedUserName === currentUserName)
        {
            return true;
        } else return false;
    }

    const selector = useSelector(state => state.isLogged);

    useEffect( () => {
        let isMounted = true;
        
        getUidFromUsername(username).then(searchedUid => {
            if(isMounted)
            setSuid(searchedUid);
        })


        return () => {isMounted = false};  
    },[username])
 

            if (userid === suid)
            {
                edit =  <Popup identity="userProfile" userId ={userid} username={username} firstname={firstname} lastname={lastname} gender={gender} age={age} height={height} weight={weight} activityLevel={activityLevel}/>
                edit2 = <Popup identity="userStats" userId ={userid} username={username} firstname={firstname} lastname={lastname} gender={gender} age={age} height={height} weight={weight} activityLevel={activityLevel}/>
            }
            
            console.log(selector);
            console.log("loggedIn: "+userid);
            console.log("current: "+suid);

 



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
                                   <li>Calories: <span>{calories}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>




                    <div className="user-profile-item"><h3>WORKOUT</h3></div>      
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
