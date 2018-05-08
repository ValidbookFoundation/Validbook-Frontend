import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { getCard } from '../../actions/accountCard';
import { getUser } from '../../actions/user';
import {
  parsePublicAddress,
  parseUserSlug
} from '../../utils/url_parsing';

import AccountCard from '../../components/AccountCardPage/AccountCard';
import './index.scss';

@connect(
  state => ({
    authorized_user: state.user.authorized_user,
    requested_user: state.user.requested_user,
    path: state.routing.locationBeforeTransitions.pathname,
    card: state.account_card
  }),
  {
    getCard,
    getUser
  }
)
export default class IdentityPageContainer extends Component {

  componentDidMount() {
    const { path, getCard, getUser } = this.props;
    const user_slug = parseUserSlug(path);
    const public_address = parsePublicAddress(path);
    const header = document.querySelector('.header_container');
    header.style.boxShadow = 'none';

    if (user_slug) {
      getUser(user_slug);
    }

    if (public_address) {
      getCard(public_address);
    }
  }

  componentDidUpdate(prevProps) {
    const { path, getCard } = this.props;
    if (path !== prevProps.path) {
      const public_address = parsePublicAddress(path);

      if (public_address) {
        getCard(public_address);
      }
    }
  }  

  identityCardRender = () => {
    const { authorized_user, card } = this.props;

    return (
      <AccountCard
        card={card}
        authorized_user={authorized_user}
      />
    );
  }

  render() {
    const {
      authorized_user,
      card,
      requested_user,
    } = this.props;

    return (
      <div className="identity_page_container">
        <Helmet 
          title="Identity - Validbook"
        />
        <div className="identity_page">
          <div className="left_side_container">
            {this.identityCardRender()}
            <div className="representation_statements">
              <h2>Identity Statements</h2>
              <span>Unique Human Identity</span>
            </div>
            <a className="add_representation_statement_link">+Add identity statement</a>
          </div>
          <div className="right_side_container">
            <div className="identity_statement_container">
              <div className="statement_info_container">
                <div className="statement_info">
                  <div className="statement_name">
                    <p className="statement">Certificate of Unique Human Identity</p>
                    <p className="statement_label">Short Name</p>
                  </div>
                  <div className="statement_long_name">
                    <p className="unique_identity">Identity XXX uniquely represents liiving human individual on Validbook.</p>
                    <p className="long_name_label">Long Name</p>
                  </div>
                  <div className="statement_description">
                    <p>This identity uniquely represents a human individual.</p>
                    <p>This identity can be known by and interacted with via Validbook and other services, provided below in the supporting statements.</p>
                    <p className="description_label">Description</p>
                  </div>
                </div>
              </div>
             
              <div className="supporting_statements">
                <div className="self_made_supporting">
                  <h2>Supporting Statements (self made)</h2>
                  <p>I own Validbook Account validbook.org/realJimboFry777 - Valid</p>
                  <p>I own Facebook Account facebook.com/jimbo.somefry - Valid</p>
                  <p>I own Twitter Account twitter.com/jimbo12344 - Valid</p>
                </div>
                <hr />
                <div className="others_supporting">
                  <h2>Supporting Statements (made by others)</h2>
                  <div className="community_support_statements_nav">
                    <a>Graph</a>
                    <a>List</a>
                  </div>
                  <hr/>
                  <hr/>
                  <hr/>
                  <hr/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
