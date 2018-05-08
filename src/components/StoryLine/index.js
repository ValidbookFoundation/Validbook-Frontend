import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import Stream from '../Stream';
import InfoBlocks from './InfoBlocks';
import './index.scss';

class StoryLine extends Component {
  state = {
    fixedTop: false,
    fixedBottom: false
  }
  scrollTop = 0
  topInfoBlock = 0

  getCoords = () => {
    const { small_subheader } = this.props;
    const { fixedBottom, fixedTop } = this.state;
    const elem = this.infoblocks;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const box = elem.getBoundingClientRect();
    const topInfoBlock = box.top + scrollTop;

    if (small_subheader) {
      if (elem.style.position === 'absolute' && topInfoBlock - scrollTop >= 114) {
        this.setState({
          fixedTop: true
        });
      } else if (elem.style.position === 'absolute' && scrollTop - topInfoBlock >= 57) {
        this.setState({
          fixedBottom: true
        });
      } else if (elem.style.position === 'fixed' && this.scrollTop > scrollTop && fixedBottom) {
        this.setState({
          fixedBottom: false
        });
      } else if (elem.style.position === 'fixed' && this.scrollTop < scrollTop && fixedTop) {
        this.setState({
          fixedTop: false
        });
      }
    } else if (!small_subheader && fixedTop) {
      this.setState({
        fixedTop: false
      });
    }
    
    this.scrollTop = scrollTop;
    this.topInfoBlock = topInfoBlock;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.getCoords, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getCoords);
  }

  render() {
    const {fixedTop, fixedBottom} = this.state;
    const {
      requested_user,
      requested_user_profile,
      following,
      followers,
      people,
      books_tree,
      authorized_user,
      stories,
      createStory,
      loadStories,
      loadNextStories,
      small_subheader,
      single_story,
      getCheckboxOfBook,
      photos
    } = this.props;


    const top = () => { 
      if (!fixedBottom && fixedTop) { 
        return 116;
      } else if (fixedBottom && !fixedTop) { 
        return -59; 
      } else if (!fixedTop && !fixedBottom && this.topInfoBlock && small_subheader) {
        return this.topInfoBlock;
      }
 
      return null; 
    };

    return (
      <div className="storyLine">
        <div
          ref={el => this.infoblocks = el}
          style={{
            top: top(),
            position: !fixedTop && !fixedBottom ? 'absolute' : 'fixed',
            width: 320,
          }}
        >
          <InfoBlocks
            authorized_user={authorized_user}
            requested_user={requested_user}
            requested_user_profile={requested_user_profile}
            following={following}
            followers={followers}
            people={people}
            photos={photos}
          />
        </div>
        <Stream
          authorized_user={authorized_user}
          requested_user={requested_user}
          stories={stories}
          createStory={createStory}
          loadStories={loadStories}
          loadNextStories={loadNextStories}
          single_story={single_story}
          getCheckboxOfBook={getCheckboxOfBook}
        />
        <BooksTreeContainer
          booksTreeTop={small_subheader ? 'wrapper wrapper-fixed' : 'wrapper'}
          requested_user={requested_user}
          books_tree={books_tree}
        />
      </div>
    );
  }
}

StoryLine.propTypes = {
  authorized_user: PropTypes.object,
  requested_user: PropTypes.object,
  requested_user_profile: PropTypes.object,
  createStory: PropTypes.func,                //story
  stories: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  books_tree: PropTypes.array,
  followers: PropTypes.shape({
    users: PropTypes.array
  }),
  following: PropTypes.shape({
    users: PropTypes.array
  }),
  people: PropTypes.array
};

export default StoryLine;
