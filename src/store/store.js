import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { taskReducer } from '../reducers/taskReducer'

const reducer = combineReducers({
  tasks: taskReducer
})


const persistedState = (() => {
  try {
    const saved = localStorage.getItem('tasks_state')
    return saved ? JSON.parse(saved) : undefined
  } catch {
    return undefined
  }
})()


const store = createStore(reducer, persistedState, applyMiddleware(thunk))



store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem('tasks_state', JSON.stringify(state))
  } catch {}
})

export default store
