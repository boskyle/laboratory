import React from 'react';
import {useState,useEffect} from 'react';
import {loadFromLocalStorage} from '../../LocalStorage';
import {FaTrashAlt} from 'react-icons/fa';
import moment from 'moment';




export const FoodItem = ({loggedItems,setLoggedItems,simpleDate,setOpenFood}) => {
    
    const fetchUserFoods = async () => {
    let username = loadFromLocalStorage('isLogged').isLogged[1][1];
    let displayFoodList = `http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/displayFoodlist.php?username=${username}`;
    
    const foodData = await fetch(displayFoodList,{
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json',
            }
        });

        const items = await foodData.json();
        setFoodItems(items);
    }


    const [foodItems, setFoodItems] = useState([]);
  
    useEffect(() =>{
        fetchUserFoods();
    },[])



    const addFoodItemToLog = (e) => {


        let timeAdded = new Date();
        console.log(moment(timeAdded).format('HH:mm:ss'));
        let fullTimeAdded = (simpleDate+' '+moment(timeAdded).format('HH:mm:ss'));
        console.log (fullTimeAdded);

        console.log('add food item to log clicked');
        const addFoodItemToDatabase = async (uname,foodname,cals,carbs,protein,fat) => {
            let url = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/logfood.php';

            await fetch(url,{
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: uname,
                    loggedDateSimple: simpleDate,
                    preciseLoggedDate: fullTimeAdded,
                    foodname: foodname,
                    calories: cals,
                    carbohydrates: carbs,
                    protein: protein,
                    fat: fat
                })
            }).then(response => response.text())
                .then(response => console.log(response));
        }


        let clickedFoodItem = e.currentTarget.getAttribute('food-index');
        let tempArray2 = loggedItems;
        // get the length of the current logged items and append to the endpoints
        // starts at 0, but splice iteration starts at 1 so +1, and add the clicked food item
        // add the the front (unshift)
        tempArray2.unshift(foodItems[clickedFoodItem]);
        console.log(foodItems[clickedFoodItem]);
        setLoggedItems([...tempArray2]);

        let username = loadFromLocalStorage('isLogged').isLogged[1][1];
       

            addFoodItemToDatabase(
                username,
                foodItems[clickedFoodItem].foodname,
                foodItems[clickedFoodItem].calories,
                foodItems[clickedFoodItem].carbohydrates,
                foodItems[clickedFoodItem].protein,
                foodItems[clickedFoodItem].fat
                )
        
        
        setOpenFood(false);

    }

   
    const deleteFoodItem = (e) => {

        console.log('delete food item clicked');
        e.stopPropagation();
        const deleteFoodFromDatabase = async (uname,arrayIndex) => {
            let url = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Logbook/deletefood.php';
            
                await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: uname,
                        rowNumber: parseInt(arrayIndex)
                    })
                })

                 
        }

        let tempArray = foodItems;

        /*  get attribute 'food-index' which contains the cur .index (location of the clicked element)
            and use it as a reference for deletion (splice)
        */

        /*
        Use e.currentTarget.getAttribute('data-value'). The target property refers to the dom 
        element on which the event originated (which will be the svg element), whereas currentTarget refers to the 
        element to which the handler was attached.        
        */

        let curDeletedIndex = e.currentTarget.getAttribute('food-index');
        // setIndex(e.currentTarget.getAttribute('food-index'));
        tempArray.splice(curDeletedIndex,1)
        // change the current array stored in state 'foodItems'
        setFoodItems([...tempArray]);
        let username = loadFromLocalStorage('isLogged').isLogged[1][1];
        deleteFoodFromDatabase(username,curDeletedIndex);    
    }

 

    let yfDeleteStyle = {

        position: 'relative',
        float: 'right',
    };

 
    if(foodItems !== undefined)
    return ( <>
        {foodItems.map((foodItem,index) => (
        <div  onClick={addFoodItemToLog}  key={index} food-index={index}>
            <ul>
                <li>{foodItem.foodname}<FaTrashAlt className="ml-1 mb-1 text-danger" style={yfDeleteStyle} onClick={deleteFoodItem}
                food-index={index}              
                /></li>
                <li className="mx-1" style={{display: 'inline-block'}}>cals:{foodItem.calories}</li>
                <li className="mx-1" style={{display: 'inline-block'}}>c: {foodItem.carbohydrates}
                </li>
                <li className="mx-1" style={{display: 'inline-block'}}>p: {foodItem.protein} </li>
                <li className="mx-1" style={{display: 'inline-block'}}>f:{foodItem.fat}</li>
            </ul>
        </div>
       
        ))}
    </>


    );
    
    return null;

  



      
// format   
    //     <div>
    //     <span>food name</span>
    //     <ul>
    //         <li>cals: /data/</li>
    //         <li>c: /data/</li>
    //         <li>p: /data/</li>
    //         <li>f: /data/</li>
    //     </ul>
    //    </div>

  
}