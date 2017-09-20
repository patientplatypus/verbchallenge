import { combineReducers } from 'redux'
import counter from './counter'
import text from './text'
import backendhook from './backendhook'
import backendhookedit from './backendhookedit'

const reducersCombined = combineReducers({
  counter,
  text,
  backendhook,
  backendhookedit
})

export default reducersCombined
