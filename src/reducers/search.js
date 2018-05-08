import {
  GET_QUERY,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_BOOK,
  SEARCH_BOOK_SUCCESS,
  SEARCH_BOOK_FAIL,
  SEARCH_STORY,
  SEARCH_STORY_SUCCESS,
  SEARCH_STORY_FAIL,
  CLEAR_USER_RESULT,
  SEARCH_NEXT_PEOPLE,
  SEARCH_NEXT_PEOPLE_SUCCESS,
  SEARCH_NEXT_PEOPLE_FAIL
} from '../constants/search.js';

const initialState = {
  query: '',
  foundUsers: [],
  foundBooks: [],
  foundStories: [],
  pagination: 2,
  over: false
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUERY:
      return {
        ...state,
        query: action.query
      };

    case SEARCH_USER:
      return {
        ...state,
        searching: true,
        pagination: 2,
        over: false
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searching: false,
        foundUsers: action.result.data.users
      };
    case SEARCH_USER_FAIL:
      return {
        ...state,
        searching: false,
        error: action.error,
        foundUsers: []
      };

    case SEARCH_BOOK:
      return {
        ...state,
        searching: true,
      };
    case SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        searching: false,
        foundBooks: action.result.data
      };
    case SEARCH_BOOK_FAIL:
      return {
        ...state,
        searching: false,
        error: action.error,
      };

    case SEARCH_STORY:
      return {
        ...state,
        searching: true,
      };
    case SEARCH_STORY_SUCCESS:
      return {
        ...state,
        searching: false,
        foundStories: action.result.data
      };
    case SEARCH_STORY_FAIL:
      return {
        ...state,
        searching: false,
        error: action.error,
      };

    case CLEAR_USER_RESULT:
      return {
        ...state,
        foundUsers: [],
      };


    case SEARCH_NEXT_PEOPLE:
      return {
        ...state
      };

    case SEARCH_NEXT_PEOPLE_SUCCESS:
      return {
        ...state,
        over: action.result.data.users.length === 0,
        foundUsers: [...state.foundUsers, ...action.result.data.users],
        pagination: state.pagination + 1
      };

    // case SEARCH_NEXT_PEOPLE_FAIL:
    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}
