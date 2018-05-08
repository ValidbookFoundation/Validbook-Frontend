import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Tooltip, OverlayTrigger, ButtonToolbar, DropdownButton} from 'react-bootstrap';
import {deleteStory, pinStory} from '../../../actions/story';
import DeleteStory from '../../Popup/DeleteStory';
import PinStory from '../../Popup/PinStory';

@connect(null, {
  deleteStory,
  pinStory,
})

class PostHeader extends Component {
  loadBookInfo = (books) => {
    const countBooks = books.length;
    let result;

    if (countBooks > 1) {
      result = (<p>{countBooks} books: {books.map((book) => (
        <Link to={`/${this.props.user.slug}/books/${book.slug}`} key={book.id}>{book.name}</Link>)
      )}</p>);
    } else {
      books.map((book) => (
        result = <p><Link to={`/${this.props.user.slug}/books/${book.slug}`} key={book.id}>{book.name}</Link></p>
      ));
    }
    return result;
  }

  chooseLoudnessIcon = (loudness) => {
    if (!loudness.inChannels && !loudness.inBooks) {
      return 'quiet_log_icon';
    } else if (loudness.inChannels && loudness.inBooks) {
      return 'loud_log_icon';
    } else if (!loudness.inChannels && loudness.inBooks) {
      return 'loud_book_icon';
    }
  }

  chooseLoudnessTooltip = (loudness) => {
    if (!loudness.inChannels && !loudness.inBooks) {
      return 'Story did not appear in the channels';
    } else if (loudness.inChannels && loudness.inBooks) {
      return 'Story was logged loudly. It may have appeared in the channels of your followers. This is visible only to you.';
    } else if (!loudness.inChannels && loudness.inBooks) {
      return 'Story was logged loudly in book. It may have appeared in the channels of book followers. This is visible only to you.';
    }
  }

  chooseVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'private':
        return 'private_icon';
      case 'public':
        return 'public_icon';
      case 'custom':
        return 'custom_icon';

      default:
        console.error('chooseVisibilityIcon empty');
    }
  }

  setVisibility = (visibility_type, story_id) => {
    console.log(visibility_type, story_id);
    this.props.setVisibilityStory(visibility_type, story_id);
  }

  delimiterRender = () => {
    return <div className="post-delimiter">·</div>;
  }

  loudnessRender = () => {
    const { user, authorized_user, loudness } = this.props;

    if (user.slug !== authorized_user.slug) {
      return null;
    }

    return (
      <div className="post_header_item">
        {this.delimiterRender()}
        <div className="post-details-loud-icon">
          <span className={this.chooseLoudnessIcon(loudness)}/>
          <div className="block-additional">
            {this.chooseLoudnessTooltip(loudness)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {fullName, slug, avatar} = this.props.user;
    const {authorized_user, date, visibility, loudness, id, books} = this.props;

    const tooltipBooks = (
      <Tooltip id="tooltipBooks" arrowOffsetLeft={'10%'} placement="left" positionLeft="333">
        <div>Story location:</div>
        {books.map((book) => (
          <div key={book.id}>{book.name}</div>
        ))}
      </Tooltip>
    );

    return (
      <div className="post-header">

        <div className="wrap-post-user-avatar">
          <Link to={`/${slug}`}><img className="post-user-avatar" src={avatar}/></Link>
        </div>

        <div className="wrap-post-user-info">
          <div className="post-user-name">
            <Link to={`/${slug}`}>{fullName}</Link>
          </div>
          <div className="post-details">
            <div className="post-details-date">{date.created}
              <div className="block-additional block-additional-date">
                <div>{`Created on: ${date.exactCreated}`}</div>
              </div>
            </div>
            {this.loudnessRender()}

            {this.delimiterRender()}
            <div className="post-details-visibility-menu">
              {slug === authorized_user.slug 
                ? <DropdownButton
                  className="profileMenu-btn"
                  title={<span className={this.chooseVisibilityIcon(visibility.value)}/>}
                  id={3}
                  pullRight
                >
                  <div className="sbox-visibility">
                    <ul>
                      <li>
                        <div onClick={() => this.setVisibility('public', id)}>
                          <input
                            type="checkbox" name="public_visibility_story" id="public_visibility_story"
                            checked={visibility.value === 'public'}/> {/*not defaultChecked*/}
                          <label htmlFor={'public_visibility_story'}><span/></label>
                          <div>
                            <i className="public_icon"/>
                            <p>Public</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div onClick={() => this.setVisibility('private', id)}>
                          <input
                            type="checkbox" name="private_visibility_story" id="private_visibility_story"
                            checked={visibility.value === 'private'}/>
                          <label htmlFor={'private_visibility_story'}><span/></label>
                          <div>
                            <i className="private_icon"/>
                            <p>Private</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div onClick={() => this.setVisibility('custom', id)}>
                          <input
                            type="checkbox" name="custom_visibility_story" id="custom_visibility_story"
                            checked={visibility.value === 'custom'}/>
                          <label htmlFor={'custom_visibility_story'}><span/></label>
                          <div>
                            <i className="custom_icon"/>
                            <p>Custom</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input
                            type="checkbox" name="reset_visibility_story" id="reset_visibility_story"
                            checked={false} onChange={this.handleCheckVisibility}/>
                          <label htmlFor={'reset_visibility_story'}><span/></label>
                          <div>
                            <i className="reset_icon"/>
                            <p>Reset as per visibility of books</p>
                          </div>
                        </div>
                      </li>
                      <span className="divider"/>
                      <li>
                        <div>
                          <p>History of Story Visibility</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </DropdownButton>
                : <i className={this.chooseVisibilityIcon(visibility.value)}/>
              }
            </div>

            {this.delimiterRender()}
            <div className="post-details-location">
              <OverlayTrigger placement="top" overlay={tooltipBooks} id="tooltipBooks">
                <div>{this.loadBookInfo(books)}</div>
              </OverlayTrigger>
            </div>
          </div>
        </div>

        <div className="wrap-post-story-dropdown">
          <ButtonToolbar>
            <DropdownButton className="profileMenu-btn" title={''} id={4} noCaret pullRight>
              <Link>
                <li>Pin story
                  <div className="wrapper-popup-story">
                    <PinStory
                      pinStory={this.props.pinStory}
                      books={books}
                      id={id}
                    />
                  </div>
                </li>

              </Link>
              <hr/>
              <Link to={`/story/${id}`}>
                <li>Story Details</li>
              </Link>

              <Link>
                <li>Delete Story
                  <div className="wrapper-popup-story">
                    <DeleteStory
                      deleteStory={this.props.deleteStory}
                      id={id}
                    />
                  </div>
                </li>
              </Link>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

PostHeader.propTypes = {
  authorized_user: PropTypes.object,
  user: PropTypes.object,
  setVisibilityStory: PropTypes.func,
  pinStory: PropTypes.func,
  deleteStory: PropTypes.func,
  books: PropTypes.array,
  loudness: PropTypes.object,
  visibility: PropTypes.object,
  date: PropTypes.object,
  id: PropTypes.number,
};

export default PostHeader;
