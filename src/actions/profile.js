import {
  GET_COUNT_NOTIFICATIONS,
  GET_COUNT_NOTIFICATIONS_SUCCESS,
  GET_COUNT_NOTIFICATIONS_FAIL,
  GET_NOTIFICATION_SETTINGS,
  GET_NOTIFICATION_SETTINGS_SUCCESS,
  GET_NOTIFICATION_SETTINGS_FAIL,
  SET_NOTIFICATION_SETTINGS,
  SET_NOTIFICATION_SETTINGS_SUCCESS,
  SET_NOTIFICATION_SETTINGS_FAIL,
  GET_USER_NOTIFICATIONS,
  GET_USER_NOTIFICATIONS_SUCCESS,
  GET_USER_NOTIFICATIONS_FAIL,
  SEEN_ALL_NOTIFICATIONS,
  SEEN_ALL_NOTIFICATION_SUCCESS,
  SEEN_ALL_NOTIFICATIONS_FAIL,
  READ_ALL_NOTIFICATIONS,
  READ_ALL_NOTIFICATIONS_SUCCESS,
  READ_ALL_NOTIFICATIONS_FAIL,
  READ_NOTIFICATION,
  READ_NOTIFICATION_SUCCESS,
  READ_NOTIFICATION_FAIL,
  LOAD_NEXT_NOTIFICATIONS,
  LOAD_NEXT_NOTIFICATIONS_SUCCESS,
  LOAD_NEXT_NOTIFICATIONS_FAIL,
  SEEN_ALL_CONVERSATIONS,
  SEEN_ALL_CONVERSATIONS_SUCCESS,
  SEEN_ALL_CONVERSATIONS_FAIL,
  READ_ALL_CONVERSATIONS,
  READ_ALL_CONVERSATIONS_SUCCESS,
  READ_ALL_CONVERSATIONS_FAIL,
  READ_CONVERSATION,
  READ_CONVERSATION_SUCCESS,
  READ_CONVERSATION_FAIL,
  SOCKET_SEND_USER_NOTIFICATION,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_BY_USER,
  GET_CONVERSATION_BY_USER_SUCCESS,
  GET_CONVERSATION_BY_USER_FAIL,
  GET_CONVERSATION_LIST,
  GET_CONVERSATION_LIST_SUCCESS,
  GET_CONVERSATION_LIST_FAIL,
  LOAD_NEXT_CONVERSATIONS,
  LOAD_NEXT_CONVERSATIONS_SUCCESS,
  LOAD_NEXT_CONVERSATIONS_FAIL,
  LOAD_NEXT_MESSAGES,
  LOAD_NEXT_MESSAGES_SUCCESS,
  LOAD_NEXT_MESSAGES_FAIL,
  CREATE_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  CLEAR_CONVERSATION,
  CLEAR_CONVERSATIONS_LIST,
  SOCKET_GET_MESSAGE,
  SOCKET_LAST_MESSAGE,
  DELETE_CONVERSATION,
  DELETE_CONVERSATION_SUCCESS,
  DELETE_CONVERSATION_FAIL,
  LEFT_CONVERSATION,
  LEFT_CONVERSATION_SUCCESS,
  LEFT_CONVERSATION_FAIL,
  SEARCH_CONVERSATION,
  GET_CONVERSATION_BY_USER_PAGE,
  GET_CONVERSATION_BY_USER_PAGE_SUCCESS,
  GET_CONVERSATION_BY_USER_PAGE_FAIL,
  ADD_TEMPORARY_CONVERSATION,
  ADD_MEMBER_TO_CONVERSATION,
  ADD_MEMBER_TO_CONVERSATION_SUCCESS,
  ADD_MEMBER_TO_CONVERSATION_FAIL
} from '../constants/profile';

export function getConversationID(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  const id = path.substring(path.indexOf('/chats') + 7);
  if (id) {
    return id;
  }
  if (globalState.profile.conversations.length > 0) {
    return globalState.profile.conversations[0].conversation_id;
  }
}

