import React from 'react';
import Modal from 'react-modal';
import {EditForm} from './ProfileEdit/EditForm';

import './popup.css';


const Popup = (props) => {

    
    Modal.setAppElement('.App');


   

        if (props.identity === "userProfile")
        {

            return (
                <EditForm identity={props.identity} username={props.username} firstname={props.firstname} lastname={props.lastname} userId={props.userId} gender={props.gender} age={props.age} height={props.height} weight={props.weight}
                activityLevel={props.activityLevel}
                profile_picture={props.profile_picture}
                setUserInfo={props.setUserInfo}
                />
            );
        } else if (props.identity === "userStats")
        {
            return (
                <EditForm identity={props.identity} username={props.username} firstname={props.firstname} lastname={props.lastname} userId={props.userId} gender={props.gender} age={props.age} height={props.height} weight={props.weight}
                activityLevel={props.activityLevel}
                caloriesTarget={props.caloriesTarget}
                profilePicture={props.profile_picture}
                />
            );
        } 

        return null;  
   
};

export default Popup;