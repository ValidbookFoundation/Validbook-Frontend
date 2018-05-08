import React from 'react';
import { Link } from 'react-router';
import './index.scss';

const InformationFooter = () => {
  return (
    <div className="information-footer">
      <ul>
          <li>Validbook 2017 ©</li>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/terms-of-service">
          <li>Terms of service</li>
        </Link>
        <Link to="/contacts">
          <li>Contact us</li>
        </Link>
      </ul>
    </div>
  );
};

export default InformationFooter;
