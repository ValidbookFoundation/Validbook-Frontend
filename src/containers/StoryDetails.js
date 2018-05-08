import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {
  getStoryById,
  like as likePostInStoryDetails,
  createComment as createCommentInStoryDetails
} from '../actions/story';
import Post from '../components/Stream/Story';
import {
  parseStoryId
} from '../utils/url_parsing';

@connect((state) => ({
  path: state.routing.locationBeforeTransitions.pathname,
  single_story: state.story.single_story,
  authorized_user: state.user.authorized_user,
  requested_user: state.user.requested_user,
}), {
  getStoryById,
  likePostInStoryDetails,
  createCommentInStoryDetails
})

export default class StoryDetails extends Component {
  componentDidMount() {
    const { path, getStoryById } = this.props;
    const story_id = parseStoryId(path);

    getStoryById(story_id);
  }
  
  like = (id) => {
    this.props.likePostInStoryDetails(id, 'storyPage');
  }

  createComment = (entity_id, content, parent_id, user) => {
    this.props.createCommentInStoryDetails(entity_id, content, parent_id, user, 'storyPage');
  }

  render() {
    const {single_story, authorized_user, requested_user} = this.props;

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
      <div style={{width: '500px', margin: '0 auto', paddingTop: '20px'}}>
        {helmet}
        {single_story &&
          <Post
            story={single_story}
            authorized_user={authorized_user}
            requested_user={requested_user}
            createCommentFunc={this.createComment}
            likeFunc={this.like}
          />
        }
      </div>
    );
  }
}

StoryDetails.propTypes = {
  single_story: PropTypes.array,
  authorized_user: PropTypes.object,
  requested_user: PropTypes.object,
  path: PropTypes.string,
  createCommentInStoryDetails: PropTypes.func,
  likePostInStoryDetails: PropTypes.func,
  getStoryById: PropTypes.func
};
