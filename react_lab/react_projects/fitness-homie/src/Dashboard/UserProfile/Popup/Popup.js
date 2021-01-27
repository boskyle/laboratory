import React from 'react';
import {useState,useEffect} from 'react';
import Modal from 'react-modal';
import {useForm} from 'react-hook-form';
import {isUsernameExistWithCheck} from '../../../DB/validation';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {authenticateUserLoggedIn} from '../../../redux/actions';
import {EditForm} from './ProfileEdit/EditForm';
import {ImCross} from 'react-icons/im';
import './popup.css';


export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    Modal.setAppElement('.App');
    const [showPop,setShowPop] = useState(false);
    const [userInfo,setUserInfo] = useState('');
   
    const  handleOpen = (e) => {
        console.log("open");
        setShowPop(true);

        console.log(props.identity);
    }

    const  handleClose = (e) => {
        console.log("close");
        setShowPop(false);
    }
   

        if (props.identity === "userProfile")
        {

            return (
                <EditForm identity={props.identity} username={props.username} firstname={props.firstname} lastname={props.lastname} userId={props.userId} gender={props.gender} age={props.age} height={props.height} weight={props.weight}/>
            );
        } else if (props.identity === "userStats")
        {
            return (
                <EditForm identity={props.identity} username={props.username} firstname={props.firstname} lastname={props.lastname} userId={props.userId} gender={props.gender} age={props.age} height={props.height} weight={props.weight}/>
            );
        }

        return null;





   


    
   
};