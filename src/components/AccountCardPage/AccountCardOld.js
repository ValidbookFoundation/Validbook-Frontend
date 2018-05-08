import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { HUMAN_CARD_DIALOG } from './constants';
import AccountCardOperationsPopup from './AccountCardOperationsPopup';
import SignAccountCardModal from './SignAccountCardModal';
import SignErrorModal from './SignErrorModal';
import {
  supportHumanClaimSignature,
  humanClaimSignature,
  revokeSupportHumanClaimSignature
} from '../../actions/accountCard';
import {
  filterSupportHumanClaimSignature
} from '../../utils/accountCard';
import {
  messageForSupportHumanClaim,
  sendMessageForHumanClaim
} from '../../api/accountCard';
import './account-card-old.scss';

const web3 = new Web3(Web3.givenProvider);

@connect(null, {
  supportHumanClaimSignature,
  humanClaimSignature,
  revokeSupportHumanClaimSignature
})
export default class AccountCard extends Component {
  
  static propTypes = {
    authorized_user: PropTypes.object,
    requested_user: PropTypes.object,
    card: PropTypes.object,
    supportHumanClaimSignature: PropTypes.func,
    humanClaimSignature: PropTypes.func,
    revokeSupportHumanClaimSignature: PropTypes.func
  };

  state = {
    show_operations: false,
    step_dialog: null,
    prev_step: null,
    sign_success: false
  };

  componentDidMount() {
    window.addEventListener('click', this._closeOperationsClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._closeOperationsClick);
  }

  _closeOperationsClick = () => {
    if (this.state.show_operations) {
      this.setState({
        show_operations: false
      });
    }
  };

  toAccountCardPage = () => {
    const { card } = this.props;
    const { slug } = this.props.requested_user;

    if (card.public_address) {
      browserHistory.push(
        `/${slug}/account-card/${card.public_address}`
      );
    } else {
      browserHistory.push(`/${slug}/account-card`);
    }
  };

  accountCardOperationsIconRender = () => {
    const { card, info_block } = this.props;

    if (!info_block && card.public_address) {
      return (
        <div
          onClick={this.onShowAccountCardOperationsClick}
          className="account_card_operations_icon_container"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="19" width="4.75" version="1.1" viewBox="0 0 4.75 19">
            <path d="m2.4254 6.2665c0.9467 0 1.7213-0.77457 1.7213-1.7213 0-0.9467-0.77457-1.7213-1.7213-1.7213-0.9467 0-1.7213 0.77457-1.7213 1.7213 0 0.9467 0.77457 1.7213 1.7213 1.7213zm0 1.7213c-0.9467 0-1.7213 0.77457-1.7213 1.7213 0 0.9467 0.77457 1.7213 1.7213 1.7213 0.9467 0 1.7213-0.77457 1.7213-1.7213 0-0.9467-0.77457-1.7213-1.7213-1.7213zm0 5.1638c-0.9467 0-1.7213 0.77457-1.7213 1.7213 0 0.9467 0.77457 1.7213 1.7213 1.7213 0.9467 0 1.7213-0.77457 1.7213-1.7213 0-0.9467-0.77457-1.7213-1.7213-1.7213z" strokeWidth=".86064" fill="#cdcdcd"/>
          </svg>
          {this.accountCardOperationsRender()}
        </div>
      );
    }
  }

