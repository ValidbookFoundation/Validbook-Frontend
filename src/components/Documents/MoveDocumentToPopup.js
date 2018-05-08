import React, { Component } from 'react';
import './move-document-to-popup.scss';

class MoveDocumentToPopup extends Component {

  onBoxClick(key) {
    this.props.moveDocumentToHandler(key);
  }

  boxRender() {

    return this.props.box.children.map(box => (
      <div 
        key={box.id} 
        className="popup-box-item"
        onClick={() => this.onBoxClick(box.key)}>
        {box.name === 'Backup of signed documents'
          ? <div className="backup-folder-icon"/>
          : <div className="simple-folder-icon"/>
        }
        <div className="folder-name">{box.name}</div>
        <div className="chevron-right-container">
          <div className="chevron-right-icon"></div>
        </div>
      </div>
    ));
  }

  documentsRender() {
    return this.props.box.documents.map(document => (
      <div key={document.id} className="popup-document-item">
        <div className="document-icon"/>
        <div className="document-name">{document.title}</div>
      </div>
    ));
  }

  render() {
    return (
      <div className="move-document-to-container">
        <div className="move-to-header-container">
          <div className="move-to-header">
            <div className="arrow-left-container">
              <div className="arrow-left-icon"/>
            </div>
            <h1>My Documents</h1>
          </div>
        </div>
        <div className="boxes-container">
          {this.boxRender()}
          {this.documentsRender()}
        </div>
        <div className="move-to-footer">
          <div>Move Here</div>
          <div className="add-folder-container">
            <div className="add-folder-icon"/>
          </div>
        </div>
      </div>
    );
  }
}

export default MoveDocumentToPopup;
