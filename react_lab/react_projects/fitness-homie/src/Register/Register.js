import React, {useRef} from 'react';
import './Register.css';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

function Register () {

    
    const {register, handleSubmit, watch, errors, reset} = useForm();
    
    const history = useHistory();
    var urlLocalServer = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Register/register.php';
     const onSubmit = async formData => {
        // a promise
         await fetch(urlLocalServer, {
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
            .then((response)=> {
            alert("Succesfully registered"); 
            reset();
            history.push("/login");
        
        })
            .catch(err => console.log(err))
    };

    // mutable -> , only objects and arrays are mutable, not primitive values.
    const pw = useRef({});
    pw.current = watch('password');
    
       return (
       <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
           
        <form className="h-75 p-4 d-flex flex-column justify-content-start" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
                <label htmlFor="emailInput">Email Address</label>
                <input name="email" type="email" className="form-control" id="" aria-describedby="emailInput"
                ref={register({
                    required: {
                        value: true,
                        message: "This field is required."
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Not a valid email address.",
                    },
                    validate:emailIsValid
                  })}
                />          
                {errors.email && <span>{errors.email.message}</span>}
                {errors.email && errors.email.type === "validate" && (
                <span>Email already registered.</span>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input name="password" type="password" className="form-control" id="" aria-describedby="passwordInput"
                ref={register({
                    required:{
                        value: true,
                        message: "This field is required."
                    },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                        message: 'Minimum eight characters, at least one letter, one number and one special character.'

                    }
                  })
                
                
                }
                /> 
                {errors.password && <span>{errors.password.message}</span>}   
            </div>

            <div className="form-group">
                <label htmlFor="passwordInput">Confirm Password</label>
                <input name="passwordRepeat"type="password" className="form-control" id="" aria-describedby="confirmPasswordInput"
                    ref={register({

                        required:{
                            value: true,
                            message: ""
                        },
                        validate: value => value === pw.current || 'Password mismatch.'
                    })}
                />
                 {errors.passwordRepeat && <span>{errors.passwordRepeat.message}</span>}        
            </div>
            <button type="submit" className="btn mx-auto">Register</button>
            <Link to="/login" className="mx-auto mt-2" style={{textDecoration:"none"}}><span>Already a member ? Login here</span></Link>
                    
           
        </form>
       </div>
       );
}

// function that will call the server and display all emails registered
// *** understand this ***




const emailIsValid = async (emailInput) => {
    
    var emailsUrl="http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Register/check-email-exist.php";
    var matcher='';
    try {
        
        
        await fetch(emailsUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            }
            }).then(response => response.json())
                .then(response => {
                    response.forEach(email => {
                        if(email === emailInput) {
                            matcher = emailInput;
                        }
                    })
                })
                .catch(err => console.log(err))
    
                console.log(matcher);
          return (emailInput === matcher) ? false : true;





    } catch (err) {console.log("Something went wrong with email fetch:"+err)}
};



export default Register;