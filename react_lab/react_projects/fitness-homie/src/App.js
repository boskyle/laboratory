import React from 'react';
import './App.css';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Feed from './Feed/Feed';
import Journal from './Journal/Journal';
import Setup from './Login/Setup';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// css font import//
import './assets/fonts/index.css';


function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/login' exact component={Login}></Route>
      <Route path='/login/setup' component={Setup}></Route>
      <Route path="/feed" exact component={Feed}></Route>
      <Route path="/journal" exact component={Journal}></Route>
      <Route path='/:username' component={Dashboard}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
