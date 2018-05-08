import { like, likeStorySuccess } from '../utils/like';
import { createNewComment, createNewCommentSuccess } from '../utils/comment';
import {
  LOAD_SHOW_USER_STORIES,
  LOAD_SHOW_USER_STORIES_SUCCESS,
  LOAD_SHOW_USER_STORIES_FAIL,
  LOAD_NEXT_SHOW_USER_STORIES,
  LOAD_NEXT_SHOW_USER_STORIES_SUCCESS,
  LOAD_NEXT_SHOW_USER_STORIES_FAIL,
  CREATE_STORY,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_FAIL,
  CLEAR_PAGINATION,
  LIKE_STORY,
  LIKE_STORY_SUCCESS,
  LIKE_STORY_FAIL,
  RELOG_STORY,
  RELOG_STORY_SUCCESS,
  RELOG_STORY_FAIL,
  SET_VISIBILITY_STORY,
  SET_VISIBILITY_STORY_SUCCESS,
  SET_VISIBILITY_STORY_FAIL,
  GET_STORY,
  GET_STORY_SUCCESS,
  GET_STORY_FAIL,
  DELETE_STORY,
  DELETE_STORY_SUCCESS,
  DELETE_STORY_FAIL,
  PIN_STORY,
  PIN_STORY_SUCCESS,
  PIN_STORY_FAIL,
  CREATE_NEW_COMMENT,
  CREATE_NEW_COMMENT_SUCCESS,
  CREATE_NEW_COMMENT_FAIL,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  VIEW_MORE_COMMENTS,
  VIEW_MORE_COMMENTS_SUCCESS,
  VIEW_MORE_COMMENTS_FAIL,
  CLEAR_STORIES,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
  SHOW_COMMENT,
  SHOW_COMMENT_SUCCESS,
  SHOW_COMMENT_FAIL
} from '../constants/story.js';

