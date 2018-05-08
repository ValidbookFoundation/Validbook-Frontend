import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { getUser } from '../../actions/user';
import { showPopUp } from '../../actions/form';
import { getCheckboxOfBook } from '../../actions/book';
import { getStoryById } from '../../actions/story';
import {
  createBook,
  getBookTree,
  show as showBookStories,
  next as nextBookStories,
  upload as uploadBookCover,
  uploadBookCoverBase64,
  getBooks
} from '../../actions/book';
import {
  parseUserSlug,
  parseBookSlug,
  parseStoryIdFromBookPage
} from '../../utils/url_parsing';

import BooksTreeContainer from '../../containers/BooksTreeContainer';
import BookStream from '../Stream/BookStream';
import NavigationBookPage from '../Navigation/NavigationBookPage';
import EditBook from '../EditBookModal';
import ChangeBookCoverImage from '../Popup/ChangeBookCoverImage';
import BookCard from '../BookCard';
import './index.scss';

const coverColors = [
  '#e53936',
  '#eb3f79',
  '#a900f1',
  '#7d56c2',
  '#5b6ab1',
  '#1d87e3',
  '#029ae5',
  '#00abcf',
  '#00887b',
  '#378d3c',
  '#679e38',
  '#f8a724',
  '#ff6f41',
  '#8c6d63',
  '#778f9c',
  '#414141'
];

@connect((state) => ({
  authorized_user: state.user.authorized_user,
  requested_user: state.user.requested_user,
  books_tree: state.book.books_tree,
  book: state.book.book,
  path: state.routing.locationBeforeTransitions.pathname,
  activePopUp: state.forms.activePopUp,
  visible: state.forms.visible,
  currentImage: state.forms.currentImage,
  sub_books: state.book.sub_books,
  loaded: state.book.loaded,
  single_story: state.story.single_story
}), {
  getUser,
  getBookTree,
  nextBookStories,
  showBookStories,
  showPopUp,
  uploadBookCoverBase64,
  uploadBookCover,
  getBooks,
  getStoryById,
  getCheckboxOfBook
})

export default class BookPage extends Component {
  state = {
    show_small_subheader: false,
    file: '',
    dropdownUserCover: false,
    currentUserCoverColor: '',
    showSubbooks: false,
    show_book_settings: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const {
      path,
      requested_user,
      getStoryById,
      getCheckboxOfBook
    } = this.props;
    const user_slug = parseUserSlug(path);
    const book_slug = parseBookSlug(path);
    const story_id = parseStoryIdFromBookPage(path);

    if (book_slug) {
      getCheckboxOfBook([book_slug]);
    }

    if (path.indexOf('/subbooks') !== -1) {
      this.setState({showSubbooks: true});
    } else {
      this.setState({showSubbooks: false});
    }
    
    if (story_id) {
      getStoryById(story_id);
    }

    this.requests(user_slug, book_slug);
  }  

  componentDidUpdate(prevProps) {
    const {
      path,
      requested_user,
      book,
      getCheckboxOfBook
    } = this.props;

    if (prevProps.path !== path) {
      const user_slug = parseUserSlug(path);
      const book_slug = parseBookSlug(path);
      
      if (book_slug) {
        getCheckboxOfBook([book_slug]);
      }

      if (~path.indexOf('/subbooks')) {
        this.setState({showSubbooks: true});
      } else {
        this.setState({showSubbooks: false});
      }

      if (book_slug && (book_slug !== book.slug)) {
        this.requests(user_slug, book_slug);
      }
    }
  }

