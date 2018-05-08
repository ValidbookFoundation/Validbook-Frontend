import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Form, Input } from 'formsy-react-components';
import './rename-document-modal.scss';

export default class RenameDocumentModal extends Component {
  onSaveChangesClick = () => {
    this.props.renameDocumentHandler(this.name && this.name.state && this.name.state._value);
  }

  render() {
    const {closeModalHandler, saveChangesHandler, showModal, title} = this.props;

    return (
      <Modal
        dialogClassName="rename"
        show={showModal}
        onHide={closeModalHandler || saveChangesHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rename</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <Form rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}>
            <Input
              name="name"
              labelClassName={[{'col-sm-3': false}, 'channel-label']}
              label="Please enter a name for the document:"
              elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
              value={title || ''}
              ref={input => { this.name = input; }}
              type="text"
            />
  
          </Form>
        </Modal.Body>
  
        <Modal.Footer>
          <button 
            className="btn-brand btn-cancel" 
            onClick={closeModalHandler}>Cancel</button>
          <button 
            className="btn-brand" 
            style={{marginLeft: '16px'}} 
            onClick={this.onSaveChangesClick}>Save Changes</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

RenameDocumentModal.PropTypes = {
  showModal: PropTypes.bool,
  title: PropTypes.string,
  closeModalHandler: PropTypes.func,
  saveChangesHandler: PropTypes.func
};
