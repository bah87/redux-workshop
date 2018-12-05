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