  requests = (user_slug, book_slug) => {
    const {
      getUser,
      getBookTree,
      showBookStories,
      getBooks
    } = this.props;

    return Promise.all([
      getUser(user_slug),
      getBookTree(user_slug),
      showBookStories(book_slug),
      getBooks(user_slug, book_slug)
    ]);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const header = document.querySelector('.header_container');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const {show_small_subheader} = this.state;

    if (scrollTop <= 236 && show_small_subheader) {
      header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.15)';

      this.setState({show_small_subheader: false});
    } else if (scrollTop > 236 && !show_small_subheader) {
      header.style.boxShadow = 'none';

      this.setState({show_small_subheader: true});
    }
  }

  handleCoverChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({file});
      const image = {
        name: file.name,
        url: reader.result
      };
      this.props.showPopUp(true, image, 'ChangeBookCoverImage');
      this.cleanInputCover();
    };
    reader.readAsDataURL(file);
  }

  cleanInputCover = () => {
    this.inputBookCover.value = '';
  }

  setCoverColor = (color) => {
    this.setState({currentUserCoverColor: color});
    this.props.uploadBookCover(null, color.substring(1), this.props.book.id);
  }

  zeroTop = () => {
    window.scrollTo(0, 0);
  }

  onBlur = (e) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({
          dropdownUserCover: false
        });
      }
    }, 0);
  }

  showDropdown = () => {
    this.setState({
      dropdownUserCover: !this.state.dropdownUserCover
    });
  }

  showSubBooks = () => {
    browserHistory.push(`/${this.props.requested_user.slug}/books/${this.props.book.slug}/subbooks`);
  }

  openBookSettings = () => {
    this.setState({
      show_book_settings: true
    });
  }

  closeBookSettings = () => {
    this.setState({
      show_book_settings: false
    });
  }

  editBookRender = () => {
    const { show_book_settings } = this.state;
    const {name, description, settings, slug} = this.props.book;

    if (!show_book_settings) {
      return null;
    }

    return (
      <EditBook
        show_modal={show_book_settings}
        closeModalHandler={this.closeBookSettings}
        book_name={name}
        book_description={description}
        bookSettings={settings}
        book_slug={slug}
      />
    );
  }

  render() {
    const { show_small_subheader } = this.state;
    const scroll = () => {
      let Nav = 'navigation navigation-fixed';
      let booksTreeTop = 'wrapper wrapper-fixed';
      let displayUser = 'navigation-infouser';
      const infoblock = 'infobloks-book';
      let wrapperInfoBlock;

      if (!show_small_subheader) {
        Nav = 'navigation navigation-bookpage';
        booksTreeTop = 'wrapper';
        displayUser = 'navigation-infouser navigation-infouser-book';
        // infoblock = 'infobloks-book';
      } else {
        Nav = 'navigation navigation-fixed navigation-bookpage-fixed';
        booksTreeTop = 'wrapper wrapper-bookpage-fixed';
        displayUser = 'navigation-infouser navigation-infouser-book-fixed';
        wrapperInfoBlock = 'wrapper-infoblock';
        // infoblock = 'infobloks-book infobloks-book-fixed';
      }
      const result = {booksTree: booksTreeTop, show: displayUser, posTop: Nav, infoblock, wrapperInfoBlock};
      return result;
    };
    const chooseScroll = scroll();
    const {
      authorized_user,
      requested_user,
      book,
      sub_books,
      loaded,
      single_story,
      books_tree
    } = this.props;
    const {
      name,
      description,
      cover,
      counts,
      stories
    } = book;
    const book_slug = book.slug;
    const {slug, first_name, last_name, avatar32} = requested_user;
    const {showSubbooks} = this.state;

    const helmet_title = name && first_name && last_name
      ? `${name} - ${first_name} ${last_name}`
      : 'Book';
    const books = single_story
      ? stories.filter(story => story.id !== single_story.id)
      : stories;

    return (
      <div>
        <Helmet title={helmet_title}/>
        <div className="bookPage-1170">

          {book_slug &&
          <div
            className={chooseScroll.infoblock}
            style={{minHeight: '280px', maxHeight: '281px', width: '320px', marginBottom: 0}}>
            
            <div
              className="book_settings_icon_container"
              onClick={this.openBookSettings}
            >
              <i className="book_settings_edit_icon" />
            </div>

            <div className="title">
              <Link to={`/${slug}/books/${this.props.book.slug}`}>{name}</Link>
            </div>

            {description !== '' &&
              <div className="book-description">
                {/*<div>Description bla blabla bla bla bla blablabla bla!</div>*/}
                <div>{description}</div>
              </div>
            }

            <div className="book-counter">
              <ul>
                <li style={{paddingLeft: 0}}><i className="infobook-icon-visibility"/> · <span>{counts.followers}</span><i
                  className="followers-icon-sm"/></li>
                <li>·<span>{counts.stories}</span><i className="stories-icon-sm"/></li>
                <li>·<span>{counts.images}</span><i className="photos-icon-sm"/></li>
                <li
                  className={counts && counts.sub_books > 0 ? 'book-counter-subbooks book-counter-with-subbooks' : 'book-counter-subbooks'}
                  onClick={() => this.showSubBooks()}
                >
                  ·<span>{counts.sub_books}</span><i className="subbooks-icon-sm"/>
                </li>
              </ul>
              <div className="btn-following btn-following-book">
                <div>Following Book</div>
                <span/>
              </div>
              <footer>
                <hr style={{margin: '15px -15px 10px -20px'}}/>

                <Link to={`/${slug}`} className="user">
                  <img src={avatar32} alt={`${first_name} ${last_name}`}/>
                  <span>{`${first_name} ${last_name}`}</span>
                </Link>
              </footer>
            </div>

            {this.props.activePopUp === 'ChangeBookCoverImage' &&
              <ChangeBookCoverImage
                showPopUp={this.props.showPopUp}
                visible={this.props.visible}
                currentImage={this.props.currentImage}
                uploadUserCover={this.props.uploadBookCover}
                uploadBookCoverBase64={this.props.uploadBookCoverBase64}
                book={book}
              />
            }
          </div>
          }

          <div
            className="subheader-bookpage"
            style={{
              backgroundColor: cover && cover.color ? `#${cover.color}` : '#fff',
              backgroundImage: cover && cover.picture_original ? `url(${cover.picture_original})` : null
            }}
          >
            <div className="subHeader-cover">
              {authorized_user.id && authorized_user.id === requested_user.id &&
              <div tabIndex={0} onBlur={this.onBlur}>
                <i/>
                <div
                  className="cover-btn" onClick={() => this.showDropdown()}
                  style={{opacity: this.state.dropdownUserCover ? 1 : null}}
                >
                  <div style={{color: '#fff'}}><i/>Update Cover Photo</div>
                </div>
                <div className="cover-dropdown" style={{display: this.state.dropdownUserCover ? 'block' : 'none'}}>
                  <div className="triangle"/>
                  <ul>
                    <li style={{marginTop: '5px'}}>
                      <div className="wrapper-upload-cover">
                        <h5>Upload a photo</h5>
                        <input
                          type="file"
                          onChange={this.handleCoverChange}
                          ref={el => this.inputBookCover = el}/>
                      </div>
                    </li>
                    <hr/>
                    <li style={{fontSize: '12px'}}>or set a color
                      <div className="wrapper-colors">
                        {coverColors.map((color, index) => (
                          <div
                            key={index}
                            style={{backgroundColor: color}}
                            className={this.state.currentUserCoverColor === color ? 'active' : null}
                            onClick={() => this.setCoverColor(color)}
                          />
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              }
            </div>
          </div>
        </div>

        <div className={chooseScroll.posTop}>
          <NavigationBookPage
            userName={`${first_name} ${last_name}`}
            avatar32={avatar32}
            link={`/${slug}`}
            displayUser={chooseScroll.show}
          />

          <div className="navigation-wrap book-nav">
            <Link onClick={() => this.zeroTop()}>
              {name}
            </Link>
          </div>

          <div
            className="btn-following btn-following-book"
            // onClick={
            //   !isFollowing ?
            //     () => {
            //       this.follow(id);
            //     }
            //     :
            //     () => {
            //       this.unfollow(id);
            //     }
            // }
          >
            <div>
              Following Book
            </div>
            <span/>
          </div>
        </div>

        <div className="book-page">
          <div className="storyLine">
            <div className="infobloks">
              <div className={chooseScroll.wrapperInfoBlock}>

                <div className="infobloks-book infobloks-book-others" style={{paddingBottom: 0}}>
                  <div className="title-infoblocks">
                    <span className="peoples-icon"/>
                    <a> Book Followers <span>· 0</span></a>
                  </div>
                  <div className="photos-gallery books-followers-gallery">
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=20"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=42"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=48"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=60"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=7"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=180"/></a>
                    </div>
                  </div>
                </div>

                <div className="infobloks-book infobloks-book-others" style={{paddingBottom: 0}}>
                  <div className="title-infoblocks">
                    <span className="photos-icon"/>
                    <a>Book Photos <span>· 0</span></a>
                  </div>
                  <div className="photos-gallery books-photos-gallery">
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=20"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=42"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=48"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=60"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=7"/></a>
                    </div>
                    <div className="photos-image">
                      <a href="#"><img src="//unsplash.it/800/600?image=180"/></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showSubbooks
              ? <div className="bookpage-subbooks-card">
                {sub_books[0] && sub_books[0].children.map(book => (
                  <BookCard
                    key={book.key}
                    book={book}
                    history={history}
                    requested_user={this.props.requested_user}
                    getBooks={this.props.getBooks}
                  />
                ))}
              </div>
              : <div 
                  style={{
                    display: 'flex',
                    marginLeft: 'auto'
                  }}
                >
                <BookStream
                  authorized_user={authorized_user}
                  requested_user={requested_user}
                  book_slug={book_slug}
                  bookStories={books}
                  nextBookStories={this.props.nextBookStories}
                  showBookStories={this.props.showBookStories}
                  single_story={single_story}
                  getCheckboxOfBook={this.props.getCheckboxOfBook}
                />
                <BooksTreeContainer
                  books_tree={books_tree}
                  booksTreeTop={chooseScroll.booksTree}
                  title="ALL BOOKS"
                />
              </div>
            }
          </div>
        </div>
        {this.editBookRender()}
      </div>
    );
  }
}

BookPage.propTypes = {
  authorized_user: PropTypes.object,
  requested_user: PropTypes.object,
  books_tree: PropTypes.array,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
  uploadBookCover: PropTypes.func,
  uploadBookCoverBase64: PropTypes.func,
  book: PropTypes.object,
  showPopUp: PropTypes.func,
  showBookStories: PropTypes.func,
  nextBookStories: PropTypes.func,
};
