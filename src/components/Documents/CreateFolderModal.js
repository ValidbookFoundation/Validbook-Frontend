import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {Form, Input} from 'formsy-react-components';
import './rename-document-modal.scss';

class CreateFolderModal extends Component {
  constructor() {
    super();

    this.onSaveChangesClick = this.onSaveChangesClick.bind(this);
  }

  onSaveChangesClick() {
    this.props.createBoxHander(this.name && this.name.state && this.name.state._value);
  }

  render() {
    const {closeModalHandler, saveChangesHandler, showModal, title} = this.props;
    console.log(this.props);

    return (
      <Modal
        dialogClassName="create-folder"
        show={showModal}
        onHide={closeModalHandler || saveChangesHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>New folder</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}>
            <Input
              name="name"
              labelClassName={[{'col-sm-3': false}, 'channel-label']}
              elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
              value={'Untitled folder'}
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
            onClick={this.onSaveChangesClick}>Create</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateFolderModal;
