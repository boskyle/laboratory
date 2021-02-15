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
                />
            );
        } else if (props.identity === "userStats")
        {
            return (
                <EditForm identity={props.identity} username={props.username} firstname={props.firstname} lastname={props.lastname} userId={props.userId} gender={props.gender} age={props.age} height={props.height} weight={props.weight}
                activityLevel={props.activityLevel}
                caloriesTarget={props.caloriesTarget}
                />
            );
        } else if (props.identity === "userTargetCalories")  {
            return (
                <EditForm identity={props.identity} username={props.username} firstname={props.firstname} lastname={props.lastname} userId={props.userId} gender={props.gender} age={props.age} height={props.height} weight={props.weight}
                activityLevel={props.activityLevel}
                />
            )
        }

        return null;  
   
};

export default Popup;