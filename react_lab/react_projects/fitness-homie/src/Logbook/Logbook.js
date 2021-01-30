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
    const [userId] = useState(loadFromLocalStorage('isLogged').isLogged[1][0]);
    const [isOpen,setState] = useState(false);
    const [date, setDate] = useState(new Date());
    const [myDate,setMyDate] = useState(moment(date).format('MMM Do YYYY'));
    // console.log(new Date ());


    const [calories, setCalories] =  useState({
        burning: props.calories,
        target: props.caloriesTarget
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




useEffect( () => {
    let isMounted = true;
    {
    
    setTimeout( () => {
        if (isMounted === true)
        LoadFitnessInfo(userId)
        .then (data => {
            setCalories({
            burning: data.calories,
            target: data.calories_target
        })})
    }
    ,1500)
   
    }
    return () => {isMounted = false;}
})

    let target_calories;

    if (props.caloriesTarget === null) {
        target_calories = <h2>Enter target calories</h2>
    } else {target_calories = props.calories_target}







    return (
        <div className="logbook-container">

            <div className="logbook-item text-center" id="log">
                <h2 className="w-100 mx-auto text-center mt-2">
                <BiChevronLeftSquare  className="mb-1 mr-4" style={{position: 'relative', cursor: 'pointer',display: 'inline-block' }} onClick={handleLeft}/>
                <span className="myDate">{myDate}</span>
                <ImCalendar className="mb-2 ml-2" style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}} onClick={handleOpenCalendar}/>
                <BiChevronRightSquare className="mb-1 ml-4" style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}} onClick={handleRight}/>
                </h2>
                {myCal}
                <div className="log-food-container">

                </div>
               
            </div>
            <div className="logbook-item text-center" id="log-calories">
                <h3>TRACKING</h3>
                <span style={{display: 'block'}}>Burn rate: {calories.burning}</span>
                <span style={{display: 'block'}}>{target_calories}</span>

            </div>
            <div className="logbook-item text-center" id="log-nurtrients">
            <h3>FOOD</h3>
            </div>
           
        </div>
        );
}


export default Logbook;