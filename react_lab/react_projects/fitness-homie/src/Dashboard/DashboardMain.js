import React from 'react';
import './dashboard.css';
import './Burger/burger.css';
import {slide as Menu} from 'react-burger-menu';
import {Link} from 'react-router-dom';

const DashboardMain = (props) => {

    return (

        <div id="outer-container">
            <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                <Link to="/feed">Feed</Link>
                </Menu>
            <main id="page-wrap" className="container-fluid w-100 text-center">
            <h2 className="display-5 mx-auto">{props.userInfo.username}</h2>
            {/* dashboard content goes here */}
            </main>

        </div>
    );
}




export default DashboardMain;