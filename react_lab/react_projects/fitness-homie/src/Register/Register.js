import React from 'react';
import './Register.css';
class Register extends React.Component {
    constructor() {
        super();
        this.state = {};
    }


   render() {
       return (
    
       <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
           
        <form className="h-75 p-4 d-flex flex-column justify-content-start">
            <div className="form-group">
                <label for="emailInput">Email address</label>
                <input type="email" className="form-control" id="" aria-describedby="emailInput"/>     
            </div>
            <div className="form-group">
                <label for="passwordInput">Password</label>
                <input type="password" className="form-control" id="" aria-describedby="passwordInput"/>     
            </div>

            <div className="form-group">
                <label for="passwordInput">Confirm Password</label>
                <input type="password" className="form-control" id="" aria-describedby="confirmPasswordInput"/>     
            </div>
            <button type="button" class="btn mx-auto">Register</button>
        </form>
       </div>
       );
   }
}


export default Register;