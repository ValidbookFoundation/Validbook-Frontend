import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import {
  likeStory,
  viewMoreComments,
  createComment,
  create as createStoryStoryline,
  showReplies,
  setVisibilityStory
} from '../../actions/story';
import StoryBox from './StoryBox';
import Post from './Story';
import Loader from '../Loader';
import './index.scss';

@connect((state) => ({
  over: state.story.over,
  slug: state.user.requested_user.slug,
  pagination: state.story.pagination,
  loaded: state.story.loaded,
}), {
  likeStory,
  viewMoreComments,
  createComment,
  createStoryStoryline,
  showReplies,
  setVisibilityStory
})

class Stream extends Component {

  load = () => {
    if (!this.props.over) {
      this.props.loadNextStories(this.props.slug, this.props.pagination);
    }
  }

  reloadStreamStoryline = () => {
    this.props.loadStories(this.props.slug);
  }

  _likeStory = (id) => {
    this.props.likeStory(id, 'storyline');
  }

  createComment = (entity_id, content, parent_id, user) => {
    this.props.createComment(entity_id, content, parent_id, user, 'storyline');
  }

  createStory = (data, selected_books, files) => {
    this.props.createStoryStoryline(data, selected_books, files);
  }

  showMoreComments = (id, paginationComment) => {
    this.props.viewMoreComments(id, paginationComment);
  }

  showReply = (id) => {
    this.props.showReplies(id);
  }

  singleStoryRender = () => {
    const { single_story, requested_user, authorized_user } = this.props;

    if (!single_story) {
      return null;
    }
    
    let helmet = null;
    const meta = [
      {
        property: 'og:title',
        content: 'Story from Validbook'
      },
      {
        property: 'og:description',
        content: `${single_story.text.replace(/<[^>]*>?/g, '')}`
      },
      {
        property: 'twitter:title',
        content: 'Story from Validbook'
      },
      {
        property: 'twitter:description',
        content: `${single_story.text.replace(/<[^>]*>?/g, '')}`
      }
    ];

    if (single_story && single_story.images.length > 0) {
      const image_meta = single_story.images[0];
      helmet = (
        <Helmet
          meta={[
            { property: 'og:image', content: image_meta },
            { property: 'twitter:image', content: image_meta },
            ...meta
          ]}
        />
      );
    } else {
      helmet = (
        <Helmet
          meta={meta}
        />
      );
    }
    
    return (
      <div className="shared-story">
        {helmet}
        <Post
          story={single_story}
          authorized_user={authorized_user}
          createCommentFunc={this.createComment}
          showReplyFunc={this.showReply}
          likeFunc={this._likeStory}
          showMoreCommentsFunc={this.showMoreComments}
        />
        <div className="shared-delimiter">
          <span>Other stories from {requested_user.first_name} {requested_user.last_name}</span>
        </div>
      </div>
    );
  }

  render() {
    const {
      stories,
      authorized_user,
      requested_user,
      loaded, over,
      single_story,
      getCheckboxOfBook,
      setVisibilityStory
    } = this.props;
    const loader = <Loader marginTop="52px"/>;
    const filtered_stories = single_story
      ? stories.filter(story => story.id !== single_story.id)
      : stories;

    return (
      <div className="stream">
        {authorized_user.id && authorized_user.id === requested_user.id &&
          <StoryBox
            authorized_user={this.props.authorized_user}
            createStoryFunc={this.createStory}
            reloadStream={this.reloadStreamStoryline}
            getCheckboxOfBook={getCheckboxOfBook}
          />
        }

        {this.singleStoryRender()}

        {loaded
          ? <InfiniteScroll
            loadMore={this.load}
            hasMore={!over}
            threshold={50}
            loader={over ? null : loader}
          >
            
            {filtered_stories.map(story => (
              <Post
                key={story.id}
                story={story}
                likeFunc={this._likeStory}
                showMoreCommentsFunc={this.showMoreComments}
                authorized_user={this.props.authorized_user}
                requested_user={this.props.requested_user}
                createCommentFunc={this.createComment}
                showReplyFunc={this.showReply}
                setVisibilityStory={setVisibilityStory}
              />
            ))}
          </InfiniteScroll>
          : loader
        }
      </div>
    );
  }
}

Stream.propTypes = {
  authorized_user: PropTypes.object,
  createStory: PropTypes.func,                //story
  stories: PropTypes.array,
  loaded: PropTypes.object,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  over: PropTypes.bool,
  slug: PropTypes.string,
  requested_user: PropTypes.object,
  likeStory: PropTypes.func,
  viewMoreComments: PropTypes.func,
};

export default Stream;
