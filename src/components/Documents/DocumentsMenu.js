import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { browserHistory } from 'react-router';
import { createBox } from '../../actions/document';
import CreateFolderModal from './CreateFolderModal';
import './index.scss';

@connect(null, {
  createBox
})

export default class DocumentsMenu extends Component {
  static propTypes = {
    authorized_user: PropTypes.object,
    requested_user: PropTypes.object,
    box: PropTypes.object,
    fixedMenu: PropTypes.bool,
    createBox: PropTypes.func
  }
  
  state = {
    is_open: true,
    show_modal: false
  }

  _openBoxes = () => {
    this.setState({
      is_open: !this.state.is_open
    });
  }

  _newDocumentClick = () => {
    const { box } = this.props;
    browserHistory.push(`/${this.props.authorized_user.slug}/documents/${box.key}/document`);
  }

  showModal = (e) => {
    e.preventDefault();

    this.setState({
      show_modal: true
    });
  }

  closeModal = () => {
    this.setState({
      show_modal: false
    });
  }

  createBox = (name) => {
    this.props.createBox(name, this.props.box.id);
    
    this.setState({
      show_modal: false
    });
  }
  
  tooltipRender = (text) => {
    return <Tooltip id="tooltip">{text}</Tooltip>;
  }
  
  addIconsRender = () => {
    const {requested_user, authorized_user} = this.props;

    if (!authorized_user.id || requested_user.id !== authorized_user.id) {
      return null;
    }
    
    return (
      <div className="add-new-item">
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Create new folder</Tooltip>}>
          <div className="add-new-folder" onClick={this.showModal}>
            <span
              className="add-new-folder-icon"
              to={'#'}/>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Upload file</Tooltip>}>
          <div className="upload-document">
            <span className="upload-document-icon"></span>
          </div>
        </OverlayTrigger>
      </div>
    );
  }

  documentsNameRender = () => {
    const {authorized_user, requested_user} = this.props;
 
    const desk_name = authorized_user.id === requested_user.id ? 'My Desk' : 'Desk';
 
    return <span>{desk_name}</span>;
  }

  createBoxModalRender = () => {
    const { show_modal } = this.state;

    if (!show_modal) {
      return null;
    }
    
    return (
      <CreateFolderModal
        showModal={show_modal}
        createBoxHander={this.createBox}
        closeModalHandler={this.closeModal}
      />
    );
  }

  render() {
    const { is_open } = this.state;
    const {box, fixedMenu, authorized_user} = this.props;
    const { slug } = this.props.requested_user;
    
    return (
      <div
        className="sidebar documents-nav"
        style={{
          position: fixedMenu ? 'fixed' : null,
          top: fixedMenu ? 116 : null
        }}
      >
        <ul>
          <div className="wrap-boxes" style={{backgroundColor:  '#e1e1e1'}}>
            <div 
              className={is_open 
                ? ' arrow-boxes'
                : 'arrow-boxes-close'
              }
              onClick={this._openBoxes}
            ><i/>
            </div>
 
            <IndexLink to={`/${slug}/documents/desk`} activeClassName="active">
              <li className="documents-mnu-boxes">{this.documentsNameRender()}</li>
            </IndexLink>
          </div>

          <div className="boxes-mnu">
            {box.children && box.children.map(item => (
              <Link key={item.id} to={`/${slug}/documents/${item.key}`} activeClassName="active">
                {item.key === 'backup-of-signed-documents'
                  ? <li className="documents-mnu-signed-folder">{item.name}</li>
                  : <li className="documents-mnu-folder">{item.name}</li>
                }
                
              </Link>
            ))}

            {box.bin &&
              <Link to={`/${slug}/documents/${box.bin.key}`} activeClassName="active">
                <li className="documents-mnu-box-bin">{box.bin.name}</li>
              </Link>
            }
          </div>

          <hr/>

          {this.addIconsRender()}

        </ul>

        {this.createBoxModalRender()}
      </div>
    );
  }
}