  onShowAccountCardOperationsClick = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      show_operations: !this.state.show_operations
    });
  };

  accountCardRender = () => {
    const { card } = this.props;

    if (!card || !card.public_address) {
      return null;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', card.url, false);
    xhr.send();

    return <ReactMarkdown source={xhr.responseText} />;
  };

  accountCardOperationsRender = () => {
    if (!this.state.show_operations) {
      return null;
    }

    const { card, authorized_user } = this.props;
    const auth_account_card_address = authorized_user.card;
    const support_address = filterSupportHumanClaimSignature(card, auth_account_card_address);
    let handler = null;

    if (support_address) {
      handler = () => this._revokeSignature(card.public_address, auth_account_card_address);
    } else {
      handler = this._openRevokeModal;
    }

    return (
      <AccountCardOperationsPopup
        url_downloading={card.full_card_url}
        revokeClaim={!!support_address}
        revokeHandler={handler}
      />
    );
  };

  _openRevokeModal = () => {
    this.setState({
      step_dialog: HUMAN_CARD_DIALOG.REVOKE
    });
  };

  _openSelfSignDialog = () => {
    this.setState({
      step_dialog: HUMAN_CARD_DIALOG.SIGN
    });
  };

  _revokeSignature = (support_address, auth_account_card_address) => {
    const { revokeSupportHumanClaimSignature } = this.props;

    revokeSupportHumanClaimSignature(support_address, auth_account_card_address)
      .then(() => {
        this.setState({
          step_dialog: null
        });
      });
  }

  _supportAccountCard = (keystore, password) => {
    const { supportHumanClaimSignature, authorized_user, card } = this.props;

    try {
      const decrypt = web3.eth.accounts.decrypt(
        JSON.parse(keystore.toLowerCase()),
        password
      );

      messageForSupportHumanClaim(card.public_address)
        .then(response => {
          if (response.data.status === 'success') {
            const result = web3.eth.accounts.sign(
              response.data.data.message,
              decrypt.privateKey
            );
            const data = {
              signature: result.signature
            };

            supportHumanClaimSignature(card.public_address, data).then(() => {
              this.setState({
                step_dialog: null,
                sign_success: true
              });
            });
          }
        })
        .catch(error => {
          let self_sign = null;

          if (card.claims) {
            self_sign = card.claims.filter(claim => claim.type === 'I am human')[0];
          }
          if (error.errors[0].code === 422 && authorized_user.card !== card.public_address && !self_sign) {
            this.setState({
              error: 'You need to make claim "I am human"',
              step_dialog: HUMAN_CARD_DIALOG.SIGN_ERROR,
              prev_step: this.state.step_dialog
            });
          } else if (error.errors[0].code === 422 && authorized_user.card !== card.public_address) {
            this.setState({
              error: 'You will not do claim "You are human"',
              step_dialog: HUMAN_CARD_DIALOG.SIGN_ERROR,
              prev_step: this.state.step_dialog
            });
          }
        });
    } catch (error) {
      this._openErrorSignModal();
    }
  };

  _selfSignAccountCard = (keystore, password) => {
    const {
      humanClaimSignature,
      authorized_user,
      card
    } = this.props;

    try {
      const decrypt = web3.eth.accounts.decrypt(
        JSON.parse(keystore.toLowerCase()),
        password
      );

      sendMessageForHumanClaim(decrypt.address).then(response => {
        if (response.data.status === 'success') {
          const resultOfSigning = web3.eth.accounts.sign(
            response.data.data.message,
            decrypt.privateKey
          );
          humanClaimSignature(
            card.public_address,
            resultOfSigning.signature
          ).then(response => {
            this.setState({
              step_dialog: null,
              sign_success: true
            });
            browserHistory.push(
              `/${authorized_user.slug}/documents/account-card/${
                response.data.public_address
              }`
            );
          });
        }
      });
    } catch (error) {
      this._openErrorSignModal();
    }
  };

  _openErrorSignModal = () => {
    this.setState({
      step_dialog: HUMAN_CARD_DIALOG.SIGN_ERROR,
      prev_step: this.state.step_dialog
    });
  };

  _openValidateDialog = () => {
    this.setState({
      step_dialog: HUMAN_CARD_DIALOG.VALIDATE
    });
  };

  _closeModal = () => {
    this.setState({
      step_dialog: null
    });
  };

  _closeErrorModal = () => {
    this.setState({
      step_dialog: this.state.prev_step,
      prev_step: null
    });
  };

  _closeSignSuccess = () => {
    this.setState({
      sign_success: false
    });
  };

  showSignSuccessPopupRender = () => {
    if (!this.state.sign_success) {
      return null;
    }

    const { requested_user } = this.props;

    return (
      <div className="human-card-sign-success-container">
        <div className="human-card-sign-success">
          <span>
            Your signature has been successfully stored.
          </span>
          <button>
            <span
              className="close-sign-icon"
              onClick={this._closeSignSuccess}
            />
          </button>
        </div>
      </div>
    );
  };

  modalsRender = () => {
    const { step_dialog, error } = this.state;
    let modalDialog = null;

    switch (step_dialog) {
      case HUMAN_CARD_DIALOG.VALIDATE: {
        modalDialog = (
          <SignAccountCardModal
            title="Validate Human Card"
            button="Validate"
            closeModalHandler={this._closeModal}
            saveModalHandler={this._supportAccountCard}
            showModal={!!step_dialog}
          />
        );
        break;
      }

      case HUMAN_CARD_DIALOG.REVOKE: {
        modalDialog = (
          <SignAccountCardModal
            title="Revoke Human Card"
            button="Revoke"
            closeModalHandler={this._closeModal}
            saveModalHandler={this._revokeSignature}
            showModal={!!step_dialog}
          />
        );
        break;
      }

      case HUMAN_CARD_DIALOG.SIGN: {
        modalDialog = (
          <SignAccountCardModal
            title="Sign Human Card"
            button="Sign"
            closeModalHandler={this._closeModal}
            saveModalHandler={this._selfSignAccountCard}
            showModal={!!step_dialog}
          />
        );
        break;
      }

      case HUMAN_CARD_DIALOG.SIGN_ERROR: {
        modalDialog = (
          <SignErrorModal
            showModal={!!step_dialog}
            error={error}
            closeModalHandler={this._closeErrorModal}
          />
        );
      }
    }

    return modalDialog;
  };

  render() {
    return (
      <div className="account_card_container">
        {this.showSignSuccessPopupRender()}
        <div className="human-card" onClick={this.toAccountCardPage}>
          <div className="account_card_icons">
            <div className="human-icon" />
            {this.accountCardOperationsIconRender()}
          </div>
          {this.accountCardRender()}
        </div>
        {this.modalsRender()}
      </div>
    );
  }
}
