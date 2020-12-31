import React from 'react';
import './App.css';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// comment from main branch
function App() {
  return (
    <Router>
    <div className="App">
      <Switch>

      <Route path="/" exact component={Home}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/login' exact component={Login}></Route>
      <Route path='/login/:su'></Route>
     
      </Switch>
    </div>
    </Router>
  );
}

export default App;
