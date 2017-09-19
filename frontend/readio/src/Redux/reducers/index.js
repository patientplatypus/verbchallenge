import { combineReducers } from 'redux'
import counter from './counter'
import text from './text'
import backendhook from './backendhook'

const reducersCombined = combineReducers({
  counter,
  text,
  backendhook
})

export default reducersCombined
