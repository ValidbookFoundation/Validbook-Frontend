import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import Web3 from 'web3';
import '../Popup/index.scss';

const web3 = new Web3(Web3.givenProvider);

export default class DocumentSignature extends Component {
  constructor() {
    super();

    this.state = {
      file: null
    };
  
    // this.Close = this.Close.bind(this);
    // this.Open = this.Open.bind(this);
    this.readKeystore = this.readKeystore.bind(this);
    this.sign = this.sign.bind(this);
  }

  onSaveChangesClick() {
    
  }
  
  sign(keystore, password) {
    const { document, openDocumentForSignatureHandler } = this.props;
    
    if (document.is_open_for_sign) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', document.url, false);
      xhr.send();
  
      const decrypt = web3.eth.accounts.decrypt(JSON.parse(keystore.toLowerCase()), password);
      const signing = web3.eth.accounts.sign(xhr.responseText, decrypt.privateKey);
  
      this.props.signDocumentHandler(signing.signature);
    } else {
      openDocumentForSignatureHandler(document.id)
        .then(response => {
          if (response.data && response.data.is_open_for_sign) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', document.url, false);
            xhr.send();
        
            const decrypt = web3.eth.accounts.decrypt(JSON.parse(keystore.toLowerCase()), password);
            const signing = web3.eth.accounts.sign(xhr.responseText, decrypt.privateKey);
        
            this.props.signDocumentHandler(signing.signature);
          }
        });
    }
  }

  readKeystore(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: reader.result,
      });
    };
    reader.readAsText(file);
  }

  render() {
    const {showModal, closeModalHandler, saveChangesHandler} = this.props;

    return (
      <Modal
        show={!!showModal}
        onHide={closeModalHandler || saveChangesHandler}
      >  
        <Modal.Body>
          <div style={{display: 'flex'}}>
            <div className="sign-access-type">
              <h4>How would you like to access your wallet?</h4>
              <div>
                <input type="radio" id="keystoreKey" value="File"/>
                <label htmlFor="keystoreKey">Keystore File (UTC / JSON)</label>
              </div>
            </div>
            <div>
              <div className="keystore-file">
                <input type="file" name="keystore" id="keystore" onChange={this.readKeystore}/>
                <label htmlFor="keystore">Choose a file</label>
              </div>
              {/*<input type="file" onChange={(e) => this.readKeystore(e)} ref={el => this.inputKeystore = el}/>*/}
              {this.state.file &&
                <div>
                  <p>Please enter your password</p>
                  <input type="text" ref={el => this.inputKeystorePassword = el}/>
                  <br/>
                </div>
              }
              <button onClick={() => this.sign(this.state.file, this.inputKeystorePassword.value)}>Sign</button>
              {/*<button onClick={() => this.sign()}>Sign</button>*/}
            </div>
          </div>
        </Modal.Body>
  
        <Modal.Footer>
          <button 
            className="btn-brand btn-cancel" 
            onClick={closeModalHandler}>Cancel</button>
          <button 
            className="btn-brand" 
            style={{marginLeft: '16px'}} 
            onClick={this.onSaveChangesClick}>Sign</button>
        </Modal.Footer>
      </Modal>
    );
  }
}