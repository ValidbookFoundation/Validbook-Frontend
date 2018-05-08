import axios from 'axios';
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

export function clearStories() {
  return {
    type: CLEAR_STORIES
  };
}

export function loadStories(user_slug) {
  return {
    types: [LOAD_SHOW_USER_STORIES, LOAD_SHOW_USER_STORIES_SUCCESS, LOAD_SHOW_USER_STORIES_FAIL],
    promise: (client) => client.get(`/users/${user_slug}/stories`)
  };
}

export function loadNextStories(user_slug, pagination) {
  return {
    types: [LOAD_NEXT_SHOW_USER_STORIES, LOAD_NEXT_SHOW_USER_STORIES_SUCCESS, LOAD_NEXT_SHOW_USER_STORIES_FAIL],
    promise: (client) => client.get(`/users/${user_slug}/stories`, {params: {page: pagination}}),
    pagination
  };
}

// export function create(description, books, in_storyline, loud_type, visibility) {
//   in_storyline = in_storyline ? 1 : 0;
//   const in_channels = loud_type.in_channels;
//   const in_books = loud_type.in_books;
//   const users_custom_visibility = [];
//   return {
//     types: [CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAIL],
//     promise: (client) => client.post('/stories', {
//       data: {
//         description,
//         books,
//         in_storyline,
//         in_channels,
//         in_books,
//         visibility,
//         users_custom_visibility
//       }
//     })
//   };
// }
function getSizeForOnePhoto(width) {
  if (width <= 254) {
    return width * 2;
  }
  
  return 508;
}

function getSize(length, key, proportion, width) {
  switch (length) {
    case 1: {
      return getSizeForOnePhoto(width);
    }

    case 2:
    case 4: {
      return 254;
    }

    case 3: {
      if (+key === 0) {
        return 338;
      }
      
      return 168;
    }

    case 5: {
      if (+key === 0 || +key === 1) {
        return 254;
      }

      return 168;
    }
  }
}

function getNewSize(width, height, size) {
  const proportion = width / height;

  if (proportion <= 1 || size === 508) {
    return `${size}x${~~(size / proportion)}`;
  }

  return `${~~(size * proportion)}x${size}`;
}

export function createStory(data, books, files, visibility, loud_type) {
  const formData = new FormData();
  formData.append('description', data);
  formData.append('books', JSON.stringify(books));
  formData.append('visibility', visibility);
  Object.keys(loud_type).forEach(item => formData.append(`${item}`, loud_type[item]));
  const files_length = files.length;
  const image_sizes = [];
  const done = false;

  Object.keys(files).forEach((key) => {
    const file = files[key];
    const img = new Image();

    img.onload = () => {
      if (files_length <= 5) {
        const size = getSize(files_length, key, img.width / img.height, img.width);
        const thumbnail = getNewSize(img.width, img.height, size);

        image_sizes.push({
          original: `${img.width}x${img.height}`,
          thumbnail
        });
      } else {
        image_sizes.push({
          original: `${img.width}x${img.height}`,
        });
      }

      if (image_sizes.length === files_length) {
        formData.append('image_sizes', JSON.stringify(image_sizes));

        Object.keys(files).forEach((key) => {
          const file = files[key];
          formData.append('file[]', file);
        });

        const token = localStorage.getItem('_u');

        return axios({
          url: 'http://api-test.validbook.org/v1/stories',
          data: formData,
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            return {
              type: CREATE_STORY_SUCCESS,
              result: response.data
            };
            // return dispatch => {
            //   console.log(response);
            //   return dispatch({
            //     type: CREATE_STORY_SUCCESS,
            //     result: response.data
            //   });
            // };
          });
      }
    };
    img.src = file.preview.url;
  });

  if (!Object.keys(files).length) {
    return {
      types: [CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAIL],
      promise: (client) => client.post('/stories', {
        data: formData
      })
    };
  }

  return {
    type: CREATE_STORY
  };
}

export function deleteStory(id) {
  return {
    types: [DELETE_STORY, DELETE_STORY_SUCCESS, DELETE_STORY_FAIL],
    promise: (client) => client.del(`/stories/${id}`),
    id
  };
}

export function likeStory(story_id, place) {
  return {
    types: [LIKE_STORY, LIKE_STORY_SUCCESS, LIKE_STORY_FAIL],
    promise: (client) => client.post('/like/story', {data: {story_id}}),
    story_id,
    place
  };
}

export function clearPagination() {
  return {
    type: CLEAR_PAGINATION
  };
}

export function relogStory(story_id, book_slug) {
  return {
    types: [RELOG_STORY, RELOG_STORY_SUCCESS, RELOG_STORY_FAIL],
    promise: (client) => client.post(`/stories/${story_id}/relog`, {data: {
      book_slug,
      is_logged_story: true
    }})
  };
}

export function setVisibilityStory(visibility_type, story_id) {
  const users_custom_visibility = [];
  return {
    types: [SET_VISIBILITY_STORY, SET_VISIBILITY_STORY_SUCCESS, SET_VISIBILITY_STORY_FAIL],
    promise: (client) => client.post(`/stories/${story_id}/update-visibility`, {
      data: {
        visibility: visibility_type,
        users_custom_visibility
      }
    }),
    visibility_type,
    story_id
  };
}

export function getStoryById(id) {
  return {
    types: [GET_STORY, GET_STORY_SUCCESS, GET_STORY_FAIL],
    promise: (client) => client.get(`/stories/${id}`)
  };
}

export function pinStory(pins, id) {
  console.log(pins);
  return {
    types: [PIN_STORY, PIN_STORY_SUCCESS, PIN_STORY_FAIL],
    promise: (client) => client.post(`/stories/${id}/pin`, {data: {pins}})
  };
}

export function createComment(entity_id, content, parent_id, user, place) {
  return {
    types: [CREATE_NEW_COMMENT, CREATE_NEW_COMMENT_SUCCESS, CREATE_NEW_COMMENT_FAIL],
    promise: (client) => client.post('/comments', {
      data: {
        entity: 'story',
        entity_id,  //story id
        content,    //text
        parent_id,  //default 0
        created_by: user.id  //auth_id
      }
    }),
    entity: 'story',
    entity_id,
    content,
    parent_id,
    created_by: user.id,
    user,
    place,
  };
}

export function viewMoreComments(entity_id, paginationComment) {
  return {
    types: [VIEW_MORE_COMMENTS, VIEW_MORE_COMMENTS_SUCCESS, VIEW_MORE_COMMENTS_FAIL],
    promise: (client) => client.get('/comments/story', {params: {page: paginationComment, entity_id}}),
    entity_id
  };
}

export function updateComment(id, content) {
  return {
    types: [UPDATE_COMMENT, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAIL],
    promise: (client) => client.patch(`/comments/${id}`, {data: {content}})
  };
}

export function deleteComment(id) {
  return {
    types: [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL],
    promise: (client) => client.del(`/comments/${id}`)
  };
}

export function showReplies(id) {
  return {
    types: [SHOW_COMMENT, SHOW_COMMENT_SUCCESS, SHOW_COMMENT_FAIL],
    promise: (client) => client.get(`/comments/${id}`)
  };
}
