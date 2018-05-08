import React from 'react';
import { Link } from 'react-router';

const WalletMenu = ({small_subheader}) => {
  return (
    <div 
      className="sidebar"
      style={{
        position: small_subheader ? 'fixed' : null,
        top: small_subheader ? 118 : null
      }}
    >
      <ul
        style={{
          marginBottom: 10
        }}
      >
        <Link activeClassName="active" onlyActiveOnIndex={true} to="/wallet">
          <li>realJimboFry777</li>
        </Link>
      </ul>

      <a className="add_account_link">+ Add account</a>
    </div>
  );
};

export default WalletMenu;
