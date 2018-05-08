import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Slider } from 'react-md';

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
export default class ArbitrationPageContainer extends Component {
  state = {
    slider_value: 10,
    arbitr_value: 'I am not able to determine the validity of the statement.',
    tooltip_position: null
  }

  componentDidMount() {
    const { path, getCard, getUser } = this.props;
    const user_slug = parseUserSlug(path);
    const header = document.querySelector('.header_container');
    header.style.boxShadow = 'none';

    if (user_slug) {
      getUser(user_slug);
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
    
    const data = {
      public_address: '0x0C28aF1ccB4298c4305A6376A050Cb7234Eae3B0'
    };

    return (
      <AccountCard
        card={data}
        authorized_user={authorized_user}
      />
    );
  }

  onSliderHover = (e) => {
    const slider_position = e.target.getBoundingClientRect().left;

    this.setState({
      tooltip_position: e.clientX - slider_position
    });
  }

  onSliderOver = () => {
    this.setState({
      tooltip_position: null
    });
  }

  tooltipRender = () => {
    const { tooltip_position } = this.state;
    let text = null;

    if (!tooltip_position) {
      return null;
    }

    if (tooltip_position <= 90) {
      text = 'Not Valid';
    } else if (tooltip_position >= 1040) {
      text = 'Valid';
    } else {
      text = 'Uncertain';
    }

    return (
      <div
        className="block-additional"
        style={{
          left: tooltip_position,
          position: 'absolute',
          top: -31,
          display: 'block'
        }}
      >
        {text}
      </div>
    );
  }

  footerRender = () => {
    const { slider_value } = this.state;
    
    return (
      <div className="footer_container">
        <div className="footer">
          <div className="range">
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={slider_value}
              onChange={this.onSliderValueChange}
              onMouseMove={this.onSliderHover}
              onMouseOut={this.onSliderOver}
            />
            {this.tooltipRender()}
            <div className="slider_values">
              <div/>
              <div/>
              <div/>
              <div/>
            </div>
          </div>
          {/* <Slider
            id="disctete-ticks-slider"
            max={10}
            step={1}
            valuePrecision={1}
            value={slider_value}
            onChange={this.onSliderValueChange}
          /> */}
          <div className="sign_arbitrt_value">
            <span>{this.state.arbitr_value}</span>
            <button className="btn-brand btn-sign">Sign</button>
          </div>
        </div>
      </div>
    );
  }

  onSliderValueChange = (e) => {
    const num_value = e.target.value;
    let text_value = null;
    let new_num_value = null;

    if (num_value <= 1) {
      text_value = 'Beyond reasonable doubt this statement is not valid.';
      new_num_value = 0;
    } else if (num_value >= 19) {
      text_value = 'Beyond reasonable doubt this statement is valid.';
      new_num_value = 20;
    } else {
      text_value = 'I am not able to determine the validity of the statement.';
      new_num_value = 10;
    }

    this.setState({
      arbitr_value: text_value,
      slider_value: new_num_value
    });
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
          tilte="Arbitration - Validbook"
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
        {this.footerRender()}
      </div>
    );
  }
}
