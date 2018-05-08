import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { relogStory } from '../../actions/story';
import SaveBookTreeDialog from '../BooksTree/SaveBookTreeDialog';
import './index.scss';

@connect(null, {
  relogStory
})

export default class LogStory extends Component {
  state = {
    showModal: false
  }

  Close = () => {
    this.setState({ showModal: false });
  }
  Open = () => {
    this.setState({ showModal: true });
  }

  relog = (book) => {
    this.props.relogStory(this.props.storyID, book);
  }

  render() {
    return (
      <div className="log-popup" onClick={this.Open}>
        <Modal show={this.state.showModal} onHide={this.Close} className="modal-log avatar-popup">
          <Modal.Header closeButton>
            <Modal.Title>Save Story</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <SaveBookTreeDialog
              relog={this.relog}
            />
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}

LogStory.propTypes = {
  storyID: PropTypes.number,
  relogStory: PropTypes.func
};
