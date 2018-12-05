import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Todo List App</h1>
        <ol className='App-instructions'>
          <li>Open Dev Tools (option + command + i)</li>
          <li>The Redux store and actions (addCleaning, addShopping) are available on the window</li>
          <li>Dispatch actions with store.dispatch(addCleaning)</li>
          <li>Use store.getState() to see how the application state is affected!</li>
        </ol>
      </div>
    );
  }
}

export default App;
