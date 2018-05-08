import React from 'react';
import PropTypes from 'prop-types';

const AccountCardOperationsPopup = ({ url_downloading, revokeHandler }) => {
  const downloadHumanCard = () => {
    window.open(url_downloading);
  };

  return (
    <div className="account_card_operations">
      <div onClick={downloadHumanCard}>
        <span className="download-icon" />
        <span>Download</span>
      </div>
      {revokeHandler &&
        <div onClick={revokeHandler}>
          <span className="delete-icon" />
          <span>Revoke</span>
        </div>
      }
    </div>
  );
};

AccountCardOperationsPopup.PropTypes = {
  url_downloading: PropTypes.string,
  revokeHandler: PropTypes.func
};

export default AccountCardOperationsPopup;
