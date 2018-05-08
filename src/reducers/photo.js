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

const initialState = {
  all_photos: [],
  loaded: false,
  profile_photos: [],
  cover_photos: [],
  pagination: {
    all_photos: 1,
    cover_photos: 1,
    profile_photos: 1
  }
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PHOTOS_SUCCESS: {
      return {
        ...state,
        all_photos: action.result.data,
        pagination: Object.assign({}, state.pagination, {
          all_photos: 2
        }),
        loaded: true
      };
    }
    case GET_PROFILE_PHOTOS_SUCCESS: {
      return {
        ...state,
        profile_photos: action.result.data,
        pagination: Object.assign({}, state.pagination, {
          profile_photos: 2
        })
      };
    }
    case GET_COVERS_PHOTOS_SUCCESS: {
      return {
        ...state,
        cover_photos: action.result.data,
        pagination: Object.assign({}, state.pagination, {
          cover_photos: 2
        })
      };
    }
    default:
      return state;
  }
};

export default photoReducer;
