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
  GET_MESSAGE_FOR_SIGNATURE_LOGIN_FAIL
} from '../constants/user';

const initialState = {
  authorized_user: {},
  requested_user: {},
  requested_user_profile: {},
  loaded: false,
  userProfile: {},
  original_avatar: null,
  message: null
};

export default function signReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      };
      
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        authorized_user: action.result.data
      };

    case LOGIN_FAIL:
      console.log('LOGIN_FAIL:', action.result);
      return {
        ...state,
        loaded: true,
        loading: false,
        authorized_user: {},
        loginError: action.error
      };

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
        authorized_user: action.result.data
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error,
        authorized_user: {}
      };

    case REGISTER:
      return {
        ...state,
        registeringIn: true,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false,
        loading: false,
        authorized_user: action.result.data
      };

    case REGISTER_FAIL:
      return {
        ...state,
        authorized_user: {},
        registeringIn: false,
        loading: false,
        registerError: action.error
      };

    case LOGOUT:
      return {
        ...state,
        // loggingOut: true
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        // loggingOut: false,
        authorized_user: {},
        requested_user: {},
        loading: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error,
        authorized_user: {},
        loading: false,
      };

    case LOGIN_FB:
      return {
        ...state,
        loggingFB: true,
        loaded: false
      };

    case LOGIN_FB_SUCCESS:
      return {
        ...state,
        loggingFB: false,
        loaded: true,
        authorized_user: action.result.data,
        isAuthenticated: true
      };

    case LOGIN_FB_FAIL:
      console.log('LOGIN_FB_FAIL:', action.result);
      return {
        ...state,
        loggingFB: false,
        authorized_user: {},
        loginError: action.error,
        isAuthenticated: false
      };

    case SHOW_USER:
      const preUser = Object.assign({}, state.requested_user, {
        cover: null,
        avatar32: null,
        avatar230: null,
        first_name: null,
        last_name: null,
        id: null,
      });
      return {
        ...state,
        loadingUser: true,
        requested_user: action.user_slug !== state.requested_user.slug ? preUser : state.requested_user,
      };

    case SHOW_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        requested_user: action.result.data,
      };

    case SHOW_USER_FAIL:
      return {
        ...state,
        loadingUser: false,
        requested_user: {}
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        requested_user_profile: state.requested_user.slug !== action.slug ? {} : state.requested_user_profile,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        requested_user_profile: action.result.data
      };
      
    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        requested_user_profile: {},
        error: action.errors,
      };

    case FOLLOW_REQUESTED_USER:
      return {
        ...state,
      };

    case FOLLOW_REQUESTED_USER_SUCCESS:
      return {
        ...state,
        requested_user: Object.assign({}, state.requested_user, {
          is_follow: true
        })
      };

    case FOLLOW_REQUESTED_USER_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case UNFOLLOW_REQUESTED_USER:
      return {
        ...state,
      };

    case UNFOLLOW_REQUESTED_USER_SUCCESS:
      const unfollowrequested_user = Object.assign({}, state.requested_user, {
        is_follow: false
      });
      return {
        ...state,
        requested_user: unfollowrequested_user,
      };

    case UNFOLLOW_REQUESTED_USER_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case UPLOAD_USER_COVER: {
      return {
        ...state,
        uploadingImage: true,
      };
    }

    case UPLOAD_USER_COVER_SUCCESS: {
      const updateUserCoverImg = Object.assign({}, state.requested_user, {
        cover: action.result.data
      });

      return {
        ...state,
        uploadingImage: false,
        requested_user: updateUserCoverImg,
      };
    }

    case UPLOAD_USER_COVER_FAIL: {
      return {
        ...state,
        uploadingImage: false,
        error: action.error,
      };
    }

    case UPLOAD_AVATAR: {
      return {
        ...state,
        uploadingImage: true,
      };
    }

    case UPLOAD_AVATAR_SUCCESS: {
      const updateAvatar = Object.assign({}, state.authorized_user, {
        avatar230: action.result.data.avatar230,
        avatar32: action.result.data.avatar32
      });

      return {
        ...state,
        uploadingImage: false,
        authorized_user: updateAvatar,
      };
    }
    case UPLOAD_AVATAR_FAIL: {
      return {
        ...state,
        uploadingImage: false,
        error: action.error,
      };
    }

    case UPLOAD_AVATAR_BASE64: {
      const updateAvatarBase64 = Object.assign({}, state.authorized_user, {
        avatar230: action.avatarBase64
      });
      // const updateAvatarBase64 = state.authorized_user;
      // updateAvatarBase64.avatar230 = action.avatarBase64;

      return {
        ...state,
        authorized_user: updateAvatarBase64
      };
    }

    case UPLOAD_USER_COVER_BASE64: {
      const updateUserCoverBase64 = Object.assign({}, state.authorized_user, {
        cover: action.userCoverBase64
      });
      // const updateUserCoverBase64 = state.authorized_user;
      // updateUserCoverBase64.cover = action.userCoverBase64;

      return {
        ...state,
        authorized_user: updateUserCoverBase64
      };
    }

    case SAVE_PROFILE:
      return {
        ...state,
        saved: false,
      };
      
    case SAVE_PROFILE_SUCCESS:
      // const userProfile = Object.assign({}, state.requested_user_profile, {
      //   profile: action.profile,
      //   first_name: action.profile.first_name,
      //   last_name: action.profile.last_name,
      //   slug: action.result.data.slug
      // });

      return {
        ...state,
        saved: true,
        requested_user_profile: action.result.data
      };

    case SAVE_PROFILE_FAIL:
      return {
        ...state,
        saved: false,
        error: action.error,
      };

    case GET_USER_AVATAR_SUCCESS: {
      return {
        ...state,
        original_avatar: action.result.data.avatar
      };
    }

    case GET_MESSAGE_FOR_SIGNATURE_LOGIN_SUCCESS: {
      return {
        ...state,
        message: action.result.data.message
      };
    }

    default:
      return state;
  }
}
