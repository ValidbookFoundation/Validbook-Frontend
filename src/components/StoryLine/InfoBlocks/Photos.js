import React from 'react';
import { Link } from 'react-router';

const Photos = ({photos, requested_user}) => {
  return (
    <div className="infoblocks-photos">
      <div className="title-infoblocks">
        <span className="photos-icon"/>
        <Link onClick={() => window.scrollTo(0, 0)} to={`/${requested_user.slug}/photos`}>Photos</Link>
        <i style={{color: '#999', fontSize: '14px', lineHeight: '22px', margin: '0 5px'}}>·</i>
        <span style={{color: '#999', fontSize: '14px'}}>Nothing to Show</span>
      </div>

      <div className="photos-gallery">
        {photos.map(photo => (
          <div className="photos-image">
            <img src={`${photo.picture_small}`}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
