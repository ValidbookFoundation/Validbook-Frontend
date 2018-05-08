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

export function getQuery(query) {
  return {
    type: GET_QUERY,
    query
  };
}

export const searchUser = (q) => ({
  types: [SEARCH_USER, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL],
  promise: (client) => client.get('/search/users', { params: { q }})
});

export function searchBook(globalState) {
  const q = globalState.search.query;
  return {
    types: [SEARCH_BOOK, SEARCH_BOOK_SUCCESS, SEARCH_BOOK_FAIL],
    promise: (client) => client.get('/search/books', { params: { q }})
  };
}

export function searchStory(globalState) {
  const q = globalState.search.query;
  return {
    types: [SEARCH_STORY, SEARCH_STORY_SUCCESS, SEARCH_STORY_FAIL],
    promise: (client) => client.get('/search/stories', { params: { q }})
  };
}

export function newSearchUser(str) {
  return {
    types: [SEARCH_USER, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL],
    promise: (client) => client.get('/search/users', { params: { q: str }})
  };
}

export function clearUserResult() {
  return {
    type: CLEAR_USER_RESULT
  };
}

export const getNextUsers = (str, pagination) => {
  return {
    types: [SEARCH_NEXT_PEOPLE, SEARCH_NEXT_PEOPLE_SUCCESS, SEARCH_NEXT_PEOPLE_FAIL],
    promise: (client) => client.get('/search/users', { params: { q: str, page: pagination }})
  };
};

