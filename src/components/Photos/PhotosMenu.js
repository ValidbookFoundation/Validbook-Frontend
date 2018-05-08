import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

@connect((state) => ({
  authorized_user: state.user.authorized_user,
}), {})

export default class PhotosMenu extends Component {
  render() {
    const { small_subheader } = this.props;
    const { slug } = this.props.authorized_user;

    return (
      <div 
        className="sidebar"
        style={{
          position: small_subheader ? 'fixed' : null,
          top: small_subheader ? 118 : null
      }}>
        <ul>
          {/* <Link onlyActiveOnIndex={true} to={link + '/photos'} activeClassName="active"> */}
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos`} activeClassName="active">
            <li>All Photos</li>
          </Link>
          {/*<Link onlyActiveOnIndex={true} to={`/${slug}/photos/external`} activeClassName="active">*/}
          {/*<li>External</li>*/}
          {/*</Link>*/}
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos/profile`} activeClassName="active">
            <li>Profile Pictures</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos/covers`} activeClassName="active">
            <li>Cover Photos</li>
          </Link>
        </ul>
        <p style={{padding: '10px 10px 10px 30px', color: '#8f8f8f'}}>Photos from books:</p>
      </div>
    );
  }
}

PhotosMenu.propTypes = {
  authorized_user: PropTypes.object,
};
