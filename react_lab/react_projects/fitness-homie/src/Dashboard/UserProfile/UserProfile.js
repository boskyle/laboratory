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
                        <div>
                        <span className="userName">{username}</span>
                        <span className="name">{firstname +" "+lastname}</span>
                        </div>
                    </div>


                    <div className="user-profile-item">
                        <h3 className="m-1">JOURNAL</h3>
                        <div className="journal-items-container">
                            <div className="journal-item"><h4>STATS</h4></div>
                            <div className="journal-item"><h4>PROGRESS</h4></div>
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
