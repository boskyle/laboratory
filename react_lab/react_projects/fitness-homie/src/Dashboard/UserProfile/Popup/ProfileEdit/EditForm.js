import {useForm} from 'react-hook-form';
import {useState,useEffect} from 'react';
import Modal from 'react-modal';
import {ImCross} from 'react-icons/im';
import {BiEdit} from 'react-icons/bi';
import '../popup.css';
import './editform.css';
// image upload imports
import ImageUploader from 'react-images-upload';
import defaultImage from '../../../../assets/images/defaulProfilePicture.png';

export const EditForm = (props) => {



    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            firstname: props.firstname,
            lastname: props.lastname,
            weight:props.weight,
            age: props.age,
            calorieTarget: props.caloriesTarget
        }
    });



    // mini functions to turn height in cm to feet & inches
    const takeFeet = (height) => {
        let feetTaken = height/30.48;
        return Math.floor(feetTaken);
       
    }

    const takeInches = (height) => {
        let feetTaken = height/30.48;
        let inches = (feetTaken % 1);  
      return Math.round(inches*12);
      
    
    }

    const inchesToCentimeters = (feet,inches) => {

        let multiplier_to_inches = 12;
        let multiplier_to_cm = 2.54;
    
        let finalCentimeters = ((multiplier_to_inches * feet) + inches) * multiplier_to_cm;
    
        return ~~finalCentimeters;
    }

    const calculateBMR = (gender,bodyweight,height,age) => {
        if (gender === "Male")
        {
            // metric
            let rounded = (10 * (bodyweight/2.205)) + (6.25 * height) - (5 * age) + 5;
            // similar to casting to int
            return ~~rounded;
           
        } else if (gender === "Female") {
            // metric
            let rounded = (10 * (bodyweight/2.205)) + (6.25 * height) - (5 * age) + 5 - 161;
            // similar to casting to int
            return ~~rounded;
        }
    }
    


        // used for progress update
    const calculateCalories = (bmr,activity) => {
        switch (activity) {
            case "bmr":
                return ~~(bmr * 1.0);
            case "sedentary":
                return ~~(bmr * 1.2);
            case "lightly-active":
                return ~~(bmr * 1.375);
            case "moderately-active":
                return ~~(bmr * 1.55);
            case "very-active":
                return ~~(bmr * 1.725);
            case "extra-active":
                return ~~(bmr * 1.9);
            default:
                return ~~(bmr);
        }
    
    }


    const [showPop,setShowPop] = useState(false);
    const [form,setForm] = useState('');


    const [gender,setGender] = useState (props.gender);
    const [feet, setFeet] = useState(takeFeet(props.height));
    const [inches, setInches] = useState(takeInches(props.height));
    const [actLevel, setLevel] = useState(props.activityLevel);



   
   
    const  handleOpen = () => {
        console.log("open");
        setShowPop(true);
        setForm(props.identity);
    }

    const  handleClose = () => {
        console.log("close");
        // if dont save save current (using props)
        setGender(props.gender);
        setFeet(takeFeet(props.height));
        setInches(takeInches(props.height));
        setShowPop(false);

    }

    // Journal functions

    const dropDownGender = (e) => {
       let {value} = e.target;
       setGender(value);
    }

    const dropDownFeet = (e) => {
        let {value} = e.target;
        setFeet(value);

    }
    const dropDownInches = (e) => {
        let {value} = e.target;
        setInches(value);
    }

    const dropDownActivity = (e) => {
        let {value} = e.target;
        setLevel(value);
    }

    const onEditProfile = async formData => {
        let editUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Dashboard/UserProfile/Popup/edit-profile.php';
        await fetch (editUrl,{
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: props.userId,
                firstname: formData.firstname,
                lastname: formData.lastname
            })
        })

        
        // instantly to redux state
       
        console.log(formData);
        window.location.reload();
        // setShowPop(false);
    }

    const onEditStyles = async formData => {
        let editUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Dashboard/UserProfile/Popup/edit-stats.php';

        await fetch (editUrl,{
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            },
            // for some reason inches returned as a string :o so  I had to use parseInt
            body: JSON.stringify({
                uid:    props.userId,
                gender: gender,
                age:    formData.age,
                height: inchesToCentimeters(feet,parseInt(inches)),
                weight: formData.weight,
                activity_level: actLevel,
                calories: calculateCalories(calculateBMR(gender,formData.weight,inchesToCentimeters(feet,parseInt(inches)),formData.age),actLevel),
                caloriesTarget: formData.calorieTarget
            })
        }).then(response => response.json())
            .then (response => console.log(response))
      

        window.location.reload();

    }

    const [pictures,setPictures] = useState([defaultImage]);

    const onDrop = (image) => {
        setPictures(URL.createObjectURL(image[0]));
        console.log(image);
        // compress the img;
    }

    useEffect(() => {

       
    },[])




    const profileEdit =
    <Modal 
    isOpen={showPop}
    onRequestClose={handleClose}
    contentLabel="Minimal Modal Example"
    className="popUp"
    overlayClassName="overlay"
>     
    <form className="pop-form-profile-update" onSubmit={handleSubmit(onEditProfile)} noValidate>
    <ImCross className="exit-icon" onClick={handleClose}/>
    {/* firstname */}
    <div className="form-group pop-up-form-group mb-2">
    <label htmlFor="emailInput"><h4>Firstname</h4></label>
    <input name="firstname" type="text" className="form-control w-50 mx-auto text-center" id="" aria-describedby="firstnameInput"
        ref={register({
            required: {
                value: true,
                message: "You can't leave it blank silly."
            },
            pattern: {
                value: /^[a-zA-Z]{2,20}$/,
                message: "Name format is invalid."
            },
            
        })}
        
        />
        {errors.firstname && <span>{errors.firstname.message}</span>}
