import { createStore } from 'redux';
import reducer from './reducer.js';

// instantiate app's store with app's reducer
const store = createStore(reducer);
export default store;