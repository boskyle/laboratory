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
import {TiDelete} from 'react-icons/ti';
import {useForm} from 'react-hook-form';
import {FoodItem} from './FoodItem/FoodItem';
const Logbook = (props) => {
    
    
    
    
    const [userId] = useState(loadFromLocalStorage('isLogged').isLogged[1][0]);
    const [isOpen,setState] = useState(false);
    const [date, setDate] = useState(new Date());
    const [myDate,setMyDate] = useState(moment(date).format('MMM Do YYYY'));
    const [preciseDate,setPreciseDate] = useState(moment(date).format('YYYY-MM-DD HH:mm:ss'))
    // same date format as datetime (mysql)
    const [isOpenFood,setOpenFood] = useState(false);
    const [loggedItems,setLoggedItems] = useState([]);
    const[addClicked,setAddClicked] = useState(false);
    const [caloriesEaten,setCaloriesEaten] = useState(0);
    const {register, handleSubmit,errors} = useForm();
    let foodLogDivArray = [];
    
    
    const onSubmit = async (formData,event) => {
        
        let createFoodUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/createfood.php';
        let logFoodUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/logfood.php';
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
                loggedDateSimple: moment(date).format('YYYY-MM-DD'),
                preciseLoggedDate: preciseDate,
                foodname: formData.foodName,
                calories: parseInt(formData.foodCalories),
                carbohydrates: parseInt(formData.foodCarbs),
                protein: parseInt(formData.foodProtein),
                fat: parseInt(formData.foodFat)
            })
        })
        // close the modal
        fetchUserLoggedFoods();
        setOpenFood(false);
        
        
    }



    
    
    
    const fetchUserLoggedFoods = async () => {

        const calculateCalories = (lfitems) => {
            let total = 0;
            lfitems.map((item) => {
                total += item.calories;
            })
            return total;
        }
        let username = loadFromLocalStorage('isLogged').isLogged[1][1];
        let displayLoggedFoods = `http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/displayLoggedFood.php?username=${username}&dateSelected=${moment(date).format('YYYY-MM-DD')}`
        
        const loggedFoods = await fetch(displayLoggedFoods, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json',
            }
        });
        const loggedFoodItems = await loggedFoods.json();
        setLoggedItems(loggedFoodItems);   
       let total;
     total =  calculateCalories(loggedFoodItems);
     setCaloriesEaten(total);
    }
    
    
    
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
    
    // const daySelected = () => {
    //     setState(false);
    // }
    
    
    
    
    const handleLeft = () => {
        date.setDate(date.getDate()-1);
        let curTime = new Date();
        setPreciseDate(moment(date).format('YYYY-MM-DD') +' '+moment(curTime).format('HH:mm:ss'))
        // visuals update
        setMyDate(moment(date).format('MMM Do YYYY'));
        
    }
    const handleRight = () => {
        date.setDate(date.getDate()+1);
        let curTime = new Date();
        setPreciseDate(moment(date).format('YYYY-MM-DD') +' '+moment(curTime).format('HH:mm:ss'));
        // visuals update
        setMyDate(moment(date).format('MMM Do YYYY'));
    }
    const handleOpenFood = () => {
        console.log("Opened!");
        setOpenFood(true);
    }
    
    const handleCloseFood = () => {
        console.log("Opened!");
        setOpenFood(false);
    }
    const handleClickAdd = () => {
        setAddClicked(true);
        if(addClicked === true)  {
            setAddClicked(false);
        }
    }

    const deleteLoggedFood = (e) => {

        console.log('food  deleted clicked');
        const deleteLoggedFoodFromDatabase = async (uname, arrayIndex) => {
            let url = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/deleteLoggedFood.php';

            await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    username: uname,
                    rowNumber: parseInt(arrayIndex),
                    simpleDate:moment(date).format('YYYY-MM-DD')
                })
            }).then( response => response.text())
                .then(response => console.log(response));       
        }



        let tempArray = loggedItems;
        let curDeletedIndex = e.currentTarget.getAttribute('logged-food-index');
        console.log(curDeletedIndex);
        tempArray.splice(curDeletedIndex,1);
        setLoggedItems([...tempArray]);
        let username = loadFromLocalStorage('isLogged').isLogged[1][1];
        deleteLoggedFoodFromDatabase(username,curDeletedIndex);
        fetchUserLoggedFoods();
    }
    
    let myCal = 
    <Calendar
    className="tilesContainer mx-auto"
    tileClassName="tiles"
    value={date}
    onChange={setDate}
    // onClickDay={daySelected}
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


const [today,setToday] = useState(<h3>{myDate}</h3>);


useEffect( () => {

 let curTime = new Date();
 let curDate = moment(date).format('YYYY-MM-DD');
 setPreciseDate(curDate+' '+(moment(curTime).format('HH:mm:ss')))
 setMyDate(moment(date).format('MMM Do YYYY'));
 fetchUserLoggedFoods();
 console.log(curDate); 

 if (moment(curTime).format('YYYY-MM-DD') === curDate) {
 setToday(<h3>TODAY</h3>);
 } else {setToday(<h3>{myDate}</h3>);}

},[date,preciseDate])






loggedItems.map((item,index) => {
 
    let carbs,protein,fat;
    if (item !== undefined) {

        carbs = item.carbohydrates;
        protein = item.protein;
        fat = item.protein;
        if (item.carbohydrates === null) {
            carbs = 0;  
        }  if(item.protein === null) {
            protein = 0;
        }  if (item.fat === null) {
            fat = 0;
        }
    

    foodLogDivArray[index] = (
    <div className="food-log" key={index}>
    <h4>{item.foodname}</h4>
    <TiDelete logged-food-index={index} className="mb-2 text-danger" style={{position: 'absolute' ,cursor: 'pointer',top: '0.4em',right:'0.5em',fontSize: '1.5em',display: 'inline-block'}} onClick={deleteLoggedFood}/>
   
    <span className="mx-1" style={{display: 'inline-block'}}>{item.calories} Cals</span>
    <span className="mx-1" style={{display: 'inline-block'}}>{carbs} C</span>
    <span className="mx-1" style={{display: 'inline-block'}}>{protein} P</span>
    <span className="mx-1" style={{display: 'inline-block'}}>{fat} F</span>
    <small className="mt-3" style={{display: 'block',fontSize: '0.95em'}}>{moment(item.food_log_date).format('hh:mm A')}</small>
    
    
    </div>);

    }
})


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
    
},[props.calories,props.caloriesTarget,userId])



    return (
        <div className="logbook-container">

            <div className="logbook-item text-center p-2">
                {/* <h3>TRACKING</h3>
                <h4>Daily Burn rate: <span>{calories.burning} Calories</span></h4> */}
                {today}
                <h4><span>Remaining: <span>{calories.target - caloriesEaten}</span> Calories</span></h4>
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
                                <FoodItem 
                                loggedItems={loggedItems}
                                setLoggedItems={setLoggedItems}
                                setOpenFood={setOpenFood}
                                simpleDate={moment(date).format('YYYY-MM-DD')}
                                setCaloriesEaten={setCaloriesEaten}

                                />   
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



                        <button  className="btn mx-auto" onClick={handleClickAdd}>Add</button>
                    </form>
                    </div>
                    <div className="popUpFood-item"><h4>FOOD API (coming to v1.1)</h4></div>
                    
                
                </Modal>
                {foodLogDivArray}
               
                    
                </div>
            </div>
        </div>
        );
}


export default Logbook;