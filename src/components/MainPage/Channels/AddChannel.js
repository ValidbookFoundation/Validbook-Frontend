import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'react-md';
import { Modal } from 'react-bootstrap';
import './index.scss';

export default class AddChannel extends Component {
  constructor(props) {
    super(props);

    const {  } = props;

    this.state = {
      name: '',
      description: '',
      content: ''
    };
  }

  onTextFieldChange = (e, filed_id) => {
    this.setState({
      [filed_id]: e
    });
  }

  onSubmitChannel = (data) => {
    const { createChannel, loadChannels, authorized_user, closeModalHandler } = this.props;

    createChannel(data.name, data.description)
      .then(closeModalHandler)
      .then(() => loadChannels(authorized_user.slug));
  }

  render() {
    const { channel_name, channel_description, closeModalHandler, show_modal } = this.props;
    const { name, description, content } = this.state;

    return (
      <Modal
        show={show_modal}
        onHide={closeModalHandler}
        className="modal-channel"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <TextField 
            id="name"
            label="Channel name"
            placeholder="Give name to your new channel"
            value={name}
            onChange={e => this.onTextFieldChange(e, 'name')}
            className="md-cell md-cell--bottom"
          />
          <TextField 
            id="description"
            label="Description"
            placeholder="(Optional)"
            value={description}
            onChange={e => this.onTextFieldChange(e, 'description')}
            className="md-cell md-cell--bottom"
          />
          <TextField 
            id="content"
            label="Channel's Content"
            placeholder="Type name of person or book to follow in this channel"
            value={content}
            onChange={e => this.onTextFieldChange(e, 'content')}
            className="md-cell md-cell--bottom"
          />
        </Modal.Body>

        <Modal.Footer>
          <div style={{float: 'right'}}>
            <button
              className="btn-brand btn-cancel"
              onClick={closeModalHandler}
            >
              Cancel
            </button>
            <button
              className="btn-brand"
              style={{
                marginLeft: '10px'
              }}
              onClick={this.onSubmitChannel}
            >
              Create Channel
            </button>
          </div>
        </Modal.Footer>

      </Modal>
    );
  }
}

AddChannel.propTypes = {
  channel_name: PropTypes.string,
  channel_description: PropTypes.string,
  createChannel: PropTypes.func,
  loadChannels: PropTypes.func,
  authorized_user: PropTypes.object,
};
