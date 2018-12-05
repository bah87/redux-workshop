export const addCleaning = {
  type: 'ADD_TODO',
  item: 'cleaning'
};

// Same action type, but different payload
export const addShopping = {
  type: 'ADD_TODO',
  item: 'shopping'
};

// action creator
export const addTodo = item => {
  return {
    type: 'ADD_TODO',
    item
  };
};

export const removeTodo = item => {
  return {
    type: 'REMOVE_TODO',
    item
  };
};

export const clearList = () => {
  return {
    type: 'CLEAR_LIST'
  };
};