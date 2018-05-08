import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import AccountCard from '../../AccountCardPage/AccountCard';

const Cutaway = ({requested_user_profile, requested_user, authorized_user}) => {
  const _toAccountCardPage = (e) => {
    if (e.target.className !== 'account_card_container' && requested_user_profile.card && requested_user_profile.card.public_address) {
      browserHistory.push(`/${requested_user.slug}/identity-page/${requested_user_profile.card.public_address}`);
    }
  };

  const {
    bio,
    occupation,
    company,
    country_id,
    location,
    birthDay,
    birthMonth,
    birthYear,
    phone,
    website,
    facebook,
    twitter,
    linkedin,
    skype,
    user_id
  } = requested_user_profile;

  if (!user_id) {
    return null;
  }

  const work = (occupation, company) => {
    if (occupation && company) {
      return `${occupation} at ${company}`;
    } else if (!occupation && company) {
      return `Works at ${company}`;
    }
    
    return occupation;
  };

  const socialNetwork = () => {
    if (facebook || twitter || linkedin || skype) {
      return (
        <div className="social-network-container">
          <span className="social-network-icon"/>
          {facebook && <a href={facebook} className="facebook"/>}
          {twitter && <a href={twitter} className="twitter"/>}
          {linkedin && <a href={linkedin} className="linkedin"/>}
          {skype && <a href={skype} className="skype"/>}
        </div>
      );
    }
  };

  return (
    <div className="infoblocks-cutaway">
      <div className="title-infoblocks">
        <span className="cutaway-icon"/>
        <span
          className="identity_name"
          onClick={_toAccountCardPage}
        >
          realJimboFry777
          {/* {requested_user_profile.card.account_name} */}
        </span>
        <Link to="/settings" className="settings-edit"><i/></Link>
      </div>
      

      <div className="wrapper">
        {bio &&
        <div className="bio">
          {bio}
          <hr />
        </div>
        }

        {/*{occupation &&*/}
        {/*<div className="occupation">*/}
        {/*<b>Occupation:</b>*/}
        {/*<p>{occupation}</p>*/}
        {/*</div>*/}
        {/*}*/}

        <div className="profile_account_card_container">
          <span className="map_marker_icon"/>
          <p className="public_address">
            {requested_user_profile.card.public_address}
          </p>
        </div>

        {(company || occupation) &&
        <div className="company">
          <i/>
          <p>{work(occupation, company)}</p>
        </div>
        }

        {/*<div className="country">*/}
        {/*<b>Country:</b>*/}
        {/*<p>United States</p>*/}
        {/*</div>*/}

        {location &&
        <div className="location">
          <i/>
          <p>{`Lives in ${location}`}</p>
        </div>
        }

        {birthYear !== 0 && birthYear &&
        <div className="birthday">
          <i/>
          <p>January 18, {`${birthYear}`}</p>
        </div>
        }

        {phone &&
        <div className="phone">
          <i/>
          <p>{phone}</p>
        </div>
        }

        {website &&
        <div className="websites">
          <i/>
          <p><Link to={website}>{website}</Link></p>
        </div>
        }

        {socialNetwork()}

      </div>
    </div>
  );
};

Cutaway.propTypes = {
  authorized_user: PropTypes.object,
  requested_user_profile: PropTypes.object,
  requested_user: PropTypes.object
};

export default Cutaway;
