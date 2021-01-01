import React from 'react';
import {useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import {useHistory} from 'react-router-dom';



function Dashboard() {
    // var to access passed variable from Login.js
    const location = useLocation();
    let history = useHistory();
    

    const [uid,setUid] = useState();

    useEffect(() => {
        try {

            console.log(location.state.user_id);
            setUid(location.state.user_id);

        } catch {console.log("You must log in to go to dashboard.")
        history.push('/login');
              
    }
    })


    return (<h2>Welcome user id: {uid}</h2>)
    


}


export default Dashboard;