// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect, asyncConnect } from 'redux-connect';
import { loadingBarReducer } from 'react-redux-loading-bar';
import formReducer from './form';
import channelReducer from './channel';
import storyReducer from './story';
import userReducer from './user';
import followReducer from './follow';
import bookReducer from './book';
import profileReducer from './profile';
import searchReducer from './search';
import documentReducer from './document';
import accountCardReducer from './accountCard';
import photoReducer from './photo';
import statements from './statements';

export default function createReducers(asyncReducers) {
  return {
    asyncConnect,
    reduxAsyncConnect,
    online: (v = true) => v,
    routing: routerReducer,
    loadingBar: loadingBarReducer,
    forms: formReducer,
    channel: channelReducer,
    story: storyReducer,
    user: userReducer,
    follow: followReducer,
    book: bookReducer,
    profile: profileReducer,
    search: searchReducer,
    document: documentReducer,
    account_card: accountCardReducer,
    photo: photoReducer,
    ...asyncReducers,
    statements
  };
}
