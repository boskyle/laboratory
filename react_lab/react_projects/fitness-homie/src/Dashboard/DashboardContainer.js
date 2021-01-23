import React from 'react';
import {useState,useEffect} from 'react';
import {useHistory,useParams} from "react-router-dom";
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadBasicInfo,LoadFitnessInfo,getUidFromUsername} from './db-endpoints/loadProfile';
import  UserProfile from './UserProfile/UserProfile';
import '../assets/fonts/index.css';
import "./dashboard.css";
import AsyncSelect from 'react-select/async';
import {searchBoxStyle} from './SearchBox/SearchBox';
import {useDispatch} from 'react-redux';
import {userLoggedOut} from '../redux/actions';
import Navigation from './Navigation/Navigation';



const DashboardContainer = (props) => {

}

