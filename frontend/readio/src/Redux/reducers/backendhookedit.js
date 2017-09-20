const backendhookedit = (state = [], action) => {
  switch (action.type) {
    case 'DELETE':
      console.log('inside DELETE');
      console.log('value of action.data: ', action.data);
      return state = action.data;
    case 'UPDATE':
      console.log('inside UPDATE');
      console.log('value of action.data: ', action.data);
      return state = action.data;
    case 'ERROR':
      return state = [];
    default:
      console.log('inside default');
      return state;
  }
}

export default backendhookedit
