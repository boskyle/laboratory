import React from 'react';
import {useState,useEffect} from 'react';
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadFitnessInfo} from '../Dashboard/db-endpoints/loadProfile';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import moment from 'moment';
import './logbook.css';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import {ImCalendar} from 'react-icons/im'
import {BiChevronLeftSquare,BiChevronRightSquare} from 'react-icons/bi';

const Logbook = (props) => {


    let momentobj;
    const [isOpen,setState] = useState(false);
    const [date, setDate] = useState(new Date());
    const [myDate,setMyDate] = useState(moment(date).format('MMM Do YYYY'));
    console.log(new Date ());


    const [calories, setCalories] =  useState({
        burning: "",
        target: ""
    });

    const handleOpenCalendar = () => {
        console.log("click");
        setState(true);
            if(isOpen === true)  {
                setState(false);
            }
    }  
    
    const handleLeft = () => {
        console.log("left");
        date.setDate(date.getDate() -1);
        momentobj = moment(date).format('MMM Do YYYY');
        setMyDate(momentobj);
    }
    const handleRight = () => {
        console.log("right");
        date.setDate(date.getDate() +1);
        momentobj = moment(date).format('MMM Do YYYY');
        setMyDate(momentobj);
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

useEffect( () => {
 momentobj = moment(date).format('MMM Do YYYY');
 setMyDate(momentobj);
},[date])

console.log(myDate);

useEffect( () => {

    LoadFitnessInfo(loadFromLocalStorage('isLogged').isLogged[1][0])
        .then (data => {setCalories({
            burning: data.calories
        })})
},[calories])


console.log(calories.burning)
    

    return (
        <div className="logbook-container">

            <div className="logbook-item text-center" id="log">
                <h2 className="w-100 mx-auto text-center mt-2">
                <BiChevronLeftSquare  className="mb-1 mr-4" style={{position: 'relative', cursor: 'pointer',display: 'inline-block' }} onClick={handleLeft}/>
                {myDate}
                <ImCalendar className="mb-2 ml-2" style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}} onClick={handleOpenCalendar}/>
                <BiChevronRightSquare className="mb-1 ml-4" style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}} onClick={handleRight}/>
                </h2>
                {myCal}
                <div className="log-food-container">

                </div>
               
            </div>
            <div className="logbook-item text-center" id="log-calories">
                Calories
                <span style={{display: 'block'}}>Burn rate: {calories.burning}</span>

            </div>
            <div className="logbook-item text-center" id="log-nurtrients">Nutrients</div>
           
        </div>
        );
}


export default Logbook;