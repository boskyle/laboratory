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
            <EditForm username={props.username} firstname={props.firstname} lastname={props.lastname} userId={props.userId}/>
        );

    }

    if (props.identity === "userStats")
    {
        return (
            <>
            <button  type="button" className="btn edit-button m-0 mb-1" onClick={handleOpen}>Edit</button>
            <Modal 
               isOpen={showPop}
               onRequestClose={handleClose}
               contentLabel="Minimal Modal Example"
               className="popUp"
               overlayClassName="overlay"
            >
                <div className="pop-form-container p-5">
                    <ImCross className="exit-icon" onClick={handleClose}/>
                   
                </div>
    
               
              
            </Modal>
            </>
        );
    }


    return null;


    
   
};