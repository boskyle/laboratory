import React from 'react';
import './userprofile.css';


const UserProfile = ({username,firstname,lastname,country,usernameSearched,gender,age,height,weight,activityLevel,calories}) => {

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