// export function isCountSeenNotification(globalState) {
//   return globalState.profile && globalState.profile.gotNotificationBubble;
// }

export function isNeedLoadTemporaryConversation(globalState) {
  return globalState.profile && globalState.profile.needLoadTemporaryConversation;
}

export function clearConversation() {        //for clear div in /messages/new
  return {
    type: CLEAR_CONVERSATION
  };
}

export function clearConversionsList() {
  return {
    type: CLEAR_CONVERSATIONS_LIST
  };
}

export function socketGetMessage(msg) {
  return {
    type: SOCKET_GET_MESSAGE,
    msg
  };
}

export function socketLastMessage(msg) {
  return {
    type: SOCKET_LAST_MESSAGE,
    msg,
  };
}

export function socketUserNotification(data) {
  console.log('redux socketUserNotification', data);
  return {
    type: SOCKET_SEND_USER_NOTIFICATION,
    data
  };
}

export function getCountSeenNotification(user_id) {
  // console.log('user_id redux', user_id);
  return {
    types: [GET_COUNT_NOTIFICATIONS, GET_COUNT_NOTIFICATIONS_SUCCESS, GET_COUNT_NOTIFICATIONS_FAIL],
    promise: (client) => client.get('/notifications/count-new', { params: { user_id }})
  };
}

export function getNotificationSettings() {
  return {
    types: [GET_NOTIFICATION_SETTINGS, GET_NOTIFICATION_SETTINGS_SUCCESS, GET_NOTIFICATION_SETTINGS_FAIL],
    promise: (client) => client.get('/notifications/settings')
  };
}

export function seenAllNotification() {
  return {
    types: [SEEN_ALL_NOTIFICATIONS, SEEN_ALL_NOTIFICATION_SUCCESS, SEEN_ALL_NOTIFICATIONS_FAIL],
    promise: (client) => client.post('/notifications/seen-all')
  };
}

export function seenAllConversations() {
  return {
    types: [SEEN_ALL_CONVERSATIONS, SEEN_ALL_CONVERSATIONS_SUCCESS, SEEN_ALL_CONVERSATIONS_FAIL],
    promise: (client) => client.post('/conversations/seen-all')
  };
}

export function readAllNotification() {
  return {
    types: [READ_ALL_NOTIFICATIONS, READ_ALL_NOTIFICATIONS_SUCCESS, READ_ALL_NOTIFICATIONS_FAIL],
    promise: (client) => client.post('/notifications/read-all')
  };
}

export function readAllConversations() {
  return {
    types: [READ_ALL_CONVERSATIONS, READ_ALL_CONVERSATIONS_SUCCESS, READ_ALL_CONVERSATIONS_FAIL],
    promise: (client) => client.post('/conversations/read-all')
  };
}

export function readNotification(notification_id) {
  return {
    types: [READ_NOTIFICATION, READ_NOTIFICATION_SUCCESS, READ_NOTIFICATION_FAIL],
    promise: (client) => client.post(`/notifications/read/${notification_id}`)
  };
}

export function readConversation(conversation_id) {
  return {
    types: [READ_CONVERSATION, READ_CONVERSATION_SUCCESS, READ_CONVERSATION_FAIL],
    promise: (client) => client.post(`/conversations/read/${conversation_id}`)
  };
}

export function setNotificationSettings(settings, notification_type) {
  console.log('setNotificationSettings', settings, notification_type);
  return {
    types: [SET_NOTIFICATION_SETTINGS, SET_NOTIFICATION_SETTINGS_SUCCESS, SET_NOTIFICATION_SETTINGS_FAIL],
    promise: (client) => client.post('/notifications/settings', { data: { settings, notification_type }}),
    settings,
    notification_type
  };
}

export function getUserNotifications() {
  return {
    types: [GET_USER_NOTIFICATIONS, GET_USER_NOTIFICATIONS_SUCCESS, GET_USER_NOTIFICATIONS_FAIL],
    promise: (client) => client.get('/notifications')
  };
}

