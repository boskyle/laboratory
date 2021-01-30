import React from 'react';
import {useState,useEffect} from 'react';
import {loadFromLocalStorage} from '../LocalStorage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './logbook.css';

const Logbook = (props) => {


    // by default assing current date
    const [date, setDate] = useState(new Date());



useEffect( () => {
    console.log("logbook mounted");
    console.log(loadFromLocalStorage('isLogged').isLogged);
},[])

useEffect( () => {
    return (() => {
        console.log("logbook unmounted");
    })
},[])


useEffect( () => {
console.log(date);
},[date])


    return (
        <div className="logbook-container">

            <div className="logbook-item">
                <h2 className="">Food Logs</h2>
                {/* <Calendar
                className="tilesContainer mx-auto"
                tileClassName="tiles"
                onChange={setDate}
                value={date}
                view={"month"}
                /> */}
            </div>
            <div className="logbook-item">
                <div className="food-item">Create food</div>
                <div className="food-item">Search food api</div>
                <div className="food-item">Recent food</div>    
            </div>
        </div>
        );
}


export default Logbook;