import React from 'react';
import { Link } from 'react-router';

import './SecondaryHeader.scss';

const secondaryHeader = () => (
  <div className="statements_secondary_header">
    <div className="statements_navigation">
      <Link to="/statements/sign" activeClassName="active">Sign Statement</Link>
      <Link to="/statements/verify" activeClassName="active">Verify Statement</Link>
    </div>
  </div>
);

export default secondaryHeader;
