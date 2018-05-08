import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {follow as followUser, filterWhoToFollowUsers} from '../../../actions/follow';
import './index.scss';

@connect(null, {
  followUser,
  filterWhoToFollowUsers,
})

export default class FollowBlock extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
  }

  follow(id) {
    this.props.followUser(id, 'whoToFollow').then(response => {
      if (response.data && response.data.is_follow) {
        this.props.filterWhoToFollowUsers(id);
      }
    });
  }

  render() {
    const {whoToFollowList} = this.props;

    return (
      whoToFollowList.length > 0 &&
      <div className="follow-block" style={{marginBottom: '20px'}}>
        <div className="wrapper">
          <h3 className="title">Who to follow</h3>

          {whoToFollowList && whoToFollowList.map((person) => (
            <div key={person.id} className="follow-people">
              <Link to={`/${person.slug}`} className="follow-people-link-img">
                <img src={person.avatar}/>
              </Link>
              <div className="follow-people-text">
                <div className="follow-people-text-user">
                  <Link to={`/${person.slug}`}>{`${person.first_name} ${person.last_name}`}</Link>
                </div>
                <div
                  className="follow-people-text-btn"
                  onClick={() => this.follow(person.id)}>
                  {person.is_follow ? 'Following' : 'Follow'}
                </div>
              </div>
              <div className="remove-user-container">
                <span className="remove-icon" onClick={() => this.props.filterWhoToFollowUsers(person.id)}></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

FollowBlock.propTypes = {
  whoToFollowList: PropTypes.array,
};
