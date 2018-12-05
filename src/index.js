import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { addCleaning, addShopping, addTodo, removeTodo } from './frontend/actions';
import store from './frontend/store';

// put store and actions on the window
window.store = store;
window.addCleaning = addCleaning;
window.addShopping = addShopping;
window.addTodo = addTodo;
window.removeTodo = removeTodo

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
