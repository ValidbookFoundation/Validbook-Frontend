import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Web3 from 'web3';

import DocumentItem from './DocumentItem';
import MoveDocumentToPopup from './MoveDocumentToPopup';
import RenameDocumentModal from './RenameDocumentModal';
import DocumentOperationsPopup from './DocumentOperationsPopup';
import SignAccountCardModal from '../AccountCardPage/SignAccountCardModal';

import {
  deleteDocument, 
  updateDocumentTitle, 
  moveDocumentToBox, 
  copyDocument, 
  createDocumentSignature,
  openDocumentForSignature,
  downloadDocument,
  openSelectedDocument
} from '../../actions/document';
import './index.scss';

const web3 = new Web3(Web3.givenProvider);

@connect(null, {
  deleteDocument,
  updateDocumentTitle,
  moveDocumentToBox,
  copyDocument,
  createDocumentSignature,
  openDocumentForSignature,
  downloadDocument,
  openSelectedDocument
})

export default class Box extends Component {

  static propTypes = {
    authorized_user: PropTypes.object,
    requested_user: PropTypes.object,
    box: PropTypes.object
  }
  
  state = {
    move_document_id: null,
    rename_document_id: null,
    document_operations_id: null,
    signature_document_id: null
  }

  componentDidMount() {
    window.addEventListener('click', this._closeShowMoreOperations, false);
  }

  _closeShowMoreOperations = (e) => {
    const sign_div = document.querySelector('div.modal-dialog');
    if (!sign_div) {
      e.stopPropagation();
      e.preventDefault();
    }
    const {document_operations_id, move_document_id} = this.state;
    const div = document.querySelector('div.document-item-modal');

    if (!div && document_operations_id) {
      this.setState({
        document_operations_id: null
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._closeShowMoreOperations, false);
  }

  showMoreOperations = (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      document_operations_id: this.state.document_operations_id ? null : id
    });
  }

  closeRenameDocumentModal = () => {
    this.setState({
      rename_document_id: null
    });
  }
  
  renameDocument = (title) => {
    const { updateDocumentTitle } = this.props;
    
    updateDocumentTitle(this.state.rename_document_id, title);
    
    this.setState({
      rename_document_id: null
    });
  }

  documentModalRender(document_id) {
    const { rename_document_id } = this.state;
    const { box } = this.props;

    if (!rename_document_id || document_id !== rename_document_id) {
      return null;
    }

    const selected_document = box.documents.filter(document => document.id === document_id);
    const document_title = selected_document.length && selected_document[0].title;

    return (
      <RenameDocumentModal
        title={document_title}
        showModal={rename_document_id && true}
        renameDocumentHandler={this.renameDocument}
        closeModalHandler={this.closeRenameDocumentModal}
      />
    );
  }
  
