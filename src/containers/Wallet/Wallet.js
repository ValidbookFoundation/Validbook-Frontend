import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wallet from '../../components/WalletPage';
import WalletMenu from '../../components/WalletPage/WalletMenu';
import './index.scss';

import {
  getCustodialBalance,
  getTransactionRecords
} from '../../actions/document';

@connect(state => ({
  transactions: state.document.transactions,
  custodial_balance: state.document.custodial_balance
}), {
  getCustodialBalance,
  getTransactionRecords
})

export default class WalletContainer extends Component {
  static propTypes = {
    small_subheader: PropTypes.bool,
    transactions: PropTypes.array,
    custodial_balance: PropTypes.number,
    getCustodialBalance: PropTypes.func,
    getTransactionRecords: PropTypes.func
  }
  
  componentDidMount() {
    const {getCustodialBalance, getTransactionRecords} = this.props;
    
    getCustodialBalance();
    getTransactionRecords();
  }

  render() {
    const { transactions, custodial_balance, small_subheader } = this.props;

    return (
      <div
        className="contents"
        style={{
          marginTop: 70
        }}
      >
        <Helmet 
          title="Wallet - Validbook"
        />
        <div className="wallet_header">
          <div className="wallet_header_content">
            <div className="kudos_text">Kudos distribution has not been started.</div>
            <div>To transact in Ether or other tokens using your Validbook identity (current digital address), please use other wallet applications, for example MyEtherWallet, Metamask.</div>
          </div>
        </div>
        <WalletMenu 
          small_subheader={small_subheader} 
        /> 
        <Wallet
          transactions={transactions} 
          custodial_balance={custodial_balance} 
        /> 
      </div>
    );
  }
}
