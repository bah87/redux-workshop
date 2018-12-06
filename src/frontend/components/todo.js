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

  render() {
    return (
      <div>
        <input
          type='text'
          placeholder='Add todo item'
          value={this.state.value}
          onChange={this.onChange}
        />
        <button>Submit</button>
        <button>Clear List</button>
        <ul>
          {this.props.items.map((item, id) => {
            return (
              <li key={id}>
                <div>{item}</div>
                <button>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}