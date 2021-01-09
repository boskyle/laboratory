import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


it("renders without rashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App/>,div);
})