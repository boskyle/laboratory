import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// redux stuff
import {createStore} from 'redux';
// note that that the file that combines all your reducers is named 'index.js', thus no need to explicitly give ./redux/reducers/index.js, it already knows
import allReducers from './redux/reducers';
// enables our entire app to gain access to our global state
import {Provider} from 'react-redux';

function saveToLocalStorage(state){
    try {
        const stringyState = JSON.stringify(state);
        localStorage.setItem('isLogged',stringyState);
    } catch (e) {console.log(e)}
}


// the other argument is optional, it gives me the redux dev tool
const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

// persist the state to redux
store.subscribe (() => {
saveToLocalStorage(store.getState());
})


ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>
,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
