import React, {Component} from 'react';
import { asyncConnect } from 'redux-connect';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SubHeader from '../../components/SubHeader';
import Navigation from '../../components/Navigation';
import { getUser } from '../../actions/user';
import {
  parseUserSlug,
  parseRandomNumber
} from '../../utils/url_parsing';
import './user.scss';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const state = getState();
      const path = state.routing.locationBeforeTransitions.pathname;
      const random_number = parseRandomNumber(path);
      const user_slug = parseUserSlug(path);

      if (random_number && user_slug) {
        return dispatch(getUser(user_slug));
      }
    }
  }
])

@connect((state) => ({
  authorized_user: state.user.authorized_user,
  requested_user: state.user.requested_user,
  path: state.routing.locationBeforeTransitions.pathname
}), {
  getUser
})

export default class User extends Component {
  static propTypes = {
    authorized_user: PropTypes.object,
    requested_user: PropTypes.object,
    path: PropTypes.string,
    children: PropTypes.object,
    getUser: PropTypes.func
  }

  state = {
    show_small_subheader: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);

    const { path, getUser } = this.props;
    const random_number = parseRandomNumber(path);
    const user_slug = parseUserSlug(path);

    if (!random_number && user_slug) {
      getUser(user_slug);
    }
  }

  componentWillUnmount() {
    window.scrollTo(0, 0);
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const { getUser, path } = nextProps;
    const user_slug = parseUserSlug(this.props.path);
    const next_user_slug = parseUserSlug(path);

    if (next_user_slug && user_slug && next_user_slug !== user_slug) {
      getUser(next_user_slug);
    }
  }
  
  handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header_container');
    const { show_small_subheader } = this.state;

    if (scrollTop <= 236 && show_small_subheader) {
      header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.15)';

      this.setState({ 
        show_small_subheader: false
      });
    } else if (scrollTop > 236 && !show_small_subheader) {
      header.style.boxShadow = 'none';

      this.setState({
        show_small_subheader: true
      });
    }
  }

  render() {
    const { requested_user, authorized_user, children } = this.props;
    const { show_small_subheader } = this.state;

    return (
      <div className="user_container">
        <SubHeader
          requested_user={requested_user}
        />
        <Navigation
          requested_user={requested_user}
          authorized_user={authorized_user}
          small_subheader={show_small_subheader}
        />
        <div
          className="user_child_container" 
          style={{ 
            marginTop: show_small_subheader ? 68 : 20,
          }}>
          {React.cloneElement(children, {small_subheader: this.state.show_small_subheader})}
        </div>
      </div>
    );
  }
}
