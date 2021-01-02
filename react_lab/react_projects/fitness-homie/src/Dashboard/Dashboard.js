import React from 'react';
import {useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import './dashboard.css';



function Dashboard() {
    // var to access passed variable from Login.js
    const location = useLocation();
    let history = useHistory();
    

    const [uid,setUid] = useState();
    const [info,setInfo] = useState();

   

    
    
    
    useEffect(() => {
        
           try{
               setUid(location.state.user_id);
           } catch {
               history.push("/login");
           }
        LoadBasicInfo(uid).then(data => {            
                    setInfo(data);               
        })
          
  ;
        
    },[uid,location.state.user_id,history]);

   console.log(info);


   if (info !== undefined) {
    return (
        <div className="container h-100">
            <h2>{info.username}</h2>
   
        </div>
)
} else { return (<h2>Loading info</h2>)}
    


}


const LoadBasicInfo = async (userId) => {

    let loadInfoUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Dashboard/load-profile.php';
    let userInfo;

    await fetch(loadInfoUrl, {
            method: 'POST',
            body: JSON.stringify(userId)

        }).then(response => response.json())
            .then (response => {
                      userInfo = response;
                      
            })
                .catch(error => console.log(error));

            if (userInfo !== null) {
               
                return userInfo;
            }

               



                

    // return an object of a succesful response
}


export default Dashboard;