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
  HEADER_CHANNEL_NAME
} from '../constants/channel';

export function load() {
  return {
    types: [LOAD_CHANNELS_LIST, LOAD_CHANNELS_LIST_SUCCESS, LOAD_CHANNELS_LIST_FAIL],
    promise: (client) => client.get('/channels')
  };
}

export function loadNext(slug, page) {
  const channel_slug = slug || 'mashup';
  return {
    types: [LOAD_NEXT_CHANNEL_STORIES, LOAD_NEXT_CHANNEL_STORIES_SUCCESS, LOAD_NEXT_CHANNEL_STORIES_FAIL],
    promise: (client) => client.get(`/channels/${channel_slug}`, { params: { page }}),
    page
  };
}

export function show(slug) {
  const channel_slug = slug || 'mashup';
  return {
    types: [LOAD_CHANNEL, LOAD_CHANNEL_SUCCESS, LOAD_CHANNEL_FAIL],
    channel_slug,
    promise: (client) => client.get(`/channels/${channel_slug}`)
  };
}

export function create(name, description) {
  return {
    types: [CREATE_CHANNEL, CREATE_CHANNEL_SUCCESS, CREATE_CHANNEL_FAIL],
    promise: (client) => client.post('/channels', { data: { name, description }})
  };
}

export function getChannelName(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  let header_channel_name;

  if (path.indexOf('channel') === 1) {
    const channelName = path.substring(9);
    header_channel_name = channelName[0].toUpperCase() + channelName.substring(1);
  } else if (path === '/') {
    header_channel_name = 'Mashup';
  } else {
    header_channel_name = false;
  }

  return {
    type: HEADER_CHANNEL_NAME,
    header_channel_name
  };
}

// export function like(story_id) {
//   return {
//     types: [LIKE_STORY, LIKE_STORY_SUCCESS, LIKE_STORY_FAIL],
//     story_id,
//     promise: (client) => client.post('/like/story', { data: { story_id }})
//   };
// }

// export function viewMoreComments(entity_id, paginationComment) {
//   return {
//     types: [VIEW_MORE_COMMENTS, VIEW_MORE_COMMENTS_SUCCESS, VIEW_MORE_COMMENTS_FAIL],
//     promise: (client) => client.get('/comments/story', {params: {page: paginationComment, entity_id}}),
//     entity_id
//   };
// }

// export function createComment(entity_id, content, parent_id, user) {
//   return {
//     types: [CREATE_NEW_COMMENT, CREATE_NEW_COMMENT_SUCCESS, CREATE_NEW_COMMENT_FAIL],
//     promise: (client) => client.post('/comments', {
//       data: {
//         entity: 'story',
//         entity_id,  //story id
//         content,    //text
//         parent_id,  //default 0
//         created_by: user.id  //auth_id
//       }
//     }),
//     entity: 'story',
//     entity_id,
//     content,
//     parent_id,
//     created_by: user.id,
//     user,
//   };
// }

// export function createStory(data, books, files) {
//   const formData = new FormData();
//   formData.append('description', data);
//   formData.append('books', JSON.stringify(books));
//   Object.keys(files).forEach((key) => {
//     const file = files[key];
//     formData.append('file[]', file);
//   });
//   return {
//     types: [CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAIL],
//     promise: (client) => client.post('/stories', {
//       data: formData
//     })
//   };
// }

// export function showReplies(id) {
//   return {
//     types: [SHOW_COMMENT, SHOW_COMMENT_SUCCESS, SHOW_COMMENT_FAIL],
//     promise: (client) => client.get(`/comments/${id}`)
//   };
// }

// export function setVisibilityStory(visibility_type, story_id) {
//   const users_custom_visibility = [];
//   return {
//     types: [SET_VISIBILITY_STORY, SET_VISIBILITY_STORY_SUCCESS, SET_VISIBILITY_STORY_FAIL],
//     promise: (client) => client.post(`/stories/${story_id}/update-visibility`, {
//       data: {
//         visibility: visibility_type,
//         users_custom_visibility
//       }
//     }),
//     visibility_type,
//     story_id
//   };
// }
