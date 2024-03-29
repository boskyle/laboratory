import React from 'react';
import {useEffect} from 'react';
import './settings.css';


const Settings = () => {

    useEffect( () => {
        console.log("settings mounted");
    },[])

    useEffect( () => {
        return() => {console.log("settings unmounted")};
    },[])


    return (
        <div className="settings-container">

        <div className="settings-item">
            <h2>Coming to v1.1</h2>
        </div>

        

        </div>
    );
}

export default Settings;