const initialState = {
  loaded: false,
  stories: [],
  single_story: null,
  over: false,
  pagination: 2,
  creatingNewComment: false
};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOW_USER_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_SHOW_USER_STORIES_SUCCESS:
      const dataStories = action.result.data;
      dataStories.map(story => {
        story.paginationComment = 1;
        story.comments.map(comment => {
          if (comment.children.length === 1) {
            comment.children[0].hidden = true;
          }
        });
      });

      return {
        ...state,
        loading: false,
        loaded: true,
        over: action.result.data.length === 0,
        stories: dataStories
      };
    case LOAD_SHOW_USER_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        stories: []
      };

    case LOAD_NEXT_SHOW_USER_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_NEXT_SHOW_USER_STORIES_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        over: action.result.data.length === 0,
        stories: [...state.stories, ...action.result.data],
        pagination: action.pagination + 1
      };
    case LOAD_NEXT_SHOW_USER_STORIES_FAIL:
      console.log('LOAD_NEXT_SHOW_USER_STORIES_FAIL', action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
        stories: [],
        over: true
      };

    case CREATE_STORY:
      return {
        ...state,
        creating: true
      };
    case CREATE_STORY_SUCCESS:
      console.log(action);
      return {
        ...state,
        creating: false,
        created: true,
        stories: [...action.result.data, ...state.stories]
      };
    case CREATE_STORY_FAIL:
      return {
        ...state,
        creating: false,
        created: false
      };

    case CLEAR_PAGINATION: {
      return {
        ...state,
        over: false
      };
    }

    case LIKE_STORY: {
      return {
        ...state,
        liking: true,
        stories:
          action.place === 'storyline' && like(state.stories, action),
        single_story:
          action.place === 'storyPage' && like(state.single_story, action)
      };
    }
    case LIKE_STORY_SUCCESS: {
      const notification = action.result.data.notification;
      if (notification) {
        notification.type = 'notification-like';
        socket.send(JSON.stringify(notification));
      }
      return {
        ...state,
        liking: false,
        stories:
          action.place === 'storyline' &&
          likeStorySuccess(state.stories, action),
        single_story:
          action.place === 'storyPage' &&
          likeStorySuccess(state.single_story, action)
      };
    }
    case LIKE_STORY_FAIL: {
      return {
        ...state,
        liking: false,
        error: action.error
      };
    }

    case RELOG_STORY: {
      return {
        ...state,
        reloging: true
      };
    }
    case RELOG_STORY_SUCCESS: {
      return {
        ...state,
        reloging: false
      };
    }
    case RELOG_STORY_FAIL: {
      return {
        ...state,
        reloging: false
      };
    }

    case SET_VISIBILITY_STORY: {
      return {
        ...state,
        setting_visibility: true
      };
    }
    case SET_VISIBILITY_STORY_SUCCESS: {
      const visibilityStory = state.stories.map(story => {
        if (story.id === action.story_id) {
          return {
            ...story,
            visibility: {
              value: action.visibility_type,
              users_custom_visibility: []
            }
          };
        }
        return story;
      });
      return {
        ...state,
        setting_visibility: false,
        stories: visibilityStory
      };
    }
    case SET_VISIBILITY_STORY_FAIL: {
      return {
        ...state,
        setting_visibility: false
      };
    }

    case GET_STORY:
      return {
        ...state,
        getting: true
      };
    case GET_STORY_SUCCESS:
      return {
        ...state,
        getting: false,
        single_story: action.result.data[0]
      };
    case GET_STORY_FAIL:
      return {
        ...state,
        getting: false
      };

    case DELETE_STORY: {
      return {
        ...state,
        deleting: true
      };
    }
    case DELETE_STORY_SUCCESS: {
      return {
        ...state,
        stories: state.stories.filter(story => story.id !== action.id)
      };
    }
    case DELETE_STORY_FAIL: {
      return {
        ...state,
        deleting: false
      };
    }

    case PIN_STORY: {
      return {
        ...state,
        pin: true
      };
    }
    case PIN_STORY_SUCCESS: {
      return {
        ...state,
        pin: false
      };
    }
    case PIN_STORY_FAIL: {
      return {
        ...state,
        pin: false
      };
    }

    case CREATE_NEW_COMMENT: {
      console.log(action);
      return {
        ...state,
        creatingNewComment: false,
        stories:
          action.place === 'storyline' &&
          createNewComment(state.stories, action),
        single_story:
          action.place === 'storyPage' &&
          createNewComment(state.single_story, action)
      };
    }
    case CREATE_NEW_COMMENT_SUCCESS: {
      return {
        ...state,
        creatingNewComment: true,
        stories:
          action.place === 'storyline' &&
          createNewCommentSuccess(state.stories, action),
        single_story:
          action.place === 'storyPage' &&
          createNewCommentSuccess(state.single_story, action)
      };
    }
    case CREATE_NEW_COMMENT_FAIL: {
      return {
        ...state,
        creatingNewComment: false
      };
    }

    case VIEW_MORE_COMMENTS: {
      return {
        ...state
      };
    }
    case VIEW_MORE_COMMENTS_SUCCESS: {
      const viewNextComments = state.stories.map(story => {
        if (story.id === action.entity_id) {
          return {
            ...story,
            comments:
              story.paginationComment === 1
                ? action.result.data
                : [...action.result.data, ...story.comments],
            paginationComment: story.paginationComment + 1
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        stories: viewNextComments
      };
    }
    case VIEW_MORE_COMMENTS_FAIL: {
      return {
        ...state
      };
    }

    case UPDATE_COMMENT: {
      return {
        ...state,
        pin: true
      };
    }
    case UPDATE_COMMENT_SUCCESS: {
      return {
        ...state,
        pin: false
      };
    }
    case UPDATE_COMMENT_FAIL: {
      return {
        ...state,
        pin: false
      };
    }

    case DELETE_COMMENT: {
      return {
        ...state,
        pin: true
      };
    }
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        pin: false
      };
    }
    case DELETE_COMMENT_FAIL: {
      return {
        ...state,
        pin: false
      };
    }

    case CLEAR_STORIES:
      return {
        ...state,
        stories: [],
        single_story: null,
        loaded: false
      };

    case SHOW_COMMENT: {
      return {
        ...state
      };
    }
    case SHOW_COMMENT_SUCCESS: {
      const viewReplies = state.stories.map(story => {
        if (story.id === action.result.data.entity_id) {
          const modifyComments = story.comments.map(comment => {
            if (comment.id === action.result.data.parent_id) {
              return {
                ...comment,
                children: action.result.data.parent.children
              };
            }
            return {
              ...comment
            };
          });
          return {
            ...story,
            comments: modifyComments
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        stories: viewReplies
      };
    }
    case SHOW_COMMENT_FAIL: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
}
