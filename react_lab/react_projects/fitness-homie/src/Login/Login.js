import React from 'react';
import './login.css';
import {useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';





function Login() {
    
    const [error, setError] = useState('');
    
    // useEffect( () => {
    
    // })
    
    /*
        1. display error if user email does not exist.
        2. display error if user email does not match with hashed password.
    */

    const {handleSubmit,register,watch,reset,errors} = useForm();


    

    const onSubmit = async formData => {
        
        // if(formData.password !== "lolface22") {
        //     setError("Incorrect Password.");
        // } else {setError("");}
        console.log("here:"+formData.email);
        console.log("here:"+formData.password);

        let local_url = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Login/authenticate-user.php';
       
        // send email + password raw (get a resonpose (validation and authenticate user))
        await fetch (local_url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        }).then(response => response.text())
            .then(response => {
                if (response == "pass") {
                    alert('send me to setup page!!');
                    // new subroute
                   
                }
            })
            .catch(err => console.log(err));


    }


    return  (

        <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">

        <form className="h-75 p-4 d-flex flex-column justify-content-start" onSubmit={handleSubmit(onSubmit)} noValidate>
        
            <div className="form-group">
                <label htmlFor="emailInput">Email Address</label>
                <input name="email" type="email" className="form-control" id="" aria-describedby="emailInput"
                ref={register({
                    // use validate prop. and pass async callback function to fetch users email + password
                    required: {
                        value: true,
                        message: "Enter your email address."
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "This email doesn't exist.",
                    },
                    // ajax-like validation if email exist in db
                    validate: isEmailExist
                })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                {errors.email && errors.email.type === "validate" && (
                <span>This email is not registered.</span>
                )}</div>
                    

                <div className="form-group mt-5">
                <label htmlFor="passwordInput">Password</label>
                <input name="password" type="password" className="form-control" id="" aria-describedby="passwordInput"
                    ref={register({
                        required: {
                            value: true,
                            message: "Enter your password."
                        }
                       
                    })}
                />
                {errors.password &&<span>{errors.password.message}</span>}
                {<span>{error}</span>}
                </div>
    
                 <button type="submit" className="btn mx-auto">Login</button>
        </form>


        </div>

    );

}




const isEmailExist = async (emailInput) => {

    let emailsListing = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Register/check-email-exist.php';
    let matcher = '';
    // code goes here for api fetch
    await fetch (emailsListing,{
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    }).then (response => response.json())
        .then(response =>{response.forEach(email => {
            // console.log(email);
            if(email === emailInput) {matcher = emailInput;}
        })}).catch(err => console.log(err))
        return (matcher === '') ? false : true;
}


const authenticatePassword = async (rawPassword) => {

    // post raw Password to php 
    // php proccesses it with password verify if true return (YES)
    console.log(rawPassword);
   

}
    




export default Login;