import axios from 'axios';
import {
  FOLLOW_USER,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  UNFOLLOW_USER,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
  LOAD_PEOPLE_FOLLOWING,
  LOAD_PEOPLE_FOLLOWING_SUCCESS,
  LOAD_PEOPLE_FOLLOWING_FAIL,
  LOAD_PEOPLE_FOLLOWERS,
  LOAD_PEOPLE_FOLLOWERS_SUCCESS,
  LOAD_PEOPLE_FOLLOWERS_FAIL,
  LOAD_PEOPLE_SUGGESTED,
  LOAD_PEOPLE_SUGGESTED_SUCCESS,
  LOAD_PEOPLE_SUGGESTED_FAIL,
  LOAD_PEOPLE_ALL,
  LOAD_PEOPLE_ALL_SUCCESS,
  LOAD_PEOPLE_ALL_FAIL,
  LOAD_WHO_TO_FOLLOW_PEOPLE,
  LOAD_WHO_TO_FOLLOW_PEOPLE_SUCCESS,
  LOAD_WHO_TO_FOLLOW_PEOPLE_FAIL,
  LOAD_USER_PEOPLE,
  LOAD_USER_PEOPLE_SUCCESS,
  LOAD_USER_PEOPLE_FAIL,
  CLEAR_PEOPLE_BLOCK,
  FILTER_WHO_TO_FOLLOW_PEOPLE,
  LOAD_NEXT_PEOPLE_ALL,
  LOAD_NEXT_PEOPLE_ALL_SUCCESS,
  LOAD_NEXT_PEOPLE_ALL_FAIL,
  LOAD_NEXT_FOLLOWING,
  LOAD_NEXT_FOLLOWING_SUCCESS,
  LOAD_NEXT_FOLLOWING_FAIL,
  LOAD_NEXT_FOLLOWERS,
  LOAD_NEXT_FOLLOWERS_SUCCESS,
  LOAD_NEXT_FOLLOWERS_FAIL,
  LOAD_NEXT_SUGGESTED,
  LOAD_NEXT_SUGGESTED_SUCCESS,
  LOAD_NEXT_SUGGESTED_FAIL
} from '../constants/follow';

export function isLoadedFollowing(globalState) {
  return globalState.follow && globalState.follow.loaded.loadedFollowing;
}

export function isLoadedFollowers(globalState) {
  return globalState.follow && globalState.follow.loaded.loadedFollowers;
}

export function isLoadedSuggested(globalState) {
  return globalState.follow && globalState.follow.loaded.loadedSuggested;
}

export function clearPeopleBlock() {
  return {
    type: CLEAR_PEOPLE_BLOCK
  };
}

export function follow(user_id, choiceFollow) {
  return {
    types: [FOLLOW_USER, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAIL],
    user_id,
    choiceFollow,
    promise: (client) => client.post('/follows/simple-user-follow', { data: { user_id, channel_id: '' }})                       //todo:  add channel_id
  };
}

export function unfollow(user_id, choiceFollow) {
  console.log('Choice of follow', choiceFollow);
  return {
    types: [UNFOLLOW_USER, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAIL],
    user_id,
    choiceFollow,
    promise: (client) => client.post('/follows/simple-user-unfollow', { data: { user_id, channel_id: '' }})
  };
}

export function loadPeopleAll(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PEOPLE_ALL, LOAD_PEOPLE_ALL_SUCCESS, LOAD_PEOPLE_ALL_FAIL],
    promise: (client) => client.get('/people/all', {params: {user_slug}})
  };
}

export function loadPeopleFollowing(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PEOPLE_FOLLOWING, LOAD_PEOPLE_FOLLOWING_SUCCESS, LOAD_PEOPLE_FOLLOWING_FAIL],
    promise: (client) => client.get('/people/following', { params: { user_slug }})
  };
}

export function loadPeopleFollowers(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PEOPLE_FOLLOWERS, LOAD_PEOPLE_FOLLOWERS_SUCCESS, LOAD_PEOPLE_FOLLOWERS_FAIL],
    promise: (client) => client.get('/people/followers', { params: { user_slug }})
  };
}

export function loadPeopleSuggested(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PEOPLE_SUGGESTED, LOAD_PEOPLE_SUGGESTED_SUCCESS, LOAD_PEOPLE_SUGGESTED_FAIL],
    promise: (client) => client.get('/people/suggested', { params: { user_slug }})
  };
}

export function loadWhoToFollow() {
  return {
    types: [LOAD_WHO_TO_FOLLOW_PEOPLE, LOAD_WHO_TO_FOLLOW_PEOPLE_SUCCESS, LOAD_WHO_TO_FOLLOW_PEOPLE_FAIL],
    promise: (client) => client.get('/follows/who-to-follow')
  };
}

export function loadUserPeople(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_USER_PEOPLE, LOAD_USER_PEOPLE_SUCCESS, LOAD_USER_PEOPLE_FAIL],
    promise: (client) => client.get('/people/block', { params: { user_slug }})
  };
}

// TODO handle errors
export function filterWhoToFollowUsers(id) {
  return dispatch => {
    return axios('http://api-test.validbook.org/v1/follows/who-to-follow')
      .then(response => {
        if (response.data && response.data.data) {
          dispatch({
            type: FILTER_WHO_TO_FOLLOW_PEOPLE,
            payload: {
              whoToFollowList: response.data.data,
              id
            }
          });
        }
      });
  };
}

export const getNextPeople = (user_slug, pagination) => {
  return {
    types: [LOAD_NEXT_PEOPLE_ALL, LOAD_NEXT_PEOPLE_ALL_SUCCESS, LOAD_NEXT_PEOPLE_ALL_FAIL],
    promise: (client) => client.get('/people/all', {params: {page: pagination, user_slug}})
  };
};

export const getNextFollowing = (user_slug, pagination) => {
  return {
    types: [LOAD_NEXT_FOLLOWING, LOAD_NEXT_FOLLOWING_SUCCESS, LOAD_NEXT_FOLLOWING_FAIL],
    promise: (client) => client.get('/people/following', {params: {page: pagination, user_slug}})
  };
};

export const getNextFollowers = (user_slug, pagination) => {
  return {
    types: [LOAD_NEXT_FOLLOWERS, LOAD_NEXT_FOLLOWERS_SUCCESS, LOAD_NEXT_FOLLOWERS_FAIL],
    promise: (client) => client.get('/people/followers', {params: {page: pagination, user_slug}})
  };
};

export const getNextSuggested = (user_slug, pagination) => {
  return {
    types: [LOAD_NEXT_SUGGESTED, LOAD_NEXT_SUGGESTED_SUCCESS, LOAD_NEXT_SUGGESTED_FAIL],
    promise: (client) => client.get('/people/suggested', {params: {page: pagination, user_slug}})
  };
};