</div>
<div className="form-group pop-up-form-group">
    <label htmlFor="emailInput"><h4>Lastname</h4></label>
    <input name="lastname" type="text" className="form-control w-50 mx-auto text-center" id="" aria-describedby="firstnameInput"
        ref={register({
            required: {
                value: true,
                message: "You can't leave it blank silly."
            },
            pattern: {
                value: /^[a-zA-Z]{2,20}$/,
                message: "Name format is invalid."
            },
            
        })}
        
        />
        {errors.lastname && <span>{errors.lastname.message}</span>}
</div>




        <img className="h-50 w-75 editProfilePicture" src={pictures} alt='profilePicture'/>



        <ImageUploader
                className=" w-75 mx-auto iup"
                fileContainerStyle={{backgroundColor: 'transparent',boxShadow: 'none'}}
                singleImage={true}
                onChange={onDrop}
                withIcon={false}
                buttonText='Choose a picture'
                buttonClassName='imageUploaderButton'
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                label={''}
                buttonStyles={{}}
            />









<button  type="submit"  className="btn save-button">Save</button>
</form>
</Modal>;

    const statsEdit =    
    <Modal 
    isOpen={showPop}
    onRequestClose={handleClose}
    contentLabel="Minimal Modal Example"
    className="popUp"
    overlayClassName="overlay"
    >     
                        <form className="pop-form-stats-update" onSubmit={handleSubmit(onEditStyles)} noValidate>
                        <ImCross className="exit-icon" onClick={handleClose}/>
                        <div className="form-group mb-0 mt-2">
                            <label htmlFor="genderInput" style={{display:"block"}}><b>Gender</b></label>
                            <select value={gender} onChange={dropDownGender} className="w-25 mx-auto text-center" aria-describedby="genderInput">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>          
                            </select>          
                        </div>
                        <div className="form-group mb-0 mt-2">
                            <label htmlFor="ageInput" style={{display:"block"}}><b>Age</b></label>
                            <input name="age" type="text" className="form-control w-25 text-center mx-auto" id="" aria-describedby="emailInput"
                                        ref={register({
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
                        <div className="form-group mb-0 mt-4">
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
                            <select value={inches}  onChange={dropDownInches} className="w-25 text-center ml-2" aria-describedby="feetInput">
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

                        <div className="form-group ">
                        <label htmlFor="weightInput"><b>Weight (lbs)</b></label>
                        <input name="weight" type="text" className="form-control w-25 text-center mx-auto" id="" aria-describedby="weightInput"
                        ref={register({              
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
                        <div className="form-group">

                        <label htmlFor="activityInput" style={{display:"block"}}><b>Activity</b></label>
                        <select value={actLevel} onChange={dropDownActivity} className="w-75 mx-auto" aria-describedby="activityInput">
                         <option value="bmr">no exercise</option>
                         <option value="sedentary">little or no exercise, desk job</option>
                         <option value="lightly-active">light exercise/ sports 1-3 days/week</option>
                         <option value="moderately-active">moderate exercise/ sports 6-7 days/week</option>
                         <option value="very-active">hard exercise every day, or exercising 2 xs/day</option>
                         <option value="extra-active">hard exercise 2 or more times per day, or training for marathon, or triathlon, etc.. </option>
                        </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="caloricTargetInput"><b>Caloric Target (kcal)</b></label>
                        <input name="calorieTarget" type="text" className="form-control w-25 text-center mx-auto" id="" aria-describedby="caloricTargetInput"
                        ref={register({
                            pattern: {
                                value: /^[1-9][0-9]*$/,
                                message: "Incorrect calorie format"
                            }

                        })}
                        />
                {errors.calorieTarget && <span>{errors.calorieTarget.message}</span>}

                </div>

                        <button  type="submit"  className="btn save-button">Save</button>
                        </form>
    
    </Modal>

    const caloricTargetEdit =
    <Modal 
    isOpen={showPop}
    onRequestClose={handleClose}
    contentLabel="Minimal Modal Example"
    className="popUp"
    overlayClassName="overlay"
    >     
    <form className="pop-form-stats-update" noValidate>
    <ImCross className="exit-icon" onClick={handleClose}/>
    </form>
    </Modal>

     
        if (form === "userProfile")
        {
           return <> 
            <BiEdit  className=" mb-1 edit-icon"style={{position: "relative",display: "inline-block"}} onClick={handleOpen}/>    
           {profileEdit}       
           </>
        } else if (form === "userStats") {
            return <> 
             <BiEdit  className=" mb-1 edit-icon"style={{position: "relative",display: "inline-block"}} onClick={handleOpen}/>    
           {statsEdit}              
            </>
        } else if (form === "userTargetCalories") {
            return <> 
              <BiEdit  className=" mb-1 edit-icon"style={{position: "relative",display: "inline-block"}} onClick={handleOpen}/>    
              {caloricTargetEdit}      
                </>
        }

        return (
            <> 
             <BiEdit  className=" mb-1 edit-icon"style={{position: "relative",display: "inline-block"}} onClick={handleOpen}/>        
            </>
        );





}