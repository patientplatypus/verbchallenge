
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
  return{
    type: 'CREATE',
    title: title,
    message: message,
    secret: secret
  }
}

export const messageDELETE = messageID => {
  return{
    type: 'DELETE',
    messageID: messageID
  }
}

export const messageGET = title => {
  return{
    type: 'GET',
    title: title
  }
}

export const messageUPDATE = ({title, message, secret}) => {
  return{
    type: 'UPDATE',
    title: title,
    message: message,
    secret: secret
  }
}
