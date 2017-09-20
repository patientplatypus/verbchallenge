
// create, update, get, and delete

const backendhook = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      console.log('inside CREATE');
      return state = [];
    case 'GET':
      console.log('inside GET');
      console.log('value of action.data', action.data);
      return state = action.data;
    case 'ERROR':
      return state = [];
    default:
      console.log('inside default');
      return state;
  }
}

export default backendhook
