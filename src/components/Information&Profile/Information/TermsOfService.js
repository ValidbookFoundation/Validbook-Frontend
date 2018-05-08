import React, {Component} from 'react';
import Helmet from 'react-helmet';
import InformationMenu from './InformationMenu';
import InformationFooter from './InformationFooter';
import './index.scss';

class TermsOfService extends Component {
  render() {
    return (
      <div className="additional-wrap">
        <Helmet title="Terms of service"/>
        <InformationMenu />

        <div className="additional-content">
          <div className="additional-title">Terms of service</div>

          <div className="information-wrap-content">
            <h2 style={{padding: '0'}}>Validbook Website Terms of Service</h2>
            <h3>Introduction</h3>
            <p>These terms and conditions govern your use of Validbook website; by using this website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website.</p>
            <p>This website uses cookies. By using This website and agreeing to these terms and conditions, you consent to Validbook's use of cookies in accordance with the terms of Validbook's privacy policy.</p>

            <h2>The most important terms and conditions</h2>
            <p>Validbook team from one side and you as user of Validbook website from another side promise while using this website to – <b>Always Act With Honesty</b>.</p>

            <ul>
              <li>You, as user of Validbook website, promise to not spam or troll other user.</li>
              <li>You, as user of Validbook website, promise to use your real First and Last Name while registering and using Validbook.</li>
              <li>You, as user of Validbook website, promise to not create fake accounts.</li>
              <li>Validbook has a right to suspend and/or delete your account in case it will be proved that you have breached one of the conditions above.</li>
            </ul>

            <h3>License to use website</h3>
            <p>Unless otherwise stated, Validbook and/or its licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.</p>
            <p>You may view, download for caching purposes only, and print pages or other content from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.</p>
            <p>You must not:</p>
            <ul>
              <li>sell, rent or sub-license material from the website;</li>
              <li>reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose;</li>
            </ul>

            <h3>Acceptable use</h3>
            <p>You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.</p>
            <p>You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.</p>
            <p>You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to this website without Validbook express written consent.</p>
            <p>You must not use this website to transmit or send unsolicited commercial communications.</p>
            <p>You must not use this website for any purposes related to marketing without Validbook's express written consent.</p>

            <h3>Restricted access</h3>
            <p>Access to certain areas of this website is restricted. Validbook reserves the right to restrict access to areas of this website, or indeed this entire website, at Validbook' discretion.</p>
            <p>If Validbook provides you with a user ID and password to enable you to access restricted areas of this website or other content or services, you must ensure that the user ID and password are kept confidential.</p>
            <p>Validbook may disable your user ID and password in Validbook's sole discretion without notice or explanation.</p>



            {/* <h3></h3>
            <p></p>
            <ul>
              <li></li>
            </ul> */}

          </div>
          <InformationFooter />
        </div>
      </div>
    );
  }
}

export default TermsOfService;
