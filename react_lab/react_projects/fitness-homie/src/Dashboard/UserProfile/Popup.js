import React from 'react';
import {useState,useEffect} from 'react';
import Modal from 'react-modal';
import './popup.css';

export default () => {



    Modal.setAppElement('.App');
    const [showPop,setShowPop] = useState(false);

    const  handleOpen = (e) => {
        console.log("open");
        setShowPop(true);
    }

    const  handleClose = (e) => {
        console.log("close");
        setShowPop(false);
    }

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
           
            <button className="btn save-button" onClick={handleClose}><h2>Save</h2></button>
           
          
        </Modal>
        </>
    );
   
};