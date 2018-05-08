import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {getUserSlug} from '../../actions/user';
import {
  loadPeopleFollowing,
  getNextFollowing,
  isLoadedFollowing,
  follow as followUser,
  unfollow as unfollowUser
} from '../../actions/follow';
import PeopleMenu from './PeopleMenu';
import Loader from '../Loader';
import UserItem from './UserItem';
import './index.scss';

@connect((state) => ({
  pagination: state.follow.pagination.following,
  following: state.follow.following,
  requested_user: state.user.requested_user,
  path: state.routing.locationBeforeTransitions.pathname,
  slug: state.user.requested_user.slug,
  loaded: state.follow.loaded.loadedFollowing,
  over: state.follow.over.following
}), {
  loadPeopleFollowing,
  isLoadedFollowing,
  getNextFollowing,
  followUser,
  unfollowUser,
  getUserSlug,
})

class PeopleFollowing extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadPeopleFollowing(findSlug);

    // if (findSlug !== requested_user.slug) {
    //   this.props.loadPeopleFollowing(findSlug);
    // }
  }

  load() {
    const {over, slug, pagination, getNextFollowing} = this.props;
    if (!over) {
      getNextFollowing(slug, pagination);
    }
  }

  follow(id) {
    this.props.followUser(id, 'following');
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'following');
  }

  _brandIconRender() {
    const {over} = this.props;

    
    if (!over) {
      return null;
    }

    return <div>icon</div>; // add brand icon
  }

  render() {
    const {following, over, small_subheader, loaded} = this.props;
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
          {loaded &&
            <InfiniteScroll
              loadMore={this.load}
              hasMore={true}
              threshold={50}
              loader={over ? null : loader}
            >
              <div className="wrapper">
                {following.users && following.users.map(user => (
                  <UserItem
                    key={user.id}
                    user={user}
                    unfollowUserHandler={this.unfollow}
                    followUserHandler={this.follow}
                  />
                ))}
              </div>
            </InfiniteScroll>
          }
          {this._brandIconRender()}
        </div>
      </div>
    );
  }
}

PeopleFollowing.propTypes = {
  following: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleFollowing: PropTypes.func,
  path: PropTypes.string,
  requested_user: PropTypes.object,
};

export default PeopleFollowing;
