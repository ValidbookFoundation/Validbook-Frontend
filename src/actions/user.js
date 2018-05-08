import dataURItoBlob from '../utils/dataURItoBlob';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FB,
  LOGIN_FB_SUCCESS,
  LOGIN_FB_FAIL,
  SHOW_USER,
  SHOW_USER_SUCCESS,
  SHOW_USER_FAIL,
  FOLLOW_REQUESTED_USER,
  FOLLOW_REQUESTED_USER_SUCCESS,
  FOLLOW_REQUESTED_USER_FAIL,
  UNFOLLOW_REQUESTED_USER,
  UNFOLLOW_REQUESTED_USER_SUCCESS,
  UNFOLLOW_REQUESTED_USER_FAIL,
  UPLOAD_USER_COVER,
  UPLOAD_USER_COVER_SUCCESS,
  UPLOAD_USER_COVER_FAIL,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAIL,
  UPLOAD_AVATAR_BASE64,
  UPLOAD_USER_COVER_BASE64,
  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAIL,
  OPEN_SOCKET,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_AVATAR,
  GET_USER_AVATAR_SUCCESS,
  GET_USER_AVATAR_FAIL,
  GET_MESSAGE_FOR_SIGNATURE_LOGIN,
  GET_MESSAGE_FOR_SIGNATURE_LOGIN_SUCCESS,
  GET_MESSAGE_FOR_SIGNATURE_LOGIN_FAIL,
  LOGIN_DRIVE,
  LOGIN_DRIVE_SUCCESS,
  LOGIN_DRIVE_FAIL
} from '../constants/user';

export function getAuthUser() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/users/authorized-user')
  };
}

export function signupUser(first_name, last_name, address, backup_address) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/registration', {data: {first_name, last_name, address, backup_address}})
  };
}

export function loginUser(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', {data: {email, password}})
  };
}

export function logoutUser() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.post('/users/logout')
  };
}

export function loginSocial(provider, avatar, token) {
  return {
    types: [LOGIN_FB, LOGIN_FB_SUCCESS, LOGIN_FB_FAIL],
    promise: (client) => client.post('/auth/connect', {data: {provider, avatar, token}})
  };
}

export function getAuthSlug(globalState) {
  return globalState.user.authorized_user && globalState.user.authorized_user.slug;
}

export function getUser(slug) {
  const user_slug = slug || '';
  
  return {
    types: [SHOW_USER, SHOW_USER_SUCCESS, SHOW_USER_FAIL],
    promise: (client) => client.get(`/users/${user_slug}/requested-user`),
    user_slug
  };
}

export function getUserProfile(slug) {
  return {
    types: [GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAIL],
    promise: (client) => client.get(`/users/${slug}/profile`),
    slug
  };
}

export function followrequested_user(user_id) {
  return {
    types: [FOLLOW_REQUESTED_USER, FOLLOW_REQUESTED_USER_SUCCESS, FOLLOW_REQUESTED_USER_FAIL],
    promise: (client) => client.post('/follows/simple-user-follow', {data: {user_id}})
  };
}

export function unfollowrequested_user(user_id) {
  return {
    types: [UNFOLLOW_REQUESTED_USER, UNFOLLOW_REQUESTED_USER_SUCCESS, UNFOLLOW_REQUESTED_USER_FAIL],
    promise: (client) => client.post('/follows/simple-user-unfollow', {data: {user_id}})
  };
}

export function uploadUserCover(picture, color, name, size) {
  const formData = new FormData();
  
  if (picture) {
    formData.append('image_size', JSON.stringify(size));
    formData.append('file', dataURItoBlob(picture), name);
  }
  
  formData.append('color', color);
  
  return {
    types: [UPLOAD_USER_COVER, UPLOAD_USER_COVER_SUCCESS, UPLOAD_USER_COVER_FAIL],
    promise: (client) => client.post('/upload/user-cover', {data: formData})
  };
}

export function uploadUserCoverBase64(userCoverBase64) {
  return {
    type: UPLOAD_USER_COVER_BASE64,
    userCoverBase64
  };
}

export function uploadAvatar(picture, name, size) {
  const formData = new FormData();
  formData.append('image_size', JSON.stringify(size));
  formData.append('file[]', dataURItoBlob(picture), name);
  
  return {
    types: [UPLOAD_AVATAR, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAIL],
    promise: (client) => client.post('/upload/avatar', {data: formData})
  };
}

export function uploadAvatarBase64(avatarBase64) {
  return {
    type: UPLOAD_AVATAR_BASE64,
    avatarBase64
  };
}

export function save(profile) {
  return {
    types: [SAVE_PROFILE, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAIL],
    profile,
    promise: (client) => client.post('/engagment/profile', {data: profile})
  };
}

export function openWebsocket() {
  return {
    type: OPEN_SOCKET
  };
}

export const getUserOriginalAvatar = (user_slug) => {
  return {
    types: [GET_USER_AVATAR, GET_USER_AVATAR_SUCCESS, GET_USER_AVATAR_FAIL],
    promise: (client) => client.get(`users/${user_slug}/original-avatar`)
  };
};

export const getMessageForSignatureLogin = (address) => {
  return {
    types: [GET_MESSAGE_FOR_SIGNATURE_LOGIN, GET_MESSAGE_FOR_SIGNATURE_LOGIN_SUCCESS, GET_MESSAGE_FOR_SIGNATURE_LOGIN_FAIL],
    promise: (client) => client.get(`auth/message-for-sig`, {params:{address}})
  };
};

export const getAccessToken = (address, signature) => {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', {data: {address, signature}})
  };
};

export const loginDrive = (data) => {
  return {
    types: [LOGIN_DRIVE, LOGIN_DRIVE_SUCCESS, LOGIN_DRIVE_FAIL],
    promise: (client) => client.post('/users/authorize-client', {data})
  };
};
