import React from 'react';
import {useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import DashboardMain from './DashboardMain';


function Dashboard() {
    // var to access passed variable from Login.js
    const location = useLocation();
    let history = useHistory();
    
    const [uid,setUid] = useState('empty');
    const [info,setInfo] = useState();

    useEffect(() => {
        
           try{
               setUid(location.state.user_id);
               LoadBasicInfo(uid).then(data => {            
                           setInfo(data);               
               })
           } catch {
               if(uid != 'empty') {                  
                   history.push("/login");
               }
           }
          
  ;
        
    },[uid,history]);

   console.log(info);

// *** if user info.username is <empty string> send them to a 'getting started form' ***
// wait for object to be filled with data that is fetched within some TIME.
   if (info !== undefined) {
    return (
        <DashboardMain userInfo={info}/>
       
)
} else { return (<h2>Error with fetching logged in user's data from server..</h2>)}
    


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