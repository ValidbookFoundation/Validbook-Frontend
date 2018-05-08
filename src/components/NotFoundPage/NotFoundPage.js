import React from 'react';
import { Link } from 'react-router';
import './index.scss';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h2>
        Sorry, this page isn't available
      </h2>
      <h4>
        The link you followed may be broken, or the page may have been removed.
      </h4>

      <div>
        <Link to="/" style={{marginRight: '30px'}}> Go back to the previous page </Link>
        <a href="http://validbook.org" target="_blank"> Go to Validbook homepage </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
