import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {getUserSlug} from '../../actions/user';
import {
  loadPeopleSuggested,
  getNextSuggested,
  isLoadedSuggested,
  follow as followUser,
  unfollow as unfollowUser
} from '../../actions/follow';
import PeopleMenu from './PeopleMenu';
import Loader from '../Loader';
import UserItem from './UserItem';
import './index.scss';

@connect((state) => ({
  pagination: state.follow.pagination.suggested,
  suggested: state.follow.suggested,
  requested_user: state.user.requested_user,
  path: state.routing.locationBeforeTransitions.pathname,
  slug: state.user.requested_user.slug,
  over: state.follow.over.suggested,
  loaded: state.follow.loaded.loadedSuggested
}), {
  getNextSuggested,
  loadPeopleSuggested,
  isLoadedSuggested,
  followUser,
  unfollowUser,
  getUserSlug,
})

class PeopleSuggested extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.loadMoreUsers = this.loadMoreUsers.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadPeopleSuggested(findSlug);
  }

  follow(id) {
    this.props.followUser(id, 'suggested');
      // .then(() => this.props.loadPeopleSuggested());
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'suggested');
      // .then(() => this.props.loadPeopleSuggested());
  }

  loadMoreUsers() {
    const {over, slug, pagination, getNextSuggested} = this.props;

    if (!over) {
      getNextSuggested(slug, pagination);
    }
  }

  render() {
    const {suggested, loaded, over, small_subheader} = this.props;
    const loader = <Loader marginTop="10px"/>;

    return (
      <div className="people contents">

        <PeopleMenu
          small_subheader={small_subheader}
        />

        <div 
          className="common-lists people-lists"
          style={{marginLeft: small_subheader ? 240 : null}}
        >
          <InfiniteScroll
            loadMore={this.loadMoreUsers}
            hasMore={true}
            threshold={50}
            loader={over ? null : loader}
          >
            <div className="wrapper">
              {suggested.users && suggested.users.map((user,index) => (
                <UserItem
                  key={index}
                  user={user}
                  unfollowUserHandler={this.unfollow}
                  followUserHandler={this.follow}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

PeopleSuggested.propTypes = {
  suggested: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleSuggested: PropTypes.func,
  path: PropTypes.string,
  requested_user: PropTypes.object,
};

export default PeopleSuggested;
