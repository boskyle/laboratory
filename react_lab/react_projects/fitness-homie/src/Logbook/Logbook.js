import React from 'react';
import {useEffect} from 'react';
import './logbook.css';

// import {slide as Menu} from 'react-burger-menu';
// import {Link} from 'react-router-dom';









const Logbook = (props) => {



useEffect( () => {
    console.log("logbook mounted");
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