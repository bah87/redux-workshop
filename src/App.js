import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './frontend/store';
import TodoContainer from './frontend/components/todo-container';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TodoContainer />
      </Provider>
    );
  }
}

export default App;