  showRenameDocumentModal = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      rename_document_id: this.state.document_operations_id,
      document_operations_id: null
    });
  }

  deleteDocument = (e) => {
    e.preventDefault();
    const { deleteDocument } = this.props;

    deleteDocument(this.state.document_operations_id);
  }

  copyDocument = () => {
    const { box, copyDocument } = this.props;

    this.props.copyDocument(this.state.document_operations_id, box.key);
  }

  downloadDocumentHandle = () => {
    this.props.downloadDocument(this.state.document_operations_id)
      .then(response => {
        if (response.data && response.data.document_url) {
          window.location = response.data.document_url;
        }
      });
  }

  openDocumentHandle = () => {
    const { requested_user, box, openSelectedDocument } = this.props;
    const { document_operations_id } = this.state;

    browserHistory.push(`/${requested_user.slug}/documents/${box.key}/document/${document_operations_id}`);
    openSelectedDocument(document_operations_id);
  }

  showMoreOperationsRender = (document_id) => {
    const {document_operations_id} = this.state;
    const {deleteDocument, box} = this.props;

    if (!document_operations_id || document_id !== document_operations_id) {
      return null;
    }

    return (
      <DocumentOperationsPopup
        openDocumentHandler={this.openDocumentHandle}
        showModalHandler={this.showRenameDocumentModal}
        deleteDocumentHandler={this.deleteDocument}
        showMoveToHandler={this.openMoveDocumentTo}
        copyDocumentHandler={this.copyDocument}
        openDocumentSignatureHandler={this.openDocumentSignatureModal}
        downloadDocumentHandler={this.downloadDocumentHandle}
      />
    );
  }

  boxesRender() {
    const { box, requested_user } = this.props;

    if (!box.children || (box.children && !box.children.length)) {
      return null;
    }

    return (
      <div className="wrapper-folders">
        <h1>Folders</h1>
        <div className="folder-container">
          {box.children.map(box => (
            <Link key={box.id} to={`/${requested_user.slug}/documents/${box.key}`} className="folder">
              {box.name === 'Backup of signed documents'
                ? <div className="backup-folder-icon"/>
                : <div className="simple-folder-icon"/>
              }
              <div className="folder-name">{box.name}</div>
            </Link>
          ))}
        </div>
      </div>
    ); 
  }
  
  openMoveDocumentTo = (e) => {
    e.preventDefault();

    this.setState({
      move_document_id: this.state.document_operations_id
    });
  }

  moveDocumentTo = (key) => {
    this.props.moveDocumentToBox(this.state.move_document_id, key);

    this.setState({
      move_document_id: null
    });
  }
  
  moveDocumentToRender = (document_id) => {
    const { move_document_id } = this.state;

    if (!move_document_id || move_document_id !== document_id) {
      return null;
    }

    const {box} = this.props;

    return (
      <MoveDocumentToPopup
        box={box}
        moveDocumentToHandler={this.moveDocumentTo}
      />
    );
  }

  openDocumentSignatureModal = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      signature_document_id: this.state.document_operations_id,
      document_operations_id: null
    });
  }

  closeDocumentSignature = () => {
    this.setState({
      signature_document_id: null
    });
  }

  signDocument = (keystore, password) => {
    const { createDocumentSignature, box } = this.props;
    const public_address = box.human_card;
    const selected_document = this.props.box.documents
    .filter(document => document.id === this.state.signature_document_id)[0];
    const xhr = new XMLHttpRequest();

    xhr.open('GET', selected_document.url, false);
    xhr.send();

    const decrypt = web3.eth.accounts.decrypt(JSON.parse(keystore.toLowerCase()), password);
    const signing = web3.eth.accounts.sign(xhr.responseText, decrypt.privateKey);

    if (selected_document.is_open_for_sign) {
      createDocumentSignature(this.state.signature_document_id, public_address, signing.signature);
    } else {
      this.props.openDocumentForSignature(selected_document.id)
        .then(response => {
          if (response.data && response.data.is_open_for_sign) {
        
            createDocumentSignature(this.state.signature_document_id, public_address, signing.signature)
              .then(response => this.setState({
                signature_document_id: null
              }));
          }
        });
    }
  }

  documentSignatureRender = (document_id) => {
    const { signature_document_id } = this.state;

    if (!signature_document_id || signature_document_id !== document_id) {
      return null;
    }

    return (
      <SignAccountCardModal
        title="Sign Document"
        button="Sign"
        showModal={!!signature_document_id}
        saveModalHandler={this.signDocument}
        closeModalHandler={this.closeDocumentSignature}
      />
    );
  }

  documentsRender() {
    const { box, requested_user } = this.props;

    if (!box.documents || (box.documents && !box.documents.length)) {
      return null;
    }

    return (
      <div className="wrapper-doc">
        <h1>Files</h1>
        {box.documents.map(document => (
          <div className="document-item-container" key={document.id}>
            <DocumentItem
              document={document}
              box_key={box.key}
              user_slug={requested_user.slug}
              showMoreOperationsHandler={this.showMoreOperations}
            />
            {this.moveDocumentToRender(document.id)}
            {this.showMoreOperationsRender(document.id)}
            {this.documentModalRender(document.id)}
            {this.documentSignatureRender(document.id)}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { box } = this.props;

    if (box.children && box.documents && !box.children.length && !box.documents.length) {
      return null;
    }

    return (
      <div className="common-lists">
        {this.boxesRender()}
        {this.documentsRender()}
      </div>
    );
  }
}
