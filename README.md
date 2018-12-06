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
A reducer is a pure function that gets called each time an action is dispatched to the store. The reducer receives an action and the current state as arguments and returns an updated state. It is "pure" because it doesn't alter the state of the program or mutate any variables passed in. It simply takes in arguments and returns a value. Redux reducers are required to be pure functions because it makes their behavior predictable and allows their effects to be reversed, a feature that comes in handy when debugging.

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
Run `git checkout phase-02` to checkout the Phase 02 branch.<br>

## Provider
Now that we have an idea how the application state is updated in the Redux store, you might be wondering how we get that information to various React components. The store is created in the entry file, so for a small app we could just pass it down to each component through props. However, for bigger apps with lots of deeply nested components, it becomes cumbersome and error-prone to pass props down the entire component tree. This process is called `prop-threading` and it's an anti-pattern. To avoid this, we can use the `Provider` and `connect` API that comes with the `react-redux` package.<br>

`Provider` is simply a React component that receives the store as a prop and can pass the store without explicit threading. It does this by setting the store context (an invisible prop). We simply wrap the component that we render in our entry file so that all other deeply nested components can get access to it.<br>

In our entry file, `App.js`, return the following from the `render` method. You'll have to import the store and `TodoContainer`, which we'll implement in the next section.
```
<Provider store={store}>
  <TodoContainer />
</Provider>
```

Components that need access to the store context will have to `connect()`, another method provided by `react-redux`, which we'll get to next.
## Containers
 There is quite a bit of logic involved in connecting a React component to the Redux store. In order to avoid cluttering our views, we use containers. We'll refer to our views as presentational components, since they are not aware of Redux. They simply read data passed in through props and render the data as needed. Any actions that we wish to dispatch from user interaction is done by invoking callbacks passed in through props. Containers are the components that actually retrieve the data from the Redux store and pass it to the presentational components. As such, containers are often called connected components. They are connected because they subscribe to the store and select which pieces of state and which actions should be passed along to the presentational components.<br>

Let's try this out. Create a file called `todo-container.js` and save it in `frontend/components`.<br>

Import the actions we created in Phase 01 with:
```
import { addTodo, clearList, removeTodo } from '../actions';
```

Next add a function called `mapStateToProps` which will map a slice of the app state to the props object:
```
const mapStateToProps = state => ({
  items: state
});
```
In our case, state is just an array of strings, which represent the items in our todo list. If state was a more complex object, it might contain a property called todoItems that points to the items we wish to display. In that case the above line would look like this:
```
items: state.todoItems
```

Create a similar function to map action-dispatches to props:
```
const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(addTodo(item)),
  removeTodo: id => dispatch(removeTodo(id)),
  clearList: () => dispatch(clearList())
});
```

### Quick note
Container components should generally be used for bigger components with more complex state. We don't need to connect every component to the store. Let's say you have a `List` component like the one we're building and you want to break up the individual list items into a separate `ListItem` component. Assuming `List` doesn't have a parent component that also needs to be connected, it will have a container. However, you don't need a container for `ListItem`, as the `List` component can pass props to it directly.<br>

In order to actually connect the data to our presentational component, we'll use a method conveniently called `connect` that comes with the `react-redux` package.

## Connect
The `connect` method gives us a powerful way to access the state held by the store. `connect` is a higher-order function, as it takes in a React component and returns a React component. It allows us to pass individual pieces of the application state and specific action-dispatches to a React component as props.<br>

The `connect` method accepts two key arguments (in addition to some optional ones that are out of scope). First is `mapStateToProps(state, [ownProps])`. As we've already seen, it takes in the entire app state and allows you to select slices to pass as props. In addition, it also accepts ownProps as an optional argument, which can be used when we want to pass in props directly from the parent (not from the store). `connect` also accepts `mapDispatchToProps`, which as we've seen will allow us to pass callbacks as props to the presentational component, which will dispatch actions to the store when invoked.<br>

Add the following to `todo-container.js`:
```
import { connect } from 'react-redux';
import Todo from './todo';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
```

`Todo` in the above code snippet is our presentational component. `Todo` will now be passed a props object that has `items`, `addTodo`, `removeTodo` and `clearList`. Open up `frontend/components/todo.js` and add methods to the appropriate buttons so that when a user clicks them, they will dispatch the proper actions.<br>

That's it! You should now understand how Redux manages state with actions and reducers and the store (all provided by the `redux` package), as well as how React components get access to the store using Provider and connect from `react-redux` package. You should also have an idea how React components might use state and action-dispatches. Your app should now allow users to add todo items to the list, remove individual items, or clear the entire list. Be sure to run `git checkout phase-02` to look at the final source code! It's also a good idea to put debuggers in your actions, reducer and components to get a feel for how the data flows when you click a button that dispatches an action.
