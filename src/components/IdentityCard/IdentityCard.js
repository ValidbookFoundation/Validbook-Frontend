import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountCardOperationsPopup from './AccountCardOperationsPopup';
import './account-card.scss';

export default class AccountCard extends Component {
  static propTypes = {
    card: PropTypes.object,
    authorized_user: PropTypes.object
  }

  state = {
    show_operations: false
  }

  accountCardOperationsIconRender = () => {
    const { card } = this.props;

    if (card.public_address && 'claims' in card) {
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

  onShowAccountCardOperationsClick = () => {
    this.setState({
      show_operations: !this.state.show_operations
    });
  }
  
  accountCardOperationsRender = () => {
    if (!this.state.show_operations) {
      return null;
    }

    const { card, authorized_user } = this.props;
    const auth_account_card_address = authorized_user.card;
    const card_adress = authorized_user.card;
    let handler = null;

    if (auth_account_card_address === card_adress) {
      handler = this._openRevokeModal;
    }

    return (
      <AccountCardOperationsPopup
        url_downloading={card.full_card_url}
        revokeHandler={handler}
      />
    );
  };

  accountCardInfoRender = () => {
    const { card } = this.props;

    if (!card || !card.public_address) {
      return null;
    }

    return (
      <div className="account_card">
        <div className="account_card_icons">
          {this.accountCardOperationsIconRender()}
        </div>
        <h2 className="account_name">realJimboFry777</h2>
        <p>Identity</p>
        <p className="public_address">{card.public_address}</p>
        <p>Current Digital Address (Ethereum)</p>
      </div>
    );
  }

  render() {
    return (
      <div className="account_card_container">
        {this.accountCardInfoRender()}
      </div>
    );
  }
}
