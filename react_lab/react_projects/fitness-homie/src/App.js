import React from 'react';
import './App.css';
import Home from './Home/Home';
import BmrCalculator from './BmrCalculator/BmrCalculator';
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
      <Route path='/login' component={Login}></Route>
      <Route path='/bmr' component={BmrCalculator}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
