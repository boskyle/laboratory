import React from 'react';
import './userprofile.css';


const UserProfile = ({username,firstname,lastname,country,usernameSearched}) => {

        // validate that username exists
        if(username !== "")
        {
            return (
                <div className="user-profile-container">
                    <div className="user-profile-item">
                    <h2>PROFILE</h2>
                    <h3>{firstname +" "+lastname+" "}({username})</h3>
                    
                    </div>


                    <div className="user-profile-item">Journal</div>
                    <div className="user-profile-item">Workout</div>
              
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
