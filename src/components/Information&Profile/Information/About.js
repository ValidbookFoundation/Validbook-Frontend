import React, { Component } from 'react';
import Helmet from 'react-helmet';
import InformationMenu from './InformationMenu';
import InformationFooter from './InformationFooter';
import './index.scss';

class About extends Component {
  render() {
    return (
      <div className="additional-wrap">
        <Helmet title="About"/>
        <InformationMenu />

        <div className="additional-content">
          <div className="additional-title">About</div>

          <div className="information-wrap-content">
            <h2 style={{'padding-top': '0'}}>Validbook is a universal platform for cooperation.</h2>

            <p>
              It consists of 3 main parts. <br/>
              § A universal log – an effective tool to organize information and learn about something or someone.<br/>
              § A universal communication platform, that can be used for any type of communication either social-, interest- or work-related.<br/>
              § A tool to create, store and exchange indestructible tokens-documents. Tokens behave similarly to real-world, physical paper documents. They can be stored, exchanged, collected. Tokens can be destroyed only by their current owner.<br/>
            </p>

            <hr className="additional-hr"/>

            <p>Validbook is an open source, open governance, user controlled, not-for-profit, social enterprise. It is funded through debt and its own operational income.</p>
            <hr className="additional-hr" style={{'margin-bottom': '0'}}/>

            <h2>Validbook mission is to enhance cooperation, by making it more transparent and reliable.</h2>

            <p>Transparency of cooperation is improved by Validbook books, that can be used to organize information and make observable and unobservable qualities of subjects and objects of cooperation clearer and more understandable.</p>
            <p>Reliability of cooperation is improved by Validbook tokens (smart documents), that can be used to decrease reliance on trust when needed and make cooperation more certain and unfailing.</p>
          </div>

          <InformationFooter />
        </div>
      </div>
    );
  }
}

export default About;
