import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// const title = React.createElement(
//   'h1', {id: 'title', className: 'header'},'Hello World!'
// )


var booklist = [
  {'title':'Hunger','author':'Roxane Gray','pages':320},
  {'title':'Boat','author':'John Willis','pages':104}
]

// arrow function, instead of the traditional function
const Book = ({title,author,pages}) => {

return (
  <section> 
    <h2>{title}</h2>
    <p>by: {author}</p>
    <p>Pages: {pages} pages.</p>
  </section>
);
}


const Library = ({books}) => {
  return (
    <div>
      {/* maps over an object with the key-pair */}
      {books.map(
        (book, i) =>
        <Book
        key={i}
        title={book.title}
        author={book.author}
        pages={book.pages}
        />
      )}

    </div>
  )

}





ReactDOM.render(
  
  <Library books={booklist}/>,
  document.getElementById('root')
);

