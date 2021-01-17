import React from 'react';



const UserProfile = (props) => {

    if (props.username === undefined) {
        return (
            <div className="container-flex">
            <div className="flex-item-dashboard" id="flex-item-profile">
                <h2>PROFILE</h2>
                <div className="d-flex flex-column justify-content-center align-items-center">                                     
                    <h2 className="mt-5">This profile doesn't exist.</h2>                
                </div>
            </div>

            <div className="flex-item-dashboard" id="flex-item-journal">
                <h2>JOURNAL</h2>
                <div className="d-flex flex-column justify-content-center align-items-center">                                     
                    <h2 className="mt-5">This profile doesn't exist.</h2>                
                </div>
            </div>

            <div className="flex-item-dashboard" id="flex-item-workout">
                <h2>WORKOUT</h2>
                <div className="d-flex flex-column justify-content-center align-items-center">       
                <h5 className="mt-5">This profile doesn't exist.</h5>       
                </div>
            </div>

        </div>
        );
    }

    return (
        <div className="container-flex">
                    <div className="flex-item-dashboard" id="flex-item-profile">
                        <h2>PROFILE</h2>
                        <div className="flex-container-profile p-3">
                            <div className="profile-item w-25">
                                <h5>Profile Picture</h5>
                            </div>
                            <div className="profile-item w-75">
                            <span>{props.firstname + " " +props.lastname} ({props.username})</span>
                            <span>{props.country}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-item-dashboard" id="flex-item-journal">
                        <h2>JOURNAL</h2>
                        <p className="w-50">Calories to maintain weight (lbs): {props.userCalories}</p>
                    </div>

                    <div className="flex-item-dashboard" id="flex-item-workout">
                        <h2>WORKOUT</h2>
                    </div>

                </div>

    );
}

export default UserProfile;
