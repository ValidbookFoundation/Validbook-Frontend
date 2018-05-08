import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router';
import './document-item.scss';

const DocumentItem = ({document, box_key, user_slug, showMoreOperationsHandler}) => {
  const onShowMoreOperationsClick = (id, e) => {
    showMoreOperationsHandler(id, e);
  };

  return (
    <Link className="document-item" to={`/${user_slug}/documents/${box_key}/document/${document.id}`}>
      <div className="document-item-thumbnail">
        {document.icon && 
          <img src={document.icon} />
        }
      </div>
      <div className="document-item-metadata-container">
        <div className="document-item-title">
          {document.title}
        </div>
        <div className="document-item-metadata-row">
          <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">{document.signatures.length} signatures</Tooltip>}>
            <div className="document-signatures-counter">
              <div className="signed-document-icon"/>
              <div className="signatures-document-item">{document.signatures.length}</div>
            </div>
          </OverlayTrigger>
        </div>
        <div className="document-item-show-more-container">
          <div className="show-more-operations-icon" onClick={(e) => onShowMoreOperationsClick(document.id, e)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 4.5 18" width="4.5"><path d="M2.25 4.5c1.237 0 2.25-1.013 2.25-2.25C4.5 1.012 3.487 0 2.25 0 1.012 0 0 1.012 0 2.25 0 3.487 1.012 4.5 2.25 4.5zm0 2.25C1.012 6.75 0 7.763 0 9c0 1.238 1.012 2.25 2.25 2.25 1.237 0 2.25-1.012 2.25-2.25 0-1.237-1.013-2.25-2.25-2.25zm0 6.75C1.012 13.5 0 14.512 0 15.75S1.012 18 2.25 18c1.237 0 2.25-1.012 2.25-2.25S3.487 13.5 2.25 13.5z" fill="#cdcdcd"/></svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

DocumentItem.PropTypes = {
  document: PropTypes.obj,
  box_key: PropTypes.string,
  user_slug: PropTypes.string,
  showMoreOperationsHandler: PropTypes.func
}

export default DocumentItem;
