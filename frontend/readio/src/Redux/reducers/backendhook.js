
import axios from 'axios'

// create, update, get, and delete

const backendhook = (state = 0, action) => {
  switch (action.type) {
    case 'CREATE':
      axios.post('http://localhost:3000/newmessage',{
        message: action.message,
        title: action.title,
        secret: action.secret
      })
      .then((response)=>{
        console.log('response is: ', response);
      })
      .catch((error)=>{
        console.log('error is: ', error);
      })
    case 'UPDATE':
      return state = state - 1;
    case 'GET':
      return state = state - 1;
    case 'DELETE':
      return state = state - 1;
    default:
      return state
  }
}

export default backendhook
