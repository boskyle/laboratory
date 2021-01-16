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

import {saveToLocalStorage} from './LocalStorage';

// the other argument is optional, it gives me the redux dev tool
const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

// persist the state to redux
store.subscribe (() => {
saveToLocalStorage(store.getState(),'isLogged');
})

ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>
,document.getElementById('root')
);

reportWebVitals();
