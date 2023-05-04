const deactReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_DEACT':
      return true;
      break;
    case 'SET_ACTIVE':
      return false;
      break;
    default:
      return state;
      break;
  }
}

export default deactReducer;