import React from 'react';
import {useEffect} from 'react';
import {loadFromLocalStorage} from '../LocalStorage';
import './logbook.css';

const Logbook = (props) => {





useEffect( () => {
    console.log("logbook mounted");
    console.log(loadFromLocalStorage('isLogged').isLogged);
},[])

useEffect( () => {
    return (() => {
        console.log("logbook unmounted");
    })
},[])


    return (
        <div className="log-container">

            <div className="log-item">
                <h2>Log</h2>
            </div>
        </div>
        );
}


export default Logbook;