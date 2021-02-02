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
import {useForm} from 'react-hook-form';
import {FoodItem} from './FoodItem/FoodItem';
const Logbook = (props) => {

   

    let momentobj;
    const [userId] = useState(loadFromLocalStorage('isLogged').isLogged[1][0]);
    const [isOpen,setState] = useState(false);
    const [date, setDate] = useState(new Date());
    const [myDate,setMyDate] = useState(moment(date).format('MMM Do YYYY'));
    const [isOpenFood,setOpenFood] = useState(false);
    const {register, handleSubmit, errors, reset} = useForm();
   
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

useEffect( () => {
console.log("do a pull from users foodlist");
},[isOpenFood])

  

const onSubmit = async (formData,event) => {

    event.preventDefault();

    console.log(formData);
    setOpenFood(false);


}

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
                ariaHideApp={false}
                >
                  
                    <ImCross className="exit-icon" onClick={handleCloseFood}/>
                
                    <div className="popUpFood-item">
                        <h4>Your food</h4>
                        <div className="pop-userfoodlist w-100 h-100 mt-5">
                        <FoodItem/>
                           
                        </div>
                        

                    </div>
                    <div className="popUpFood-item">
                   
                    <form className="pop-form-createfood"  onSubmit={handleSubmit(onSubmit)} noValidate>
                    <h4 className="mt-1">Create food</h4>
                    <div className="form-group mx-auto">

                    <label htmlFor="caloricTargetInput"><b>Food name</b></label>
                    <input name="foodName" type="text" className="form-control" id="" aria-describedby="foodnameInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "please provide a food name."
                                            }
                                          
                                        })}                   
                    />
                    {errors.foodName && <span>{errors.foodName.message}</span>}
                    </div>
                    <div className="form-group mx-auto">
                    <label htmlFor="caloricTargetInput"><b>Calories</b></label>
                     <input name="foodCalories" type="text"  className="form-control" id="" aria-describedby="foodcaloriesInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "please provide caloric amount."
                                            },
                                            pattern: {
                                                value: /^[1-9][0-9]*$/,
                                                message: "Numbers only allowed."
                                            }    
                                          
                                        })}
                                        
                    />
                     {errors.foodCalories && <span>{errors.foodCalories.message}</span>}
                    </div>
                    <label htmlFor="caloricTargetInput" style={{display:"block"}}><b>Macronutrients (Optional)</b></label>
                    <input name="foodCarbs" type="text" className="form-control w-25 mx-1" style={{display: 'inline-block'}} placeholder="C(g)"/>
                    <input name="foodCarbs" type="text" className="form-control w-25 mx-1" style={{display: 'inline-block'}} placeholder="P(g)"/>
                    <input name="foodCarbs" type="text" className="form-control w-25 mx-1" style={{display: 'inline-block'}} placeholder="F(g)"/>


                        <button  className="btn mx-auto">Add</button>
                    </form>
                    </div>
                    <div className="popUpFood-item"><h4>Search food api (do this last)</h4></div>
                    
                
                </Modal>
                   
                    <h4 className="add-food" onClick={handleOpenFood}>ADD FOOD<MdAddBox  className="mb-1 ml-1"style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}}/></h4>
                </div>
            </div>
        </div>
        );
}


export default Logbook;