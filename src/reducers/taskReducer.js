import {
  LOAD_TASKS_REQUEST, LOAD_TASKS_SUCCESS, LOAD_TASKS_FAIL,
  ADD_TASK, UPDATE_TASK, DELETE_TASK
} from '../constants/taskConstants'

const initialState = {
  items: [],
  loading: false,
  error: null
}

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TASKS_REQUEST:
      return { ...state, loading: true, error: null }

    case LOAD_TASKS_SUCCESS:
      return { ...state, loading: false, items: action.payload }

    case LOAD_TASKS_FAIL:
      return { ...state, loading: false, error: action.payload }

    case ADD_TASK:
      return { ...state, items: [...state.items, action.payload] }

    case UPDATE_TASK:
      return {
        ...state,
        items: state.items.map(t => t.id === action.payload.id ? action.payload : t)
      }

    case DELETE_TASK:
      return {
        ...state,
        items: state.items.filter(t => t.id !== action.payload)
      }

    default:
      return state
  }
}
