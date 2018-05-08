import {
  like as likeStory,
  likeStorySuccess
} from '../utils/like';
import {
  createNewComment,
  createNewCommentSuccess
} from '../utils/comment';
import {
  LOAD_CHANNELS_LIST,
  LOAD_CHANNELS_LIST_SUCCESS,
  LOAD_CHANNELS_LIST_FAIL,
  LOAD_CHANNEL,
  LOAD_CHANNEL_SUCCESS,
  LOAD_CHANNEL_FAIL,
  LOAD_NEXT_CHANNEL_STORIES,
  LOAD_NEXT_CHANNEL_STORIES_SUCCESS,
  LOAD_NEXT_CHANNEL_STORIES_FAIL,
  CREATE_CHANNEL,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_FAIL,
  HEADER_CHANNEL_NAME,
} from '../constants/channel';
import {
  LIKE_STORY,
  LIKE_STORY_SUCCESS,
  LIKE_STORY_FAIL,
  VIEW_MORE_COMMENTS,
  VIEW_MORE_COMMENTS_SUCCESS,
  VIEW_MORE_COMMENTS_FAIL,
  CREATE_NEW_COMMENT,
  CREATE_NEW_COMMENT_SUCCESS,
  CREATE_NEW_COMMENT_FAIL,
  CREATE_STORY,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_FAIL,
  SHOW_COMMENT,
  SHOW_COMMENT_SUCCESS,
  SHOW_COMMENT_FAIL,
  SET_VISIBILITY_STORY,
  SET_VISIBILITY_STORY_SUCCESS,
  SET_VISIBILITY_STORY_FAIL
} from '../constants/story';

const initialState = {
  channelsArr: [],
  channelStories: [],
  loaded: {
    loadedChannelList: false,
    loadedChannelStories: false,
  },
  pagination: 2,
};

export default function channelReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNELS_LIST:
      return {
        ...state,
        loading: {
          loadingChannelList: true
        }
      };
    case LOAD_CHANNELS_LIST_SUCCESS:
      return {
        ...state,
        loading: {
          loadingChannelList: false
        },
        loaded: {
          loadedChannelList: action.result.status === 'success' && true
        },
        over: false,
        channelsArr: action.result.data,
      };
    case LOAD_CHANNELS_LIST_FAIL:
      return {
        ...state,
        loading: {
          loadingChannelList: false
        },
        loaded: {
          loadedChannelList: false
        },
        error: action.error,
        channelsArr: []
      };

    case LOAD_CHANNEL:
      return {
        ...state,
        loading: {
          loadingChannelStories: true
        }
      };
    case LOAD_CHANNEL_SUCCESS:
      const dataStories = action.result.data.stories;
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
        loading: {
          loadingChannelStories: false
        },
        loaded: Object.assign({}, state.loaded, {loadedChannelStories: action.result.status === 'success'}),
        channel_slug: action.channel_slug,
        channelStories: dataStories,
      };
    case LOAD_CHANNEL_FAIL:
      return {
        ...state,
        loading: {
          loadingChannelStories: false
        },
        loaded: {
          loadedChannelStories: false
        },
        error: action.error,
        channelStories: []
      };

    case LOAD_NEXT_CHANNEL_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_NEXT_CHANNEL_STORIES_SUCCESS:

      return {
        ...state,
        loading: false,
        loaded: Object.assign({}, state.loaded, {loadedChannelStories: action.result.status === 'success'}),
        over: action.result.data.stories.length === 0,
        channelStories: [...state.channelStories, ...action.result.data.stories],
        pagination: state.pagination + 1
      };
    case LOAD_NEXT_CHANNEL_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        channelStories: []
      };

    case CREATE_CHANNEL:
      return {
        ...state,
        creating: true
      };
    case CREATE_CHANNEL_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_CHANNEL_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    case HEADER_CHANNEL_NAME:
      return {
        ...state,
        header_channel_name: action.header_channel_name,
      };

    case LIKE_STORY: {
      return {
        ...state,
        liking: true,
        channelStories: likeStory(state.channelStories, action)
      };
    }
    case LIKE_STORY_SUCCESS: {
      return {
        ...state,
        liking: false,
        channelStories: likeStorySuccess(state.channelStories, action)
      };
    }
    case LIKE_STORY_FAIL: {
      return {
        ...state,
        liking: false,
        error: action.error,
      };
    }

    case VIEW_MORE_COMMENTS: {
      return {
        ...state,
      };
    }
    case VIEW_MORE_COMMENTS_SUCCESS: {
      const viewNextComments = state.channelStories.map(story => {
        if (story.id === action.entity_id) {
          return {
            ...story,
            comments: story.paginationComment === 1 ? action.result.data : [...action.result.data, ...story.comments],
            paginationComment: story.paginationComment + 1,
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        channelStories: viewNextComments
      };
    }
    case VIEW_MORE_COMMENTS_FAIL: {
      return {
        ...state,
      };
    }

    case CREATE_NEW_COMMENT: {
      return {
        ...state,
        creatingNewComment: false,
        channelStories: createNewComment(state.channelStories, action)
      };
    }
    case CREATE_NEW_COMMENT_SUCCESS: {
      return {
        ...state,
        creatingNewComment: true,
        channelStories: createNewCommentSuccess(state.channelStories, action)
      };
    }
    case CREATE_NEW_COMMENT_FAIL: {
      return {
        ...state,
        creatingNewComment: false,
      };
    }

    case CREATE_STORY:
      return {
        ...state,
        creating: true
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        channelStories: [...action.result.data, ...state.channelStories]
      };
    case CREATE_STORY_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    case SHOW_COMMENT: {
      return {
        ...state,
      };
    }
    case SHOW_COMMENT_SUCCESS: {
      const viewReplies = state.channelStories.map(story => {
        if (story.id === action.result.data.entity_id) {
          const modifyComments = story.comments.map(comment => {
            if (comment.id === action.result.data.parent_id) {
              return {
                ...comment,
                children: action.result.data.parent.children,
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
        channelStories: viewReplies
      };
    }
    case SHOW_COMMENT_FAIL: {
      return {
        ...state,
      };
    }
    case SET_VISIBILITY_STORY_SUCCESS: {
      const visibilityStory = state.channelStories.map((story) => {
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
        channelStories: visibilityStory
      };
    }

    default:
      return state;
  }
}
