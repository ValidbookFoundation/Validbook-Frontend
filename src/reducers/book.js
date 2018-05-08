import {
  like as likeStory,
  likeStorySuccess
} from '../utils/like';
import {
  createNewComment,
  createNewCommentSuccess
} from '../utils/comment';
import {
  LOAD_BOOKTREE,
  LOAD_BOOKTREE_SUCCESS,
  LOAD_BOOKTREE_FAIL,
  SHOW_BOOK,
  SHOW_BOOK_SUCCESS,
  SHOW_BOOK_FAIL,
  SHOW_NEXT_BOOK,
  SHOW_NEXT_BOOK_SUCCESS,
  SHOW_NEXT_BOOK_FAIL,
  CREATE_BOOK,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAIL,
  EDIT_BOOK,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAIL,
  MOVE_BOOK,
  MOVE_BOOK_SUCCESS,
  MOVE_BOOK_FAIL,
  GET_ARR_CHECKBOX,
  UPLOAD_BOOK_COVER,
  UPLOAD_BOOK_COVER_SUCCESS,
  UPLOAD_BOOK_COVER_FAIL,
  CLEAR_BOOKSTORIES,
  CLEAR_BOOKTREE,
  UPLOAD_BOOK_COVER_BASE64,
  SHOW_SUBBOKS_CURRENT_BOOK,
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAIL,
  DELETE_BOOK,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL
} from '../constants/book';
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
  books_tree: [],
  selected_books: [],
  loaded: {
    book_tree: false,
    book_stories: false,
    books: false
  },
  pagination: 2,
  uploading: false,
  book: {},
  sub_books: []
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKTREE:
      return {
        ...state
      };
    case LOAD_BOOKTREE_SUCCESS:
      let loaded = Object.assign({}, state.loaded, {
        book_tree: true,
      });

      return {
        ...state,
        loaded,
        books_tree: action.result.data,
        over: false,
      };
    case LOAD_BOOKTREE_FAIL:
      loaded = Object.assign({}, state.loaded, {
        book_tree: false,
      });

      return {
        ...state,
        error: action.error,
        loaded,
        books_tree: []
      };

    case SHOW_BOOK:
      return {
        ...state
      };

    case SHOW_BOOK_SUCCESS:
      loaded = Object.assign({}, state.loaded, {
        book_stories: true,
      });

      const book_stories = action.result.data.stories;
      book_stories.map(story => story.paginationComment = 2);

      return {
        ...state,
        loaded,
        book: Object.assign({}, action.result.data, {
          stories: book_stories
        })
      };
    case SHOW_BOOK_FAIL:
      loaded = Object.assign({}, state.loaded, {
        book_stories: false,
      });

      return {
        ...state,
        loaded,
        error: action.error,
      };

    case SHOW_NEXT_BOOK:
      return {
        ...state
      };
    case SHOW_NEXT_BOOK_SUCCESS:
      return {
        ...state,
        over: action.result.data.stories.length === 0 && true,
        book: Object.assign({}, state.book, {
          stories: [...state.book.stories, ...action.result.data.stories]
        }),
        pagination: action.page + 1
      };
    case SHOW_NEXT_BOOK_FAIL:
      return {
        ...state
      };

    case CREATE_BOOK:
      return {
        ...state,
        creating: true
      };
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_BOOK_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    case EDIT_BOOK:
      return {
        ...state,
        editing: true
      };
    case EDIT_BOOK_SUCCESS:
      return {
        ...state,
        editing: false,
        edited: true,
      };
    case EDIT_BOOK_FAIL:
      return {
        ...state,
        editing: false,
        edited: false,
      };

    case MOVE_BOOK:
      return {
        ...state,
        moving: true,
      };
    case MOVE_BOOK_SUCCESS:
      return {
        ...state,
        moving: false,
        moved: true,
      };
    case MOVE_BOOK_FAIL:
      return {
        ...state,
        moving: false,
        moved: false,
      };

    case GET_ARR_CHECKBOX:
      return {
        ...state,
        selected_books: action.checkbox
      };

    case LIKE_STORY: {
      return {
        ...state,
        book: Object.assign({}, state.book, {
          stories: likeStory(state.book.stories, action)
        })
      };
    }
    case LIKE_STORY_SUCCESS: {
      return {
        ...state,
        book: Object.assign({}, state.book, {
          stories: likeStorySuccess(state.book.stories, action)
        })
      };
    }
    case LIKE_STORY_FAIL: {
      return {
        ...state,
        liking: false,
        error: action.error,
      };
    }

    case UPLOAD_BOOK_COVER:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_BOOK_COVER_SUCCESS:
      const updateBookCoverImg = Object.assign({}, state.book, {
        cover: action.result.data
      });

      return {
        ...state,
        uploading: false,
        book: updateBookCoverImg,
      };
    case UPLOAD_BOOK_COVER_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.error,
      };

    case UPLOAD_BOOK_COVER_BASE64: {
      const updateBookCoverBase64 = Object.assign({}, state.book, {
        cover: action.bookCoverBase64
      });
      // const updateUserCoverBase64 = state.authorized_user;
      // updateUserCoverBase64.cover = action.userCoverBase64;

      return {
        ...state,
        book: updateBookCoverBase64
      };
    }

    case CLEAR_BOOKSTORIES:
      return {
        ...state,
        book: Object.assign({}, state.book, {
          stories: []
        })
      };

    case CLEAR_BOOKTREE:
      loaded = Object.assign({}, state.loaded, {
        book_tree: false,
      });

      return {
        ...state,
        books_tree: [],
        loaded
      };

    case VIEW_MORE_COMMENTS: {
      return {
        ...state,
      };
    }
    case VIEW_MORE_COMMENTS_SUCCESS: {
      const viewNextComments = state.book.stories.map(story => {
        if (story.id === action.entity_id) {
          return {
            ...story,
            comments: [...action.result.data, ...story.comments],
            paginationComment: story.paginationComment + 1,
            counts: {
              comments: story.counts.comments - 4
            },
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        book: Object.assign({}, state.book, {
          stories: viewNextComments
        })
      };
    }
    case VIEW_MORE_COMMENTS_FAIL: {
      return {
        ...state,
      };
    }

    case SHOW_SUBBOKS_CURRENT_BOOK: {
      return {
        ...state,
        sub_books: action.subbooks
      };
    }

    case GET_BOOKS: {
      return {
        ...state,
      };
    }
    case GET_BOOKS_SUCCESS: {
      loaded = Object.assign({}, state.loaded, {
        books: true,
      });
      return {
        ...state,
        sub_books: action.result.data,
        loaded
      };
    }
    case GET_BOOKS_FAIL: {
      loaded = Object.assign({}, state.loaded, {
        books: false,
      });
      return {
        ...state,
        loaded
      };
    }

    case CREATE_NEW_COMMENT: {
      return {
        ...state,
        creatingNewComment: false,
        book: Object.assign({}, state.book, {
          stories: createNewComment(state.book.stories, action)
        })
      };
    }
    case CREATE_NEW_COMMENT_SUCCESS: {
      return {
        ...state,
        creatingNewComment: true,
        book: Object.assign({}, state.book, {
          stories: createNewCommentSuccess(state.book.stories, action)
        })
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
        book: Object.assign({}, state.book, {
          stories: [...action.result.data, ...state.book.stories]
        })
      };
    case CREATE_STORY_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };
    case SET_VISIBILITY_STORY_SUCCESS: {
      const visibilityStory = state.book.stories.map((story) => {
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
        book: Object.assign({}, state.book, {
          stories: visibilityStory
        })
      };
    }
    case DELETE_BOOK_SUCCESS: {
      return {
        ...state,
        books_tree: state.books_tree.filter(book => book.slug !== action.book_slug)
      };
    }

    default:
      return state;
  }
}
