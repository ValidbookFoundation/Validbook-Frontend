import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { parseMashup } from '../../utils/url_parsing';
import { createStory } from '../../actions/story';
import {loadWhoToFollow} from '../../actions/follow';
import {
  create as createChannel,
  show as showChannel,
  load as loadChannels,
  loadNext as loadNextChannelStories
} from '../../actions/channel';
import {
  getBookTree,
  getCheckboxOfBook
} from '../../actions/book';

import ChannelStream from '../../components/Stream/ChannelStream';
import Channels from '../../components/MainPage/Channels';
import FollowBlock from '../../components/MainPage/FollowBlock';
import './index.scss';

@connect((state) => ({
  authorized_user: state.user.authorized_user,
  loaded: state.user.loaded,
  channelsArr: state.channel.channelsArr,
  channelStories: state.channel.channelStories,
  books_tree: state.book.books_tree,
  whoToFollowList: state.follow.whoToFollowList,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  createStory,
  showChannel,
  createChannel,
  loadChannels,
  loadNextChannelStories,
  getBookTree,
  loadWhoToFollow,
  getCheckboxOfBook
})

export default class ChannelsContainer extends Component {
  static propTypes = {
    authorized_user: PropTypes.object,
    requested_user: PropTypes.object,
    createStory: PropTypes.func,                //story
    createChannel: PropTypes.func,              //channel
    loadChannels: PropTypes.func,
    showChannel: PropTypes.func,
    loadNextChannelStories: PropTypes.func,
    channelsArr: PropTypes.array,
    channelStories: PropTypes.array,
    whoToFollowList: PropTypes.array,           //follow
    books_tree: PropTypes.array,
  }

  componentDidMount() {
    const {
      showChannel,
      loadWhoToFollow,
      getBookTree,
      loadChannels,
      path,
      getCheckboxOfBook
    } = this.props;

    const mashup = parseMashup(path);
    let wallbook = null;
    
    if (this.props.books_tree[0]) {
      wallbook = this.props.books_tree[0].children.filter(book => book.name === 'Wallbook')[0];
    }

    if (wallbook) {
      getCheckboxOfBook([wallbook.key]);
    }

    showChannel(mashup);
    loadChannels();
    loadWhoToFollow();
    getBookTree();
  }

  componentWillReceiveProps(nextProps) {
    const { books_tree } = nextProps;
    let wallbook = null;

    if (!this.props.books_tree[0] && books_tree[0] && books_tree[0].children && books_tree[0].children.length) {
      wallbook = books_tree[0].children.filter(book => book.name === 'Wallbook')[0];
    }

    if (wallbook) {
      this.props.getCheckboxOfBook([wallbook.key]);
    }
  }

  render() {
    const {
      authorized_user,
      requested_user,
      createStory,
      channelsArr,
      loadChannels,
      showChannel,
      createChannel,
      channelStories,
      loadNextChannelStories,
      books_tree,
      whoToFollowList,
      getCheckboxOfBook
    } = this.props;
    return (
      <div className="main-page">
        <Helmet
          title="Validbook - Channels"
        />
        <div className="wrapper">
          <div className="left-column">
            <Channels
              authorized_user={authorized_user}
              channelsArr={channelsArr}
              loadChannels={loadChannels}
              createChannel={createChannel}
              showChannel={showChannel}
            />
          </div>

          <div className="mid-column">
            <ChannelStream
              authorized_user={authorized_user}
              requested_user={requested_user}
              createStory={createStory}
              channelStories={channelStories}
              showChannel={showChannel}
              loadNextChannelStories={loadNextChannelStories}
              getCheckboxOfBook={getCheckboxOfBook}
            />
            <FollowBlock
              whoToFollowList={whoToFollowList}
            />
          </div>
        </div>
      </div>
    );
  }
}
