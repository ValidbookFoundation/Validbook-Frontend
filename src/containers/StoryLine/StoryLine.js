import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import StoryLine from '../../components/StoryLine';
import {
  getAllUserPhotos
} from '../../actions/photo';
import {
  clearAccountCard
} from '../../actions/accountCard';
import {
  getUserProfile
} from '../../actions/user';
import {
  createStory,
  loadStories,
  loadNextStories,
  clearStories,
  getStoryById
} from '../../actions/story';
import {
  getBookTree, 
  clearBookTree
} from '../../actions/book';
import {
  loadPeopleFollowers, 
  loadPeopleFollowing, 
  loadUserPeople, 
  clearPeopleBlock
} from '../../actions/follow';
import { getCheckboxOfBook } from '../../actions/book';
import {
  parseUserSlug,
  parseStoryLine
} from '../../utils/url_parsing';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const state = getState();
      const path = state.routing.locationBeforeTransitions.pathname;
      
      if (~path.indexOf('/storyline/')) {
        const story_id = parseStoryLine(path);
        return dispatch(getStoryById(story_id));
      }
    }
  }
])

@connect((state) => ({
  path: state.routing.locationBeforeTransitions.pathname,
  authorized_user: state.user.authorized_user,
  requested_user: state.user.requested_user,
  requested_user_profile: state.user.requested_user_profile,
  stories: state.story.stories,
  single_story: state.story.single_story,
  books_tree: state.book.books_tree,
  following: state.follow.following,
  followers: state.follow.followers,
  people: state.follow.people,
  photos: state.photo.all_photos
}), {
  getUserProfile,
  getBookTree,
  clearBookTree,
  loadStories,
  createStory,
  clearStories,
  loadNextStories,
  loadPeopleFollowers,
  loadPeopleFollowing,
  loadUserPeople,
  clearPeopleBlock,
  getStoryById,
  getCheckboxOfBook,
  getAllUserPhotos
})

export default class StoryLineContainer extends Component {
  componentDidMount() {
    const { path } = this.props;
    const user_slug = parseUserSlug(path);
    let wallbook = null;

    if (this.props.books_tree[0]) {
      wallbook = this.props.books_tree[0].children.filter(book => book.name === 'Wallbook')[0];
    }

    if (wallbook) {
      this.props.getCheckboxOfBook([wallbook.key]);
    }

    this.requests(user_slug);
  }

  componentWillReceiveProps(nextProps) {
    const { requested_user, books_tree, photos } = nextProps;
    const next_user_slug = requested_user.slug;
    const user_slug = this.props.requested_user.slug;
    let wallbook = null;

    if (!photos.length && (this.props.requested_user.id !== requested_user.id)) {
      this.props.getAllUserPhotos(requested_user.id);
    }

    if (!this.props.books_tree[0] &&
      books_tree[0] &&
      books_tree[0].children &&
      books_tree[0].children.length) {
      wallbook = books_tree[0].children.filter(book => book.name === 'Wallbook')[0];
    }

    if (wallbook) {
      this.props.getCheckboxOfBook([wallbook.key]);
    }

    if (next_user_slug && user_slug && next_user_slug !== user_slug) {
      this.clearState();
      this.requests(next_user_slug);
    }
  }

  componentWillUnmount() {
    this.clearState();
  }

  requests = (user_slug) => {
    const { 
      loadStories,
      getBookTree,
      getUserProfile,
      loadUserPeople,
      loadPeopleFollowers,
      loadPeopleFollowing
    } = this.props;

    loadStories(user_slug);
    getBookTree(user_slug);
    getUserProfile(user_slug);
    loadUserPeople(user_slug);
    loadPeopleFollowing(user_slug);
    loadPeopleFollowers(user_slug);
  }

  clearState = () => {
    const { clearBookTree, clearPeopleBlock, clearStories } = this.props;

    clearBookTree();
    clearStories();
    clearPeopleBlock();
    clearAccountCard();
  }

  render() {
    const {
      requested_user,
      authorized_user,
      requested_user_profile,
      stories,
      createStory,
      loadStories,
      books_tree,
      loadNextStories,
      following,
      followers,
      people,
      single_story,
      small_subheader,
      getCheckboxOfBook,
      photos
    } = this.props;
    const helmet_title = requested_user.first_name && requested_user.last_name 
      ? `${requested_user.first_name} ${requested_user.last_name} - Storyline`
      : 'Storyline';
    const photos_for_infoblock = [].concat(photos).filter(item => item.picture_small).slice(0, 9);

    return (
      <div>
        <Helmet
          title={helmet_title}
        />
        <StoryLine
          authorized_user={authorized_user}
          requested_user={requested_user}
          requested_user_profile={requested_user_profile}
          stories={stories}
          createStory={createStory}
          loadStories={loadStories}
          books_tree={books_tree}
          loadNextStories={loadNextStories}
          following={following}
          followers={followers}
          people={people}
          small_subheader={small_subheader}
          single_story={single_story}
          getCheckboxOfBook={getCheckboxOfBook}
          photos={photos_for_infoblock}
        />
      </div>
    );
  }

}

StoryLineContainer.propTypes = {
  small_subheader: PropTypes.bool,

  //user
  authorized_user: PropTypes.object,
  requested_user: PropTypes.object,
  requested_user_profile: PropTypes.object,
  path: PropTypes.string,
  getUserProfile: PropTypes.func,
  
  //story
  stories: PropTypes.array,
  single_story: PropTypes.object,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  clearStories: PropTypes.func,
  getStoryById: PropTypes.func,
  createStory: PropTypes.func,

  //book
  books_tree: PropTypes.array,
  getBookTree: PropTypes.func,
  clearBookTree: PropTypes.func,

  //follow
  followers: PropTypes.object,
  following: PropTypes.object,
  clearPeopleBlock: PropTypes.func,

  //profile
  people: PropTypes.array,
  loadUserPeople: PropTypes.func,
  loadPeopleFollowing: PropTypes.func,
  loadPeopleFollowers: PropTypes.func
};
