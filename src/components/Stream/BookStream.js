import React, {Component} from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  likeStory,
  viewMoreComments,
  createComment,
  create as createStoryStoryline,
  showReplies,
  setVisibilityStory
} from '../../actions/story';
import {
  getCheckboxOfBook
} from '../../actions/book';
import StoryBox from './StoryBox';
import Post from './Story';
import Loader from '../Loader';
import './index.scss';

@connect((state) => ({
  over: state.book.over,
  pagination: state.book.pagination,
  book_slug: state.book.book_slug,
  loaded: state.book.loaded,
}), {
  likeStory,
  viewMoreComments,
  createComment,
  createStoryStoryline,
  setVisibilityStory,
  getCheckboxOfBook
})

export default class BookStream extends Component {
  load = () => {
    if (!this.props.over) {
      this.props.nextBookStories(this.props.book_slug, this.props.pagination);
    }
  }

  reloadStreamBook = () => {
    this.props.showBookStories(this.props.book_slug);
  }

  like = (id) => {
    this.props.likeStory(id);
  }

  createComment = (entity_id, content, parent_id, user) => {
    this.props.createComment(entity_id, content, parent_id, user);
  }

  createStory = (data, selected_books, files) => {
    this.props.createStoryStoryline(data, selected_books, files);
  }

  showMoreComments = (id, paginationComment) => {
    this.props.viewMoreComments(id, paginationComment);
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
            { property: 'twitter:image', content: image_meta }
          ].push(meta)}
        />
      );
    } else if (single_story) {
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
          requested_user={requested_user}
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
    const {bookStories, authorized_user, requested_user, loaded, setVisibilityStory} = this.props;

    return (
      <div className="stream" style={{marginLeft: 0}}>
        {authorized_user.id && authorized_user.id === requested_user.id &&
          <StoryBox
            authorized_user={this.props.authorized_user}
            createStoryFunc={this.createStory}
            reloadStream={this.reloadStreamBook}
            getCheckboxOfBook={this.props.getCheckboxOfBook}
          />
        }

        {this.singleStoryRender()}
        
        {loaded.book_stories ?
          <InfiniteScroll
            loadMore={this.load}
            hasMore={true}
            threshold={50}
            loader={<Loader marginTop="52px"/>}
          >
            {bookStories && bookStories.map((story) => (
              <Post
                key={story.id}
                story={story}
                likeFunc={this.like}
                showMoreCommentsFunc={this.showMoreComments}
                authorized_user={this.props.authorized_user}
                requested_user={this.props.requested_user}
                createCommentFunc={this.createComment}
                setVisibilityStory={setVisibilityStory}
              />
            ))}
          </InfiniteScroll>
          : <Loader marginTop="52px"/>
        }
      </div>
    );
  }
}

BookStream.propTypes = {
  authorized_user: PropTypes.object,
  requested_user: PropTypes.object,
  createStory: PropTypes.func,
  bookStories: PropTypes.array,
  over: PropTypes.bool,
  nextBookStories: PropTypes.func,
  book_slug: PropTypes.string,
  pagination: PropTypes.number,
  likeStory: PropTypes.func,
  showBookStories: PropTypes.func,
  viewMoreComments: PropTypes.func,
};
