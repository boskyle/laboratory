import React from 'react';
import {useForm} from 'react-hook-form';
import {useState,useEffect} from 'react';
import {CountryDropdown, RegionDropdown, CountryRegionData} from 'react-country-region-selector';
import './setup.css';
import { FaInfoCircle } from 'react-icons/fa';








/*  Only render this component when it is the user's first time logging in
    This component will collect the pre-logged in user's information firsthand:
        -username
        -firstname
        -lastname
        -country (optional)
        -address (optional)

            NEXT
            
        BMR Calculation
        -age
        -height
        -workout per week (Drop down)

        
*/

console.log(localStorage.getItem('userId'));
console.log(localStorage.getItem('userName'));

var basicInfo;
var basicInfoArray = new Array();

let bmr_tool_tip_string = "An estimation on how much calories you need to consume to be able to sustain your weight."


const Setup = ()  => {
    
    const selectCountry = (val) => {
        setCountry(val);
    }
    
    const selectRegion = (val) => {
        setRegion(val);
    }
    
    const [isFormSubmitted,setFlag] = useState(false);
    const [country,setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [foo,setFoo]=useState([]);
    
    // dropdown
    const [value,setValue]=useState('bmr');
    const [gender,setGender]=useState('Gender');
    const [feet, setFeet]=useState('5');
    const [inches,setInches]=useState('5');
  
    
    
    const {register, handleSubmit, errors, reset} = useForm();

    let registerBasicInfoApi = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Login/register-basic-info.php';
    


    const onSubmit = formData => {
        
        console.log("submit worked!");
         basicInfo = {   uid:localStorage.getItem('userId'),
                            username: formData.username,
                            firstname: formData.firstname,
                            lastname: formData.lastname,
                            country: country+','+region,                   
    };
   ;
        setFlag(true);
        reset();
  
}


const onSubmit2 = formData => {
        
    console.log("submit 2 worked!");
    console.log(formData.age);
   


}

const dropDownChange = (e) => {
    setValue(e.target.value);   
}

const dropDownGender = (e) => {
    setGender(e.target.value);   
}


const dropDownFeet = (e) => {
    setFeet(e.target.value);
}

const dropDownInches = (e) => {
    setInches(e.target.value);
}
console.log(basicInfoArray[0]);




useEffect(() => {
setBasicInfo();
},[isFormSubmitted])


// activity two-dimensional array

let activity = [
    ['bmr', 1],
    ['sedentary',1.2],
    ['lightly-active', 1.375],
    ['moderately-active',1.55],
    ['very-active', 1.725],
    ['extra-active', 1.9],
];









const setBasicInfo = () => {
   
    if (basicInfo !== undefined) {
       
        basicInfoArray.push(basicInfo);
    }
}
    // if user is logged in (userId is  pushed into localStorage) BUT info is empty (info.username pushed into localStorage is non existant) then send them to this form
    if (localStorage.getItem('userId') !== null && localStorage.getItem('userName') === null) {
        if(isFormSubmitted === false) {      
            return (
                <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
                            <form className="h-75 p-4 d-flex flex-column justify-content-start" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <h2 className="mx-auto">Let's Get Started</h2>
                                <div className="form-group">
                                    <label htmlFor="emailInput">Username</label>
                                    <input name="username" type="text" className="form-control" id="" aria-describedby="emailInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Username is required."
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]{4,10}$/,
                                                message: "Length should be: 4-10 with no special characters."
                                            },
                                            validate: isUsernameExist
                                        })}
                                        
                                        />
                                        {errors.username && <span>{errors.username.message}</span>}
                                        {errors.username && errors.username.type === "validate" && (
                                        <span>Username already exists.</span>
                                        )}
                                </div>
        
                                <div className="form-group">
                                    <label htmlFor="emailInput">Firstname</label>
                                    <input name="firstname" type="text" className="form-control" id="" aria-describedby="firstnameInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Firstname is required."
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]{2,20}$/,
                                                message: "Firstname length should not be more than 20."
                                            },
                                            
                                        })}
                                        
                                        />
                                        {errors.firstname && <span>{errors.firstname.message}</span>}
                                </div>
        
                                <div className="form-group">
                                    <label htmlFor="emailInput">Lastname</label>
                                    <input name="lastname" type="text" className="form-control" id="" aria-describedby="lastnameInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Lastname is required."
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]{2,20}$/,
                                                message: "Lastname length should not be more than 20."
                                            },
                                            
                                        })}
                                        
                                        />
                                        {errors.lastname && <span>{errors.lastname.message}</span>}
                                </div>
                                <div className="form-group">
                                <label htmlFor="emailInput">Location (Optional)</label><br></br>
                                <CountryDropdown value={country}  onChange={selectCountry}className="countryInput mr-4"/>
                                <RegionDropdown country={country} value={region}  onChange={selectRegion} className="regionInput"/>
                                
        
                                </div>
                                <button type="submit" className="btn mx-auto">Next</button>
                            </form>
        
        
                </div>      
            )
        } else {return (
            <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
      
                <form className="h-75 p-4 d-flex flex-column justify-content-start text-center" onSubmit={handleSubmit(onSubmit2)} noValidate>
                    <span>
                    <h2 className="mx-auto" style={{fontSize: "0.80em"}}>LETS CALCULATE YOUR CALORIC NEEDS     
                    <FaInfoCircle  className="text-info ml-3" style={{position:"relative",fontSize:"0.5em"}}
                    data-toggle="tooltip" data-placement="bottom" title={bmr_tool_tip_string}
                    /></h2>              
                    </span>
                                                                
                    <div className="form-group mx-auto">
                        <label htmlFor="ageInput"><b>Age</b></label>
                        <input name="age" type="text" className="form-control w-25 text-center mx-auto" id="" aria-describedby="emailInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Age is required!"
                                            },
                                            validate: {                                              
                                                positive: (value) => parseInt(value, 10) > 0,
                                                tooOld: (value) => parseInt(value, 10) < 120,
                                            },
                                            pattern: {
                                                value: /^[1-9][0-9]*$/,
                                                message: "Incorrect age format!"
                                            }                                                                           
                                        })}                                
                                        />
                        {errors.age && <span>{errors.age.message}</span>}
                        {errors.age?.type === "tooOld" && <span>Too old.</span>}
                        {errors.age?.type === "positive" && <span>You can't be 0 years old silly.</span>}
                    

                    </div>
                <div className="form-group mb-0 mt-2">
                <label htmlFor="ageInput" style={{display:"block"}}><b>Activity</b></label>
                    <select value={value} onChange={dropDownChange} className="w-75 mx-auto" aria-describedby="activityInput">
                         <option value={activity[0][0]}>no exercise</option>
                         <option value={activity[1][0]}>little or no exercise, desk job</option>
                         <option value={activity[2][0]}>light exercise/ sports 1-3 days/week</option>
                         <option value={activity[3][0]}>moderate exercise/ sports 6-7 days/week</option>
                         <option value={activity[4][0]}>hard exercise every day, or exercising 2 xs/day</option>
                         <option value={activity[5][0]}>hard exercise 2 or more times per day, or training for marathon, or triathlon, etc.. </option>
                    </select>
                </div>
                <div className="form-group mb-0 mt-2">
                    <label htmlFor="genderInput" style={{display:"block"}}><b>Gender</b></label>
                    <select value={gender} onChange={dropDownGender} className="w-25 mx-auto text-center" aria-describedby="genderInput">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>          
                    </select>
                </div>
                <div className="form-group mb-0 mt-2">
                    <label htmlFor="feetInput"  className="mb-2"style={{display:"block"}}><b>Height</b></label>
                    <label htmlFor="feetInput">Feet</label>
                    <select value={feet} onChange={dropDownFeet} className="w-25 text-center ml-2 mr-2" aria-describedby="feetInput">
                        <option value="3">3</option>
                        <option value="4">4</option> 
                        <option value="5">5</option>   
                        <option value="6">6</option>
                        <option value="7">7</option>                
                    </select>
                    <label htmlFor="inchesInput">Inches</label>
                    <select value={inches} onChange={dropDownInches} className="w-25 text-center ml-2" aria-describedby="feetInput">
                        <option value="0">0</option>
                        <option value="1">1</option> 
                        <option value="2">2</option>   
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option> 
                        <option value="7">7</option>   
                        <option value="8">8</option>
                        <option value="9">9</option>   
                        <option value="10">10</option>
                        <option value="11">11</option> 
                        <option value="12">12</option>            
                    </select>
                </div>

                <div className="form-group mb-1">
                <label for="weightInput"><b>Weight (lbs)</b></label>
                <input name="weight" type="text" className="form-control w-25 text-center mx-auto" id="" aria-describedby="weightInput"
                ref={register({
                    required: {
                        value: true,
                        message: "Weight is required"
                    },

                    validate: {
                        notPossible: (value) => parseInt(value, 10) <= 1000
                    },
                    pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: "Incorrect weight format!"
                    }   
                    
                })}           
                />
                 {errors.weight && <span>{errors.weight.message}</span>}
                 {errors.weight?.type === "notPossible" && <span>Not possible.</span>}
                </div>

            <button type="submit" className="btn mx-auto">Done</button>
                </form>
                


            </div>


        );}
  
                               
    }

return null;
}

const isUsernameExist = async (userNameInput) => {
    let userNameListingApi = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Login/check-username-exist.php';
    let matcher = '';

    try {
        
        
        await fetch(userNameListingApi, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            }
            }).then(response => response.json())
                .then(response => {
                    response.forEach(username => {
                        if(username === userNameInput) {
                            matcher = userNameInput;
                        }
                    })
                })
                .catch(err => console.log(err))
    
                // console.log(matcher);
          return (userNameInput === matcher) ? false : true;





    } catch (err) {console.log("Something went wrong with email fetch:"+err)}

}



const calculateBMR = (gender,bodyweight,height,age) => {
    if (gender === "Male")
    {

    } else if (gender === "Female") {
        
    }

}
const calculateCalories = (bmr,activity) => {

}




export default Setup;