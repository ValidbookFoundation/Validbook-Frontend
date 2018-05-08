import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getBox } from '../../actions/document';
import DocumentsMenu from '../../components/Documents/DocumentsMenu';
import Box from '../../components/Documents/index';
import '../../components/Documents/index.scss';
import {
  parseUserSlug,
  parseBoxSlug
} from '../../utils/url_parsing';
@connect(
  state => ({
    authorized_user: state.user.authorized_user,
    requested_user: state.user.requested_user,
    path: state.routing.locationBeforeTransitions.pathname,
    box: state.document.box
  }),
  {
    getBox
  }
)
export default class Documents extends Component {
  static propTypes = {
    authorized_user: PropTypes.object,
    requested_user: PropTypes.object,
    path: PropTypes.string,
    box: PropTypes.object,
    small_subheader: PropTypes.bool,
    getBox: PropTypes.func
  }

  componentDidMount() {
    const { path, getBox } = this.props;
    const user_slug = parseUserSlug(path);
    const box_slug = parseBoxSlug(path);

    getBox(box_slug, user_slug);
  }

  componentWillReceiveProps(nextProps) {
    const { path, getBox } = this.props;
    const next_user_slug = parseUserSlug(nextProps.path);
    const user_slug = parseUserSlug(path);

    if (next_user_slug !== user_slug) {
      const box_slug = parseBoxSlug(path);
      getBox(box_slug, user_slug);
    }
  }

  render() {
    const {
      authorized_user,
      requested_user,
      box,
      small_subheader
    } = this.props;

    const helmet_title =
      requested_user.first_name && requested_user.last_name
        ? `${requested_user.first_name} ${requested_user.last_name} - Desk`
        : 'Desk';

    return (
      <div className="contents">
        <Helmet title={helmet_title} />
        <DocumentsMenu
          fixedMenu={small_subheader}
          authorized_user={authorized_user}
          requested_user={requested_user}
          box={box}
        />
        <div
          style={{
            width: 890,
            marginLeft: small_subheader ? 240 : null
          }}
        >
          <Box
            authorized_user={authorized_user}
            requested_user={requested_user}
            box={box}
          />
        </div>
      </div>
    );
  }
}
