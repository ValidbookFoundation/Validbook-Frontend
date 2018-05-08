import React from 'react';
import {IndexRoute, Route, IndexRedirect, Redirect} from 'react-router';

import { getAuthUser } from 'actions/user';

import App from 'containers/App/App';
import IndexContainer from 'containers/IndexContainer';
import User from 'containers/User/User';
import StoryLine from 'containers/StoryLine/StoryLine';
import BooksContainer from 'containers/Books/Books';
import PhotosContainer from 'containers/Photos/Photos';
import PhotosCovers from 'components/Photos/PhotosCovers';
import PhotosExternal from 'components/Photos/PhotosExternal';
import PhotosProfile from 'components/Photos/PhotosProfile';
import Photos from 'components/Photos';
import PeopleContainer from 'containers/People/People';
import People from 'components/People';
import PeopleFollowing from 'components/People/PeopleFollowing';
import PeopleFollowers from 'components/People/PeopleFollowers';
import PeopleSuggested from 'components/People/PeopleSuggested';
import Documents from 'containers/Documents/Documents';
import WalletContainer from 'containers/Wallet/Wallet';
import NewDocument from 'components/Documents/NewDocument';
import IdentityPageContainer from 'containers/Identity';
import MessagesContainer from 'containers/MessagesContainer';
import Messages from 'components/Messages';
import NewMessage from 'components/Messages/NewMessage';
import ProfileContainer from 'containers/ProfileContainer';
import Profile from 'components/Information&Profile/Profile';
import Password from 'components/Information&Profile/Profile/Password';
import Privacy from 'components/Information&Profile/Profile/Privacy';
import Notifications from 'components/Information&Profile/Profile/Notifications';
import DeleteAccount from 'components/Information&Profile/Profile/DeleteAccount';
import About from 'components/Information&Profile/Information/About';
import Contacts from 'components/Information&Profile/Information/Contacts';
import TermsOfService from 'components/Information&Profile/Information/TermsOfService';
import NotificationList from 'components/Information&Profile/NotificationList';
import Recovery from 'components/Registration/Recovery';
import Authorization from 'components/Registration/Authorization';
import Unsubscribe from 'components/Registration/Unsubscribe';
import SearchContainer from 'containers/SearchContainer';
import Search from 'components/Search';
import SearchPeople from 'components/Search/SearchPeople';
import SearchBooks from 'components/Search/SearchBooks';
import SearchLatest from 'components/Search/SearchLatest';
import SearchChannels from 'components/Search/SearchChannels';
import SearchPhotos from 'components/Search/SearchPhotos';
import SearchThings from 'components/Search/SearchThings';
import SearchTokens from 'components/Search/SearchTokens';
import SearchStories from 'components/Search/SearchStories';
import EngagementContainer from 'components/Registration/Engagement';
import BookPage from 'components/BookPage';
import StoryDetails from 'containers/StoryDetails';
import NotFoundPage from 'components/NotFoundPage/NotFoundPage';
import OAuth from 'components/OAuth';
import Statements from 'containers/Statements/Statements';
import ArbitrationPageContainer from 'containers/Arbitration';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default (store) => {
  const requireLogin = (nextState, replace, callback) => {
    const state = store.getState();
    const auth_user = state.user.authorized_user;
    const checkAuth = () => {
      if (!auth_user.id) {
        replace('/account/auth');
      }
      callback();
    };

    if (!auth_user.id) {
      store.dispatch(getAuthUser()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={IndexContainer}/>
      <Route path="authorize" component={OAuth}/>
      <Route path="channel/:channelName" component={IndexContainer}/>

      <Route path="engagement" component={EngagementContainer}/>

      <Route path="chats" component={MessagesContainer} onEnter={requireLogin}>
        <IndexRoute component={Messages}/>
        <Route path="new" component={NewMessage}/>
        <Route path=":conversationID" component={Messages}/>
      </Route>

      <Route path="settings" component={ProfileContainer} onEnter={requireLogin}>
        <IndexRedirect to="profile"/>
        <Route path="profile" component={Profile}/>
        <Route path="password" component={Password}/>
        <Route path="notifications" component={Notifications}/>
        <Route path="privacy" component={Privacy}/>
        <Route path="delete-account" component={DeleteAccount}/>
      </Route>

      <Route path="contacts" component={Contacts}/>
      <Route path="terms-of-service" component={TermsOfService}/>
      <Route path="about" component={About}/>
      <Route path="account/auth" component={Authorization}/>
      {/* <Route path="/registration/easy" component={}/> */}
      <Route path="account/password-recovery" component={Recovery}/>
      <Route path="unsubscribe" component={Unsubscribe}/>
      <Route path="notifications" component={NotificationList} onEnter={requireLogin}/>

      <Route path="search" component={SearchContainer}>
        <IndexRoute component={Search}/>
        <Route path="people" component={SearchPeople}/>
        <Route path="books" component={SearchBooks}/>
        <Route path="photos" component={SearchPhotos}/>
        <Route path="Box" component={SearchTokens}/>
        <Route path="channels" component={SearchChannels}/>
        <Route path="latest" component={SearchLatest}/>
        <Route path="stories" component={SearchStories}/>
        <Route path="things" component={SearchThings}/>
      </Route>

      <Route path="wallet" component={WalletContainer}/>
      <Route path="statements" component={Statements}/>

      <Route path=":userName/story/:id" component={StoryDetails}/>
      <Route path=":userName/books/:bookName" component={BookPage}/>
      <Route path=":userName/books/:bookName/:id" component={BookPage}/>
      <Route path=":userName/books/:bookName/subbooks" component={BookPage}/>
      <Route path=":userName/documents/:box/document(/:document_id)" component={NewDocument}/>
      <Route path=":userName/identity-page(/:public_address)(/:random_number)" component={IdentityPageContainer}/>
      <Route path=":userName/arbitration" component={ArbitrationPageContainer}/>

      <Route path=":userName" component={User}>
        <IndexRoute component={StoryLine}/>
        <Route path="storyline/:id" component={StoryLine}/>
        <Route path="books" component={BooksContainer}/>

        <Route path="relations" component={PeopleContainer}>
          <IndexRoute component={People}/>
          <Route path="following" component={PeopleFollowing}/>
          <Route path="followers" component={PeopleFollowers}/>
          <Route path="suggested" component={PeopleSuggested} onEnter={requireLogin}/>
        </Route>

        <Redirect from="documents" to="/:userName/documents/desk"/>
        <Route path="documents/:folder_slug" component={Documents}/>

        <Route path="photos" component={PhotosContainer}>
          <IndexRoute component={Photos}/>
          <Route path="external" component={PhotosExternal}/>
          <Route path="covers" component={PhotosCovers}/>
          <Route path="profile" component={PhotosProfile}/>
        </Route>
      </Route>

      <Route path="*" component={NotFoundPage} status={404}/>
    </Route>
  );
};
