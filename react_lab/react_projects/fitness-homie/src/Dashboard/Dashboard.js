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

    useEffect(() => {
        try {

           
            setUid(location.state.user_id);

            LoadBasicInfo(uid);

        } catch {console.log("You must log in to go to dashboard.")
                history.push('/login');
              
    }
    })


    return (
        <div className="container h-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">{uid}</a>


            </nav>
   
        </div>


    )
    


}


const LoadBasicInfo = async (uid) => {

    let loadInfoUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Dashboard/load-profile.php';
        await fetch(loadInfoUrl, {
            method: 'POST',
            headers: {
                'accept': '*',
                'content-Type': '*',
            },
            body: uid
        }).then (response => response.json()).then (response => console.log(response))



    // return an object of a succesful response
}


export default Dashboard;