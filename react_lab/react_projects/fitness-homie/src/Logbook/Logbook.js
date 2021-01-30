import React from 'react';
import {useState,useEffect} from 'react';
import {loadFromLocalStorage} from '../LocalStorage';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import moment from 'moment';
import './logbook.css';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import {ImCalendar} from 'react-icons/im'

const Logbook = (props) => {

    const [isOpen,setState] = useState(false);
    const [date, setDate] = useState(new Date());
    console.log(new Date ());

    const handleOpenCalendar = () => {
        console.log("click");
        setState(true);
            if(isOpen === true)  {
                setState(false);
            }
    }  
    
    let myCal = 
    <Calendar
    className="tilesContainer mx-auto"
    tileClassName="tiles"
    onChange={setDate}
    value={date}
    view={"month"}
    dayHeaderFormat="Short"
    // formatLongDate={'dd MMM'}
    />
    
    isOpen ? myCal = myCal : myCal = null;



useEffect( () => {
    console.log("logbook mounted");
    console.log(loadFromLocalStorage('isLogged').isLogged);
},[])

useEffect( () => {
    return (() => {
        console.log("logbook unmounted");
    })
},[])

let momentobj;

useEffect( () => {
 momentobj = moment(date).format('MMM Do YYYY');
 console.log(momentobj);
},[date])




    

    return (
        <div className="logbook-container">

            <div className="logbook-item">
                <h2 className="">Food Logs <ImCalendar style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}} onClick={handleOpenCalendar}/></h2>
                {myCal}
            </div>
           
        </div>
        );
}


export default Logbook;