const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.item
      ];
    case 'REMOVE_TODO':
      return state.filter((_item, id) => id !== action.id);
    // Always have a default that returns the current state
    case 'CLEAR_LIST':
      return [];
    default:
      return state;
  }
};

export default reducer;