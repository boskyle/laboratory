import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const title = React.createElement(
  'h1', {id: 'title', className: 'header'},'Hello World!'
)

// arrow function, instead of the traditional function
const Welcome = ({name}) => {

return (
  <section> 
<p>Welcome {name}</p>
<Season currentSeason='Winter'></Season>
  </section>
);
}

const Season = ({currentSeason}) => {
  if (currentSeason == 'Winter') {
    return <h2>SKI RESORT IS OPEN</h2>
  } else if (currentSeason == 'Summer') {
    return <h2>BEACH IS OPEN</h2>
  }
}


ReactDOM.render(
  
  <Welcome name="Boswell"/>,
  document.getElementById('root')
);

