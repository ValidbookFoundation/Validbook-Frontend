import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'react-md';
import './index.scss';

export default class Wallet extends Component {
  static propTypes = {
    transactions: PropTypes.array,
    custodial_balance: PropTypes.number
  }
  
  custodialBalanceRender = () => {
    const { custodial_balance } = this.props;

    if (isNaN(custodial_balance)) {
      return null;
    }

    return (
      <div className="kudos">
        <span>{custodial_balance}</span><br/>
        <span>KDS</span>
      </div>
    );
  }

  render() {
    const { custodial_balance, transactions } = this.props;

    return (
      <div className="wallet_page">
        <div className="custodial-container">
          <Card
            style={{
              width: 325,
              marginRight: 25
            }}
            className="md-block-centered"
          >
            <CardTitle title="Blockchain Balance" />
            <CardText>
              {this.custodialBalanceRender()}
              <ul className="operations">
                <li><a href="#">Send Kudos</a></li>
              </ul>
            </CardText>
          </Card>

          <Card
            style={{
              width: 325
            }}
            className="md-block-centered"
          >
            <CardTitle title="Custodial Balance" />
            <CardText>
              {this.custodialBalanceRender()}
              <ul className="operations">
                <li><a href="#">Transfer to blockchain balance</a></li>
              </ul>
            </CardText>
          </Card>

        </div>
        <Card
          style={{
            width: 675
          }}
          className="md-block-centered"
        >
          <CardTitle title="Transaction Records" />
          <CardText>
            {transactions.length
              ? transactions.map((transaction, index) => (
                <div key={index}>
                  {transaction.type + ' ' + transaction.amount + ' - ' + transaction.created}
                </div>
              ))
              : 'No transactions'
            }
          </CardText>
        </Card>
      </div>
    );
  }
}
