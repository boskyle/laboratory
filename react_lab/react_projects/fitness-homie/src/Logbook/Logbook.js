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

   

    let momentobj,momentobj2,momentobj3;
    const [userId] = useState(loadFromLocalStorage('isLogged').isLogged[1][0]);
    const [isOpen,setState] = useState(false);
    const [date, setDate] = useState(new Date());
    const [myDate,setMyDate] = useState(moment(date).format('MMM Do YYYY'));
    // same date format as datetime (mysql)
    const[loggedDate,setLoggedDate] = useState(moment(date).format('YYYY-MM-DD'));
    const[preciseLoggedDate,setPreciseLoggedDate] = useState(moment(date).format('YYYY-MM-DD HH:mm:ss'));
    const [isOpenFood,setOpenFood] = useState(false);
    const [loggedItems,setLoggedItems] = useState([]);
    const {register, handleSubmit,errors} = useForm();
   





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

    const newDate = (direction) => {

        let buff = new Date();
        // console.log(buff.getFullYear()+'-'+(buff.getMonth()+1)+'-'+buff.getDay());
        console.log(date);

        switch (direction) {
            case "left":    
            return  date.getDate() - 1;
            case "right":
            return  date.getDate() + 1;
        }
    }

  
    
    const handleLeft = () => {
        date.setDate(newDate("left"));
        momentobj = moment(date).format('MMM Do YYYY');
        momentobj2 = moment(date).format('YYYY-MM-DD');
        momentobj3 = moment(date).format('YYYY-MM-DD HH:mm:ss')
        setMyDate(momentobj);
        setLoggedDate(momentobj2);
        setPreciseLoggedDate(momentobj3);
    }
    const handleRight = () => {
        date.setDate(newDate("right"));
        momentobj = moment(date).format('MMM Do YYYY');
        momentobj2 = moment(date).format('YYYY-MM-DD');
        momentobj3 = moment(date).format('YYYY-MM-DD HH:mm:ss')
        setMyDate(momentobj);
        setLoggedDate(momentobj2);
        setPreciseLoggedDate(momentobj3);
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
 momentobj2 = moment(date).format('YYYY-MM-DD');
 momentobj3 = moment(date).format('YYYY-MM-DD HH:mm:ss');
 setMyDate(momentobj);
 setPreciseLoggedDate(momentobj3);
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


const fetchUserLoggedFoods = async () => {
    let username = loadFromLocalStorage('isLogged').isLogged[1][1];
    let displayLoggedFoods = `http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/displayLoggedFood.php?username=${username}&dateSelected=${loggedDate}`

    await fetch(displayLoggedFoods, {
        method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json',
            }
    }).then(response => response.json())
        .then(response => console.log(response))
            .catch(err => console.log(err));

    
}



// anytime date changes
useEffect( () => {
console.log(date.toLocaleString());
fetchUserLoggedFoods();
console.log(loggedItems);
},[myDate])

useEffect( () => {
console.log("do a pull from users foodlist");
},[isOpenFood])

  


const onSubmit = async (formData,event) => {

    let createFoodUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/createfood.php';
    let logFoodUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/logfood.php'
    // prevents page from refeshing aswell as disable normal operations of a typical submit function of a form..
    event.preventDefault();
    // get the username that is logged in
   let uname = loadFromLocalStorage('isLogged').isLogged[1][1];
    //send username + formData to the database



    // assign food php url and convert formData object + username to JSON format
   await fetch(createFoodUrl,{
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: uname,
            foodname: formData.foodName,
            calories: parseInt(formData.foodCalories),
            carbohydrates: parseInt(formData.foodCarbs),
            protein: parseInt(formData.foodProtein),
            fat: parseInt(formData.foodFat)
        })
    })

   await fetch(logFoodUrl,{
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: uname,
            loggedDateSimple: loggedDate,
            preciseLoggedDate: preciseLoggedDate,
            foodname: formData.foodName,
            calories: parseInt(formData.foodCalories),
            carbohydrates: parseInt(formData.foodCarbs),
            protein: parseInt(formData.foodProtein),
            fat: parseInt(formData.foodFat)
        })
    }).then(response => response.text())
        .then(response => console.log(response));
    // close the modal
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
                <h4 className="add-food" onClick={handleOpenFood}>ADD FOOD<MdAddBox  className="mb-1 ml-1"style={{position: 'relative', cursor: 'pointer',display: 'inline-block'}}/></h4>
                <Modal 
                isOpen={isOpenFood}
                onRequestClose={handleCloseFood}
                contentLabel="Add food modal"
                className="popUpFood"
                overlayClassName="lg-overlay"
                ariaHideApp={false}  
                >
                  
                    <ImCross className="exit-icon" onClick={handleCloseFood}/>
                
                    <div className="popUpFood-item">
                        <h4>Your food</h4>
                            <div className="pop-userfoodlist w-100 h-100 mt-5">
                                <FoodItem />   
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
                    <div className="form-group mx-auto">
                    <label htmlFor="caloricTargetInput" style={{display:"block"}}><b>Macronutrients (Optional)</b></label>
                    
                    <input name="foodCarbs" type="text" className="form-control w-25 mx-1" style={{display: 'inline-block'}} placeholder="C(g)"
                      ref={register({
                        pattern: {
                            value: /^[1-9][0-9]*$/,
                            message: "Enter only the NUMBER of carbs.."
                        }    
                      })}  
                    />
                    <input name="foodProtein" type="text" className="form-control w-25 mx-1" style={{display: 'inline-block'}} placeholder="P(g)"
                     ref={register({
                        pattern: {
                            value: /^[1-9][0-9]*$/,
                            message: "Enter only the NUMBER of protein.."
                        }    
                      })}  
                    />
                    <input name="foodFat" type="text" className="form-control w-25 mx-1" style={{display: 'inline-block'}} placeholder="F(g)"
                     ref={register({
                        pattern: {
                            value: /^[1-9][0-9]*$/,
                            message: "Enter only the NUMBER of fat.."
                        }    
                      })}  
                    />
                   

                    {errors.foodCarbs && <span  className="mt-2" style={{display: 'block', fontSize: '0.6em'}}>{errors.foodCarbs.message}</span>}
                    {errors.foodProtein && <span  className="mt-2" style={{display: 'block', fontSize: '0.6em'}}>{errors.foodProtein.message}</span>}
                    {errors.foodFat && <span  className="mt-2" style={{display: 'block', fontSize: '0.6em'}}>{errors.foodFat.message}</span>}
                 
                    </div>



                        <button  className="btn mx-auto">Add</button>
                    </form>
                    </div>
                    <div className="popUpFood-item"><h4>Search food api (do this last)</h4></div>
                    
                
                </Modal>
                <div className="food-log">Hello</div>
                <div className="food-log">Hello</div>
                <div className="food-log">Hello</div>
                <div className="food-log">Hello</div>
                <div className="food-log">Hello</div>
                
               
                    
                </div>
            </div>
        </div>
        );
}


export default Logbook;