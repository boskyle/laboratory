import React from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {loadFromLocalStorage} from '../LocalStorage';

// remove the underline for Link component from router-dom
const linkStyle = {
    textDecoration: 'none'    
};








const Home = () => {

    const history = useHistory();

    useEffect( () => {
        if (loadFromLocalStorage("isLogged").isLogged[0] === true) {
              // get username (isLogged is an array [0](state of logged in) [1] (an array of logged in userId and username))
            history.push(`/${loadFromLocalStorage('isLogged').isLogged[1][1]}`);
        }
    })


    return (
        <div className="container-fluid">
            
            <nav className="navbar navbar-expand-sm navbar-light">
                {/* <a className="navbar-brand" href="#">FM</a> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggleMeNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                 </button>
              
             <div className="collapse navbar-collapse justify-content-center" id="toggleMeNav">

                <ul className="navbar-nav">
                    <Link to="/login" style={linkStyle}>
                        <li className="nav-item">
                        <span className="nav-link">Log In</span>
                        </li>
                    </Link>
                    <Link to="/register" style={linkStyle}>
                        <li className="nav-item">
                        <span className="nav-link">Sign Up</span>
                        </li>
                    </Link>

                </ul>

             </div>
            </nav>
            <div className="container d-flex flex-column container-about">
                <h2 className="mx-auto mt-2 text-center display-2">The ultimate fitness tracker.</h2>
                <div className="container container-info mt-5">
                    <div className="flex-item"><h4>Track your calories.</h4>
                    </div>
                    <div className="flex-item"><h4>Easy to use meal planner.</h4> </div>
                    <div className="flex-item"><h4>See your entire progress.</h4> </div>
                </div>
            </div>
        
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#706897" fillOpacity="1" d="M0,32L34.3,74.7C68.6,117,137,203,206,224C274.3,245,343,203,411,197.3C480,192,549,224,617,229.3C685.7,235,754,213,823,208C891.4,203,960,213,1029,229.3C1097.1,245,1166,267,1234,234.7C1302.9,203,1371,117,1406,74.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
        </div>
    );

}



export default Home;
