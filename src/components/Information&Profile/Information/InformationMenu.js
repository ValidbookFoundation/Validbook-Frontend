import React from 'react';
import { Link } from 'react-router';
import './index.scss';

const InformationMenu = () => {
  return (
    <div className="additional-mnu">
      <div className="additional-title">Validbook Information</div>
      <ul className="additional-mnu-ul">
        <Link to="/about" className="additional-mnu-link" activeClassName="additional-mnu-link-active">
          <li>About</li>
        </Link>
        <Link to="/terms-of-service" className="additional-mnu-link" activeClassName="additional-mnu-link-active">
          <li>Terms of service</li>
        </Link>
        <Link to="/contacts" className="additional-mnu-link" activeClassName="additional-mnu-link-active">
          <li>Contact us</li>
        </Link>
      </ul>
    </div>
  );
};

export default InformationMenu;
