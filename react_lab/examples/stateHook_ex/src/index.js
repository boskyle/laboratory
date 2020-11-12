import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';





// arrow function, instead of the traditional function
const Welcome = ({name}) => {

  const [count, setCount] = useState(0);

return (
  <section> 
<p>Welcome {name}</p>
<button onClick={() => setCount(count +1)}>Click me ;)</button>
<p>You clicked me {count} times.</p>
  </section>
);
}








ReactDOM.render(
  
  <Welcome name="Boswell"/>,
  document.getElementById('root')
);

