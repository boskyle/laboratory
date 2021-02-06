import React from 'react';
import {useState,useEffect} from 'react';
import {loadFromLocalStorage} from '../../LocalStorage';
import {FaTrashAlt} from 'react-icons/fa';



export const FoodItem = () => {
    
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


    const [foodItems, setFoodItems] = useState(undefined);
  
    useEffect(() =>{
        fetchUserFoods();
    },[])


   
    const deleteFoodItem = (e) => {

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

    



 

 
    if(foodItems !== undefined)
    return ( <>
        {foodItems.map((foodItem,index) => (
        <div key={index}>
            <ul>
                <li>{foodItem.foodname}<FaTrashAlt className="ml-1 mb-1 text-danger" style={{position: 'relative',float: 'right'}} onClick={deleteFoodItem}
                food-index={index}              
                /></li>
                <li className="mx-1" style={{display: 'inline-block'}}>cals:{foodItem.calories}</li>
                <li className="mx-1" style={{display: 'inline-block'}}>c: {foodItem.carbohydrates}</li>
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