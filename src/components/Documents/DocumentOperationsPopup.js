import React, { Component } from 'react';
import './document-operations-popup.scss';

class DocumentOperationsPopup extends Component {
  render() {
    const {showModalHandler, deleteDocumentHandler, showMoveToHandler, copyDocumentHandler, openDocumentSignatureHandler, downloadDocumentHandler, openDocumentHandler} = this.props;

    return (
      <div className="document-dropdown-menu">
        <div className="document-dropdown-menu-container">
          <div onClick={openDocumentHandler}>
            <span className="open-icon"/><span>Open</span>
          </div>
          <hr />
          <div>
            <span className="share-icon"/><span>Share</span>
          </div>
          <div onClick={showMoveToHandler}>
            <span className="move-to-icon"/><span>Move to ...</span>
          </div>
          <div onClick={copyDocumentHandler}>
            <span className="make-copy-icon"/><span>Make a copy ...</span>
          </div>
          <div onClick={showModalHandler}>
            <span className="rename-icon"/><span>Rename document</span>
          </div>
          <div onClick={downloadDocumentHandler}>
            <span className="download-icon"/><span>Download</span>
          </div>
          <hr />
          <div>
            <span className="verify-icon"/><span>Verify Signatures</span>
          </div>
          <div onClick={openDocumentSignatureHandler}>
            <span className="sign-icon"/><span>Sign</span>
          </div>
          <hr />
          <div onClick={deleteDocumentHandler}>
            <span className="delete-icon"/><span>Delete</span>
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentOperationsPopup;
