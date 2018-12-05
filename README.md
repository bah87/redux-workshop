This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Setup

Clone the repo and run `npm start` to run the app in development mode.


Open [http://localhost:3000](http://localhost:3000) to view your app in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

# Intro to Redux
Redux is a JavaScript framework that manages the frontend state of a web application and gives us access to that data throughout the app. It is a lightweight library (2kb) that offers fast retrieval and updates to the store, and always acts predictably such that the same interactions will produce the same results every time.<br>

There are 3 core philosophies that govern Redux:
1. Single Source of Truth - The state for a Redux app is stored in a single, plain JavaScript object
2. State is readonly - State cannot be mutated directly. It can only be modified by dispatching actions
3. Modifications through pure functions - The reducers that accept dispatched actions and return updated state must be pure functions of the original state and the action

Let's build a simple Todo app to demonstrate how Redux works.

# Phase 01 - Redux Only
Run `git checkout phase-01` to checkout the Phase 01 branch<br>

## Actions
An action is a POJO (plain old JavaScript object) with a type property that contains information used to update the store. Actions can be dispatched (sent to the store) in response to server requests or user actions. It's common to use action creators that accept arguments in order to customize the data contained in the actions they return.

Create `actions.js` in the `frontend` folder and add the following.<br>
```
export const addCleaning = {
  type: 'ADD_TODO',
  item: 'cleaning'
};

// Same action type, but different payload
export const addShopping = {
  type: 'ADD_TODO',
  item: 'shopping'
};
```

We'll get back to how this will be used shortly.

## Reducer
A reducer is a pure function that gets called each time an action is dispatched to the store. The reducer receives an action and the current state as arguments and returns an updated state. It is "pure" because it doesn't alter the state of the program or mutate any variables passed in. It simply takes in arguments and returns a value. Redux reducers are required to be pure functions because it makes their behavior predictable and allows their effects to be reversed, a feature that we'll discuss later as it comes in handy when debugging.

Create `reducer.js` in the `frontend` folder and add the following.<br>
```
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.item
      ];
    // Always have a default that returns the current state
    default:
      return state;
  }
};

export default reducer;
```
Whenever an action is dispatched to the store, the reducer will be invoked with the current application state (defaults to an empty array if there is no state) and the action that was dispatched, which is simply a POJO with a type property and some payload. Write down what you think the reducer will return after dispatching addCleaning followed by addShopping. We'll find out shortly!

## Store
The Redux store is a single JavaScript object that comes with methods to read or update its state: `getState`, `dispatch`, `subscribe(listener)`. Any state you wish to manage with Redux will be maintained in a single store, which represents the single source of truth.

Create `store.js` in the `frontend` folder and add the following:<br>
```
import { createStore } from 'redux';
import reducer from './reducer.js';

// instantiate app's store with app's reducer
const store = createStore(reducer);
export default store;
```
The `createStore` method comes with Redux and is used to create the instance of your app's store using the reducer you just created. 

## Going a step further
Next, we add the store and the actions we just created to the window so we can test them out in Chrome. Add the following to `App.js`:<br>
```
// put store and actions on the window
window.store = store;
window.addCleaning = addCleaning;
window.addShopping = addShopping;
```

Open [http://localhost:3000](http://localhost:3000) in your browser and follow the instructions on the page to dispatch some actions and see how it affects the store!<br>

Now let's consolidate the actions you created into an action creator. Add the following to `actions.js` and put the action creator on the window so you can add any item to the state.
```
export const addTodo = item => {
  return {
    type: 'ADD_TODO',
    item
  };
};
```

Try creating another action creator, but this time it will be used to remove an item from the store. Don't forget to update your reducer to handle this new type of action.<br>

Check out the `phase-01-solution` branch to see the source code!

# Phase 02 - React + Redux
Run `git checkout phase-02` to checkout the Phase 02 branch<br>

```
import { connect } from 'react-redux';
import { addTodo, clearList, removeTodo } from '../actions';
import Todo from './todo';

const mapStateToProps = state => ({
  items: state
});

const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(addTodo(item)),
  removeTodo: item => dispatch(removeTodo(item)),
  clearList: () => dispatch(clearList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
```

```
<Provider store={store}>
  <TodoContainer />
</Provider>
```