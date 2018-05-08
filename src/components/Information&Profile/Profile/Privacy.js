import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import BooksTreeContainer from '../../../containers/BooksTreeContainer';
import './index.scss';

class Privacy extends Component {
  render() {
    return (
      <div className="additional-content">
        <Helmet title="Privicy Control Center"/>
        <div className="additional-title">Privicy Control Center</div>

        <div className="privacy-wrap">
          <ButtonToolbar>
            <DropdownButton className="bootstrap-pure-btn privacy-pure-btn" title="Wallbook privacy" pullRight >
              <ul className="privacy-activity-list">
                <li>Visibility of stories that you log into other people's books or Wallbooks is controlled by owners of those books or Wallbooks.</li>
                <li>If you like or comment other people's stories, these likes, comments may appear in you follower's channels depending on privacy of stories that you like or comment.</li>
              </ul>
            </DropdownButton>
          </ButtonToolbar>

          <ButtonToolbar>
            <DropdownButton className="bootstrap-pure-btn privacy-pure-btn" title="Books privacy" >
              <div className="privacy-books-tree">
                {/*<BooksTreeContainer />*/}
              </div>
            </DropdownButton>
          </ButtonToolbar>

          <ButtonToolbar>
            <DropdownButton className="bootstrap-pure-btn privacy-pure-btn" title="Privacy of activity with other people's stories and books" >
              <ul className="privacy-activity-list">
                <li>Visibility of stories that you log into other people's books or Wallbooks is controlled by owners of those books or Wallbooks.</li>
                <li>If you like or comment other people's stories, these likes, comments may appear in you follower's channels depending on privacy of stories that you like or comment.</li>
              </ul>
            </DropdownButton>
          </ButtonToolbar>
        </div>

        {this.props.children}
      </div>
    );
  }
}

Privacy.propTypes = {
  children: PropTypes.element
};

export default Privacy;
