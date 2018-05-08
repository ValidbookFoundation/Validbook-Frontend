import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  ADD_MESSAGE
} from '../constants/chat.js';

const initialState = {
  loaded: false,
  messages: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        messages: action.result.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      };
    default:
      return state;
  }
}
