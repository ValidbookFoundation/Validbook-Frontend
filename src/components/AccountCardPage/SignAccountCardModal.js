import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './sign-account-card-modal.scss'; 

class AccountHumanCardModal extends Component {
  state = {
    file: null
  }

  _sign = () => {
    const { file } = this.state;
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onloadend = () => {
      this.props.saveModalHandler(reader.result, this.inputKeystorePassword.value)
    };
  }
  
  readKeystore = (e) => {
    e.preventDefault();
    
    this.setState({ 
      file: e.target.files[0], 
    });
  }

  render() {
    const { title, button, showModal, closeModalHandler, saveModalHandler } = this.props;
    const { file } = this.state;

    return (
      <Modal
        dialogClassName="sign-document"
        show={showModal}
        onHide={closeModalHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Statement</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="sign-human-card-modal">
            <h1>Access your private key</h1>
            <div className="sign-human-card-operations">
              <div className="keystore-file">
                <input type="file" name="keystore" id="keystore" onChange={this.readKeystore}/>
                <label htmlFor="keystore">
                  {file
                    ? file.name
                    : 'Select Keystore File'
                  }
                </label>
              </div>
              {this.state.file
                ? <input 
                  type="password"
                  ref={el => this.inputKeystorePassword = el}
                  placeholder="Type password"
                />
                : <input 
                  type="password"
                  placeholder="Type password"
                  readOnly
                />
              }
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button 
            className="btn-brand btn-cancel" 
            onClick={closeModalHandler}>Cancel</button>
          <button 
            className="btn-brand btn-sign" 
            style={{marginLeft: '16px'}} 
            onClick={this._sign}>Sign</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AccountHumanCardModal.propTypes = {

};

export default AccountHumanCardModal;
