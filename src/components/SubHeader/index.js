import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getConversationByUserPage } from '../../actions/profile';
import { showPopUp } from '../../actions/form';
import {
  uploadAvatar,
  uploadAvatarBase64,
  uploadUserCover,
  uploadUserCoverBase64,
  getUser,
  getUserSlug,
  followrequested_user,
  unfollowrequested_user,
  getUserOriginalAvatar
} from '../../actions/user';
import ChangeCoverImage from '../Popup/ChangeCoverImage';
import ChangeAvatar from '../Popup/ChangeAvatar';
import ShowAvatar from '../Popup/ShowAvatar';
import './index.scss';

const coverColors = [
  '#e53936',
  '#eb3f79',
  '#a900f1',
  '#7d56c2',
  '#5b6ab1',
  '#1d87e3',
  '#029ae5',
  '#00abcf',
  '#00887b',
  '#378d3c',
  '#679e38',
  '#f8a724',
  '#ff6f41',
  '#8c6d63',
  '#778f9c',
  '#414141'
];

@connect((state) => ({
  authorized_user: state.user.authorized_user,
  requested_user: state.user.requested_user,
  visible: state.forms.visible,
  currentImage: state.forms.currentImage,
  activePopUp: state.forms.activePopUp,
  conversation: state.profile.conversation,
  file: state.forms.file,
  original_avatar: state.user.original_avatar
}), {
  followrequested_user,
  unfollowrequested_user,
  showPopUp,
  uploadAvatar,
  uploadAvatarBase64,
  uploadUserCover,
  uploadUserCoverBase64,
  getUser,
  getUserSlug,
  getConversationByUserPage,
  getUserOriginalAvatar
})

export default class SubHeader extends Component {
  state = {
    file: '',
    dropdownUserCover: false,
    currentUserCoverColor: '',
    original_avatar_modal: false
  }

  setCoverColor = (color) => {
    this.setState({currentUserCoverColor: color});
    this.props.uploadUserCover(null, color.substring(1), null);
  }

