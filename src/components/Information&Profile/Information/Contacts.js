import React, { Component } from 'react';
import Helmet from 'react-helmet';
import InformationMenu from './InformationMenu';
import InformationFooter from './InformationFooter';
import './index.scss';

class Contacts extends Component {
  render() {
    return (
      <div className="additional-wrap">
        <Helmet title="Contact Us"/>
        <InformationMenu />

        <div className="additional-content">
          <div className="additional-title">Contact Us</div>

          <div className="information-wrap-content information-contacts">
            <p>For help and support: <a href="#">support@validbook.org</a></p>
            <p>For general information and queries: <a href="#">support@validbook.org</a></p>
            <p>For press inquiries: <a href="#">support@validbook.org</a></p>
          </div>
          <InformationFooter />
        </div>
      </div>
    );
  }
}

export default Contacts;
