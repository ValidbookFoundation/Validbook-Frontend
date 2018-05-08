import React from 'react';
import { Link } from 'react-router';

const Logo = () => (
  <div className="logo" >
    <Link to="/" onClick={() => document.body.scrollTop = 0}>
      <img src={require('../../img/Default/logo.svg')} />
    </Link>
  </div>
);

export default Logo;
