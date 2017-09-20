import axios from 'axios';


//These actions are in here as dummies - I don't use them, but in many
//assignments you will have previous hooks that are in the REDUX file
//you are working with. Consider these hooks from other people's files.

export const counterADD = () => {
  return {
    type: 'COUNTER_ADD',
  }
}

export const counterSUBTRACT = () => {
  return {
    type: 'COUNTER_SUBTRACT',
  }
}

export const textCHANGE = newtext => {
  console.log('value of newtext is ', newtext);
  return{
    type: 'TEXT_CHANGE',
    text: newtext
  }
}

//Here's the hooks I actually use!

export const messageCREATE = ({title, message, secret}) => {
  console.log('inside messageCREATE');
  console.log('value of ');
  console.log('secret: ', secret);
  console.log('message: ', message);
  console.log('title:', title);
  return(dispatch) => {
    axios.post('http://localhost:3000/newmessage',{
      message: message,
      title: title,
      secret: secret
    })
    .then((response)=>{
      dispatch(AXIOSSUCCESS([], "CREATE"))
    })
    .catch((error)=>{
      console.log('error is: ', error);
      dispatch(AXIOSERROR())
    })
  }
}


export const messageGET = () => {
  return (dispatch)=>{
    console.log('inside GET ACTION');
    var getarray = [];
    axios.get('http://localhost:3000/allmessages')
    .then((response)=>{
      console.log('response is: ', response);
      response.data.forEach(item=>{
        getarray.push(item)
      })
      console.log('value of temparray: ', getarray);
      dispatch(AXIOSSUCCESS(getarray, "GET"))
    })
    .catch((error)=>{
      console.log('error is: ', error);
      dispatch(AXIOSERROR())
    })
  }
}

export const AXIOSSUCCESS = (array, whereto) => {
  return{
    type: whereto,
    data: array
  }
}

export const AXIOSERROR = () => {
  return{
    type: "ERROR"
  }
}

export const messageSEARCH = title => {
  return{
    type: 'SEARCH',
    title: title
  }
}

export const messageUPDATE = (message, secret) => {
  var url = 'http://localhost:3000/editpost/'+message._id
  return (dispatch)=>{
    console.log('inside UPDATE ACTION');
    var getarray = [];
    axios.patch(url, {
      message: message,
      secret: secret
    })
    .then((response)=>{
      console.log('response is: ', response);
      dispatch(AXIOSSUCCESS(response, "UPDATE"))
    })
    .catch((error)=>{
      console.log('error is: ', error);
      dispatch(AXIOSERROR())
    })
  }
}

export const messageDELETE = (message, secret) => {
  return (dispatch) => {
    console.log('inside DELETE ACTION');
    console.log('value of secret: ', secret);
    var url = 'http://localhost:3000/deletepost/'+message._id+'/'+secret
    axios.delete(url, {
      message: message,
      secret: secret
    })
    .then((response)=>{
      console.log('response is ', response);
      dispatch(AXIOSSUCCESS(response, 'DELETE'))
    })
    .catch((error)=>{
      console.log('error is ', error);
      dispatch(AXIOSERROR())
    })
  }
}
