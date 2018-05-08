import {
  GET_ALL_PHOTOS,
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_FAIL,
  GET_PROFILE_PHOTOS,
  GET_PROFILE_PHOTOS_SUCCESS,
  GET_PROFILE_PHOTOS_FAIL,
  GET_COVERS_PHOTOS,
  GET_COVERS_PHOTOS_SUCCESS,
  GET_COVERS_PHOTOS_FAIL
} from '../constants/photo';

export const getAllUserPhotos = (user_id) => ({
  types: [GET_ALL_PHOTOS, GET_ALL_PHOTOS_SUCCESS, GET_ALL_PHOTOS_FAIL],
  promise: (client) => client.get('/photos', {params: {user_id}})
});

export const getProfilePhotos = (user_id) => {
  return {
    types: [GET_PROFILE_PHOTOS, GET_PROFILE_PHOTOS_SUCCESS, GET_PROFILE_PHOTOS_FAIL],
    promise: (client) => client.get('/photos/avatar', {params: {user_id}})
  };
};

export const getUserCoverPhotos = (user_id) => {
  return {
    types: [GET_COVERS_PHOTOS, GET_COVERS_PHOTOS_SUCCESS, GET_COVERS_PHOTOS_FAIL],
    promise: (client) => client.get('/photos/cover', {params: {user_id}})
  };
};