  onBlur = (e) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({
          dropdownUserCover: false
        });
      }
    }, 0);
  }

  showDropdown = () => {
    this.setState({
      dropdownUserCover: !this.state.dropdownUserCover
    });
  }

  handleAvatarChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    const nameOfPicture = () => {
      if (~file.name.indexOf('.png')) {
        return file.name;
      }
      return `${file.name.substring(0, file.name.lastIndexOf('.'))}.png`;
    };

    reader.onloadend = () => {
      this.setState({file});
      const image = {
        name: nameOfPicture(),
        url: reader.result
      };
      this.props.showPopUp(true, image, 'ChangeAvatar');
      this.cleanInputAvatar();
    };
    reader.readAsDataURL(file);
  }

  handleCoverChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({file});
      const image = {
        name: file.name,
        url: reader.result
      };
      this.props.showPopUp(true, image, 'ChangeCoverImage');
      this.cleanInputCover();
    };
    reader.readAsDataURL(file);
  }

  followUser = (id) => {
    this.props.followrequested_user(id);
  }

  unfollowUser = (id) => {
    this.props.unfollowrequested_user(id);
  }

  cleanInputAvatar = () => {
    this.inputAvatar.value = '';
  }

  cleanInputCover = () => {
    this.inputCover.value = '';
  }

  openConversation = (id, user) => {
    Promise.resolve(this.props.getConversationByUserPage(id, user))
      .then(value => {
        if (value.data.conversation_id) {
          console.log(1);
          browserHistory.push(`/chats/${value.data.conversation_id}`);
        } else {
          console.log(0);
          browserHistory.push('/chats/new');
        }
      });
  }

  _showOriginalAvatar = (e) => {
    const { requested_user } = this.props;

    if (e.target.tagName !== 'INPUT') {
      e.preventDefault();

      this.props.getUserOriginalAvatar(requested_user.slug)
        .then(response => {
          if (response.status === 'success') {
            this.setState({
              original_avatar_modal: true
            });
          }
        });
    }
  }

  closeAvatarModal = () => {
    this.setState({
      original_avatar_modal: false
    });
  }

  originalAvatarModalRender = () => {
    const { original_avatar } = this.props;
    const { original_avatar_modal } = this.state;

    if (!original_avatar) {
      return null;
    }

    return (
      <ShowAvatar 
        showModal={original_avatar_modal}
        avatar={original_avatar}
        closeModalHandler={this.closeAvatarModal}
      />
    );
  }

  render() {
    const { authorized_user } = this.props;
    const {first_name, last_name, slug, is_follow, id, avatar230, cover} = this.props.requested_user;

    return (
      <div className="subHeader">
        <div
          className="imageCover"
          style={{
            backgroundColor: cover && cover.color ? `#${cover.color}` : '#fff',
            backgroundImage: cover && cover.picture_original ? `url(${cover.picture_original})` : null
          }}
        />
        <div className="wrapper">

          <div className="subHeader-userAvatar">
            <div
              onClick={this._showOriginalAvatar}
              style={{
                boxShadow: id ? '0px 1px 3px 0px rgba(0, 0, 0, 0.15)' : 'none',
                background: avatar230 ? `url(${avatar230})` : '#fff'
              }}>
              {/*{avatar230 && <img src={avatar230}/>}*/}
              {this.originalAvatarModalRender()}

              {authorized_user.id && authorized_user.id === this.props.requested_user.id &&
              <div className="subHeader-add">
                <input type="file" onChange={(e) => this.handleAvatarChange(e)} ref={(el) => this.inputAvatar = el}/>
                <a href="#"><i/>Update Profile Photo</a>
              </div>
              }
            </div>
          </div>

          <div className="subHeader-cover">
            {this.props.authorized_user.id === this.props.requested_user.id &&
            <div tabIndex={0} onBlur={this.onBlur}>
              <i/>
              <div
                className="cover-btn" onClick={() => this.showDropdown()}
                style={{opacity: this.state.dropdownUserCover ? 1 : null}}
              >
                {/*<input type="file" onChange={(e) => this.handleCoverChange(e)} ref={el => this.inputCover = el}/>*/}
                <div style={{color: '#fff'}}><i/>Update Cover Photo</div>
              </div>
              <div className="cover-dropdown" style={{display: this.state.dropdownUserCover ? 'block' : 'none'}}>
                <div className="triangle"/>
                <ul>
                  <li style={{marginTop: '5px'}}>
                    <div className="wrapper-upload-cover">
                      <h5>Upload a photo</h5>
                      <input type="file" onChange={(e) => this.handleCoverChange(e)} ref={el => this.inputCover = el}/>
                    </div>
                  </li>
                  <hr/>
                  <li style={{fontSize: '12px'}}>
                    or set a color
                    <div className="wrapper-colors">
                      {coverColors.map((color, index) => (
                        <div
                          key={index}
                          style={{backgroundColor: color}}
                          className={this.state.currentUserCoverColor === color ? 'active' : null}
                          onClick={() => this.setCoverColor(color)}
                        />
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            }
          </div>
          <div className="subHeader-userName">
            <Link to={`/${slug}`}>{first_name} {last_name}</Link>
          </div>
        </div>

        {this.props.activePopUp === 'ChangeCoverImage' &&
        <ChangeCoverImage
          showPopUp={this.props.showPopUp}
          visible={this.props.visible}
          currentImage={this.props.currentImage}
          uploadUserCover={this.props.uploadUserCover}
          uploadUserCoverBase64={this.props.uploadUserCoverBase64}
        />
        }

        {this.props.activePopUp === 'ChangeAvatar' &&
          <ChangeAvatar
            showPopUp={this.props.showPopUp}
            visible={this.props.visible}
            currentImage={this.props.currentImage}
            uploadAvatar={this.props.uploadAvatar}
            uploadAvatarBase64={this.props.uploadAvatarBase64}
          />
        }

      </div>
    );
  }
}

SubHeader.propTypes = {
  requested_user: PropTypes.object,
  authorized_user: PropTypes.object,
  uploadAvatar: PropTypes.func,
  uploadAvatarBase64: PropTypes.func,
  uploadUserCover: PropTypes.func,
  uploadUserCoverBase64: PropTypes.func,
  activePopUp: PropTypes.string,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
  followrequested_user: PropTypes.func,
  unfollowrequested_user: PropTypes.func,
  getConversationByUserPage: PropTypes.func,
  showPopUp: PropTypes.func,
};
