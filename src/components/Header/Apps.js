import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './apps.scss';


const SortableItem = SortableElement(({link}) => {
  if (link.href) {
    return (
      <a
        style={{
          zIndex: 100000
        }}
        href={link.href}
        className={`nav-a ${link.className}`}
        target="_blank"
      >
        <div className="nav-li">
          <span className="app_name">{link.text}</span>
        </div>
      </a>
    );
  }
  
  return (
    <Link
      style={{zIndex: 100000}}
      to={link.to}
      className={`nav-a ${link.className}`}
      target="_blank"
    >
      <div className="nav-li">
        <span className="app_name">{link.text}</span>
      </div>
    </Link>
  );
});

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="apps_row">
      {items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} link={item} />
      ))}
    </div>
  );
});

class Apps extends Component {
  static propTypes = {
    authorized_user: PropTypes.object
  }

  constructor(props) {
    super(props);

    const { authorized_user } = props;

    this.state = {
      items: [
        {
          to: '/',
          className: 'validbook_icon',
          text: 'Validbook'
        }, {
          to: `/${authorized_user.slug}/identity-page/${authorized_user.card}`,
          className: 'identity_icon',
          text: 'Identity'
        }, {
          to: '/statements/sign',
          className: 'signature_icon',
          text: 'Statements'
        }, {
          to: `/${authorized_user.slug}/arbitration`,
          className: 'arbitration_icon',
          text: 'Arbitration'
        }, {
          to: '/wallet',
          className: 'wallet_icon',
          text: 'Wallet'
        }, {
          href: 'http://mail-futurama11001111.validbook.org/',
          className: 'mail_icon',
          text: 'Mail'
        }, {
          href: 'http://drive-futurama11001111.validbook.org/',
          className: 'drive_icon',
          text: 'Drive'
        }, {
          href: '/chats',
          className: 'nav-messages',
          text: 'Chats'
        }
      ]
    };
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  }

  showMoreButtonRender = () => {
    const { show_all_shortcuts, showAllShortcutsHandler } = this.props;

    if (show_all_shortcuts) {
      return (
        <a 
          href="#"
          className="new_shortcut_link"
        >
          Create New Shortcut
        </a>
      );
    }

    return (
      <div
        className="show_more"
        onClick={showAllShortcutsHandler}
      >
        More
      </div>
    );
  }

  showAllShortcutsRender = () => {
    const { authorized_user, show_all_shortcuts } = this.props;

    if (!show_all_shortcuts) {
      return null;
    }

    return (
      <div>
        <hr />

        <div className="apps_row">
          <a
            target="_blank"
            href="http://wiki-futurama11001111.validbook.org"
            className="nav-a nav-wiki wiki_icon">
            <div className="nav-li"
          >
              <span>VB Wiki</span>
            </div>
          </a>
          <a
            target="_blank"
            href="http://forum-futurama11001111.validbook.org/"
            className="nav-a nav-forum forum_icon"
          >
            <div className="nav-li">
              <span>VB Forum</span>
            </div>
          </a>
        </div>
      </div>
    );
  }

  render() {
    const { authorized_user } = this.props;

    return (
      <div className="shortcuts_container">
        <div className="apps_list">

          <div className="arrow_qb"></div>
          <div className="arrow_pb"></div>

          <h1>Shortcuts</h1>

          {/* <SortableList
            axis="xy"
            pressDelay={50}
            items={this.state.items}
            onSortEnd={this.onSortEnd}
          /> */}

          <div className="apps_row">
            <Link
              to={`/${authorized_user.slug}/identity-page/${authorized_user.card}`}
              className="nav-a identity_icon"
              target="_blank"
            >
              <div className="nav-li">
                <span className="app_name">Identity</span>
              </div>
            </Link>
            <Link
              to="/statements"
              className="nav-a signature_icon"
              target="_blank"
            >
              <div className="nav-li">
                <span className="app_name">Statements</span>
              </div>
            </Link>
            <Link
              to={`/${authorized_user.slug}/arbitration`}
              className="nav-a arbitration_icon"
              target="_blank"
            >
              <div className="nav-li">
                <span className="app_name">Arbitration</span>
              </div>
            </Link>
            <Link
              target="_blank"
              to="/wallet"
              className="nav-a wallet_icon"
            >
              <div className="nav-li">
                <span className="app_name">Wallet</span>
              </div>
            </Link>
            <Link
              to="/"
              className="nav-a validbook_icon"
              target="_blank"
            >
              <div className="nav-li">
                <span className="app_name">Validbook</span>
              </div>
            </Link>
            <Link
              to="/chats"
              className="nav-a nav-messages"
              target="_blank"
            >
              <div className="nav-li">
                <span>Chats</span>
              </div>
            </Link>
            <a
              href="http://mail-futurama11001111.validbook.org/"
              className="nav-a mail_icon"
              target="_blank"
            >
              <div className="nav-li">
                <span className="app_name">Mail</span>
              </div>
            </a>
            <a
              href="http://drive-futurama11001111.validbook.org/"
              className="nav-a drive_icon"
              target="_blank"
            >
              <div className="nav-li">
                <span className="app_name">Drive</span>
              </div>
            </a>
          </div>
          
          {this.showAllShortcutsRender()}

        </div>

        {this.showMoreButtonRender()}
      </div>
    );
  }
}

export default Apps;
