
import {
  LOAD_BOOKTREE,
  LOAD_BOOKTREE_SUCCESS,
  LOAD_BOOKTREE_FAIL,
  GET_ARR_CHECKBOX
} from '../constants/book';

const initial_state = {
  books_tree: [],
  loaded: false,
  selected_books: []
};

export default function bookReducer(state = initial_state, action) {
  switch (action.type) {
    case LOAD_BOOKTREE:
      return {
        ...state,
        loading: true,
      };
    case LOAD_BOOKTREE_SUCCESS:
      return {
        ...state,
        loaded: true,
        books_tree: action.result.data
      };
    case LOAD_BOOKTREE_FAIL:
      return {
        ...state,
        error: action.error,
        loaded: true
      };
    case GET_ARR_CHECKBOX:
      return {
        ...state,
        selected_books: action.checkbox
      };

    default:
      return state;
  }
}
