import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './index.scss';

export default class DeleteStory extends Component {
  state = {
    showModal: false,
  }

  Close = () => {
    this.setState({ showModal: false });
  }
  Open = () => {
    this.setState({ showModal: true });
  }

  deleteStory = () => {
    this.props.deleteStory(this.props.id)
      .then(() => this.Close());
  }

  render() {
    return (
      <div className="delete-story-popup" onClick={this.Open}>
        <Modal show={this.state.showModal} onHide={this.Close}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Story</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure want to delete this story? It will be deleted from all books.</p>
          </Modal.Body>

          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button
                className="btn-brand" style={{marginLeft: '10px'}} type="submit"
                onClick={() => this.deleteStory()}>Delete Story</button>
            </div>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

DeleteStory.propTypes = {
  deleteStory: PropTypes.func,
  id: PropTypes.number,
};
