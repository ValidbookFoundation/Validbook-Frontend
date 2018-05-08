import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AddChannel from './AddChannel';
import EditChannelModal from './EditChannelModal';
import './index.scss';

@connect((state) => ({
  path: state.routing.locationBeforeTransitions.pathname,
}), {})

export default class Channels extends Component {

  static propTypes = {
    createChannel: PropTypes.func,
    loadChannels: PropTypes.func,
    showChannel: PropTypes.func,
    channelsArr: PropTypes.array,
    authorized_user: PropTypes.object,
    path: PropTypes.string,
  }

  state = {
    show_create_channel: false
  }

  showChannelStories = (slug) => {
    this.props.showChannel(slug);
  }

  onOpenCreateChannelClick = (e) => {
    this.setState({
      show_create_channel: true
    });
  }

  closeCreateChannelModal = () => {
    this.setState({
      show_create_channel: false
    });
  }

  createChannelRender = () => {
    const { show_create_channel } = this.state;

    if (!show_create_channel) {
      return null;
    }

    console.log(show_create_channel);

    return (
      <AddChannel
        show_modal={show_create_channel}
        closeModalHandler={this.closeCreateChannelModal}
        authorized_user={this.props.authorized_user}
        createChannel={this.props.createChannel}
        loadChannels={this.props.loadChannels}
      />
    );
  }

  onOpenEditChannelClick = (e) => {
    e.preventDefault();

    this.setState({
      show_edit_channel: true
    });
  }

  closeEditChannelModal = () => {
    this.setState({
      show_edit_channel: false
    });
  }

  editChannelRender = () => {
    const { show_edit_channel } = this.state;

    if (!show_edit_channel) {
      return null;
    }

    return (
      <EditChannelModal
        show_modal={show_edit_channel}
        closeModalHandler={this.closeEditChannelModal}
      />
    );
  }

  render() {
    const {channelsArr, path} = this.props;

    return (
      <div className="channels">
        <div className="sidebar">
          <ul>
            {channelsArr && channelsArr.map((channel) => (
              <Link
                key={channel.id}
                to={`/channel/${channel.slug}`}
                onlyActiveOnIndex={true}
                activeClassName="active"
                onClick={() => this.showChannelStories(channel.slug)}
                className={
                  (path === '/' && channel.name === 'Mashup')
                    ? 'active'
                    : null
                }
              >
                <li>
                  <span>{channel.name}</span>
                  <span
                    onClick={this.onOpenEditChannelClick}
                    className="edit_icon"/>
                </li>
              </Link>
            ))}
          </ul>
          <a
            href="#"
            onClick={this.onOpenCreateChannelClick}
            className="create_channel_link"
          >
            + Create new channel
          </a>
        </div>
        {this.createChannelRender()}
        {this.editChannelRender()}
      </div>
    );
  }
}
