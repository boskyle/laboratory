import React from 'react';
import './searchBox.css';

const SearchBox = ({placeholder}) => {
    return (
            <input type="search"
            className="search"
            placeholder={placeholder}
            />
    );


}

export default SearchBox;