export function loadNextNotifications(page) {
  return {
    types: [LOAD_NEXT_NOTIFICATIONS, LOAD_NEXT_NOTIFICATIONS_SUCCESS, LOAD_NEXT_NOTIFICATIONS_FAIL],
    promise: (client) => client.get('/notifications', { params: { page }})
  };
}

export function searchConversation(text) {
  return {
    type: SEARCH_CONVERSATION,
    text
  };
}

export function getConversationByID(id) {
  return {
    types: [GET_CONVERSATION, GET_CONVERSATION_SUCCESS, GET_CONVERSATION_FAIL],
    promise: (client) => client.get(`/conversations/${id}`, {params: {page: 1}}),
    id
  };
}

export function loadNextMessagesByID(id, page) {
  return {
    types: [LOAD_NEXT_MESSAGES, LOAD_NEXT_MESSAGES_SUCCESS, LOAD_NEXT_MESSAGES_FAIL],
    promise: (client) => client.get(`/conversations/${id}`, { params: { page }})
  };
}

export function getConversationByUser(user_ids, user_name) {
  return {
    types: [GET_CONVERSATION_BY_USER, GET_CONVERSATION_BY_USER_SUCCESS, GET_CONVERSATION_BY_USER_FAIL],
    promise: (client) => client.get('/conversations/by-users', { params: { user_ids }}),
    user_name
  };
}

export function loadNextMessagesByUser(user_ids, user_name, page) {
  return {
    types: [LOAD_NEXT_MESSAGES, LOAD_NEXT_MESSAGES_SUCCESS, LOAD_NEXT_MESSAGES_FAIL],
    promise: (client) => client.get('/conversations/by-users', { params: { user_ids, page }}),
    user_name
  };
}

export function getConversationByUserPage(user_ids, user) {
  return {
    types: [GET_CONVERSATION_BY_USER_PAGE, GET_CONVERSATION_BY_USER_PAGE_SUCCESS, GET_CONVERSATION_BY_USER_PAGE_FAIL],
    promise: (client) => client.get('/conversations/by-users', { params: { user_ids }}),
    user
  };
}

export function addTemporaryConversation() {
  return {
    type: ADD_TEMPORARY_CONVERSATION
  };
}

export function getConversationList() {
  return {
    types: [GET_CONVERSATION_LIST, GET_CONVERSATION_LIST_SUCCESS, GET_CONVERSATION_LIST_FAIL],
    promise: (client) => client.get('/conversations')
  };
}

export function loadNextConversations(page) {
  return {
    types: [LOAD_NEXT_CONVERSATIONS, LOAD_NEXT_CONVERSATIONS_SUCCESS, LOAD_NEXT_CONVERSATIONS_FAIL],
    promise: (client) => client.get('/conversations', { params: { page }})
  };
}

export function deleteConversation(id) {
  return {
    types: [DELETE_CONVERSATION, DELETE_CONVERSATION_SUCCESS, DELETE_CONVERSATION_FAIL],
    promise: (client) => client.del(`/conversations/${id}`),
    id
  };
}

export function leftConversation(id, first_name) {
  return {
    types: [LEFT_CONVERSATION, LEFT_CONVERSATION_SUCCESS, LEFT_CONVERSATION_FAIL],
    promise: (client) => client.patch(`/conversations/left/${id}`),
    id,
    first_name
  };
}

export function addMember(id, user_id) {
  return {
    types: [ADD_MEMBER_TO_CONVERSATION, ADD_MEMBER_TO_CONVERSATION_SUCCESS, ADD_MEMBER_TO_CONVERSATION_FAIL],
    promise: (client) => client.patch(`/conversations/add-member/${id}`, { data: { user_id }}),
    id
  };
}

export function createMessage(text, conversation_id, receivers) {
  return {
    types: [CREATE_MESSAGE, CREATE_MESSAGE_SUCCESS, CREATE_MESSAGE_FAIL],
    promise: (client) => client.post('/messages', { data: { text, conversation_id, receivers }}),
  };
}

export function deleteMessage(message_id) {
  return {
    types: [DELETE_MESSAGE, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL],
    promise: (client) => client.del(`/messages/${message_id}`),
    message_id
  };
}
