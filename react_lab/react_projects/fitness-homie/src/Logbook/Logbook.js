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
import {ImCalendar,ImCross} from 'react-icons/im'
import {MdAddBox} from 'react-icons/md';
import {BiChevronLeftSquare,BiChevronRightSquare} from 'react-icons/bi';

const Logbook = (props) => {


    let momentobj;
    const [userId] = useState(loadFromLocalStorage('isLogged').isLogged[1][0]);
    const [isOpen,setState] = useState(false);
    const [date, setDate] = useState(new Date());
    const [myDate,setMyDate] = useState(moment(date).format('MMM Do YYYY'));
    const [isOpenFood,setOpenFood] = useState(false);
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
    const handleOpenFood = () => {
        console.log("Opened!");
        setOpenFood(true);
    }

    const handleCloseFood = () => {
        console.log("Opened!");
        setOpenFood(false);
    }

    let myCal = 
    <Calendar
    className="tilesContainer mx-auto"
    tileClassName="tiles"
    onChange={setDate}
    value={date}
    view={"month"}
    dayHeaderFormat="Short"
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
    ,500)
   
    }
    
    return () => {isMounted = false;}
    
},[props.calories,props.caloriesTarget])


// anytime date changes
useEffect( () => {
console.log(myDate);
},[myDate])

  

    return (
        <div className="logbook-container">

            <div className="logbook-item text-center p-2">
                <h3>TRACKING</h3>
                <h4>Daily Burn rate: <span>{calories.burning} Calories</span></h4>
                <h4> Daily Target: <span>{calories.target} Calories</span></h4>
                <h3>TODAY</h3>
            </div>
            <div className="logbook-item text-center" id="log">
                <h2 className="w-100 mx-auto text-center mt-2">
                <BiChevronLeftSquare  className="mb-1 mr-4" style={{position: 'relative', cursor: 'pointer',display: 'inline-block' }} onClick={handleLeft}/>
                <span className="myDate">{myDate}</span>
                <ImCalendar className="mb-2 ml-2" style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}} onClick={handleOpenCalendar}/>
                <BiChevronRightSquare className="mb-1 ml-4" style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}} onClick={handleRight}/>
                </h2>
                {myCal}
            
                <div className="log-food-container">
                <Modal 
                isOpen={isOpenFood}
                onRequestClose={handleCloseFood}
                contentLabel="Add food modal"
                className="popUpFood"
                overlayClassName="overlay"
                >
                  
                    <ImCross className="exit-icon" onClick={handleCloseFood}/>
                    <div className="popUpFood-item"><h4>Your food</h4></div>
                    <div className="popUpFood-item"><h4>Create food</h4></div>
                    <div className="popUpFood-item"><h4>Search food</h4></div>
                    
                    {/* <form className="pop-form-addfood" noValidate>
                   
                    <label htmlFor="caloricTargetInput"><b>Food Name</b></label>
                    </form> */}
                </Modal>
                   
                    <h4 className="add-food" onClick={handleOpenFood}>ADD FOOD<MdAddBox  className="mb-1 ml-1"style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}}/></h4>
                </div>
            </div>
        </div>
        );
}


export default Logbook;