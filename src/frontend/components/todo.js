import React from 'react';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  addTodo = () => {
    this.props.addTodo(this.state.value);
    this.setState({ value: '' });
  };

  removeTodo = id => {
    return () => {
      this.props.removeTodo(id);
    };
  };

  clearList = () => {
    this.props.clearList();
  };

  render() {
    return (
      <div>
        <input
          type='text'
          placeholder='Add todo item'
          value={this.state.value}
          onChange={this.onChange}
        />
        <button onClick={this.addTodo}>Submit</button>
        <button onClick={this.clearList}>Clear List</button>
        <ul>
          {this.props.items.map((item, id) => {
            return (
              <li key={id}>
                <div>{item}</div>
                <button onClick={this.removeTodo(id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}