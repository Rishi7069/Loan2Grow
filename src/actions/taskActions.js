import {
  LOAD_TASKS_REQUEST, LOAD_TASKS_SUCCESS, LOAD_TASKS_FAIL,
  ADD_TASK, UPDATE_TASK, DELETE_TASK
} from '../constants/taskConstants'

export const loadTasks = () => async (dispatch) => {
  dispatch({ type: LOAD_TASKS_REQUEST })
  try {
    const res = await fetch('/tasks.json')
    const data = await res.json()
    dispatch({ type: LOAD_TASKS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: LOAD_TASKS_FAIL, payload: error.message })
  }
}

export const addTask = (task) => ({ type: ADD_TASK, payload: task })
export const updateTask = (task) => ({ type: UPDATE_TASK, payload: task })
export const deleteTask = (id) => ({ type: DELETE_TASK, payload: id })
