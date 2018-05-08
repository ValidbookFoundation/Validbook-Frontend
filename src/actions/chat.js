import { restApp } from 'app';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  ADD_MESSAGE
} from '../constants/chat.js';

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    // Use restApp on load functions, socket is not supported with SSR
    promise: () => restApp.service('messages').find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 25
      }
    }).then(page => ({ ...page, data: page.data.reverse() }))
  };
}

export function addMessage(message) {
  return { type: ADD_MESSAGE, message };
}
