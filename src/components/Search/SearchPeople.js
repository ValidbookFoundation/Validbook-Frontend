import React, { Component } from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../Loader';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { searchUser, getNextUsers } from '../../actions/search';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(searchUser(getState())));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  query: state.search.query,
  foundUsers: state.search.foundUsers,
  pagination: state.search.pagination,
  over: state.search.over
}), {
  searchUser,
  getNextUsers
})

class SearchPeople extends Component {
  constructor() {
    super();

    this.load = this.load.bind(this);
  }

  load() {
    const {pagination, getNextUsers, over, query} = this.props;

    if (!over) {
      getNextUsers(query, pagination);
    }
  }
  render() {
    const { foundUsers, over, loaded } = this.props;
    console.log(foundUsers)
    const loader = <Loader marginTop="10px"/>;

    return (
      <div className="people page-bg">
        <div className="people-lists">
          {true 
            ? <InfiniteScroll
              loadMore={this.load}
              hasMore={true}
              threshold={200}
              loader={over ? null : loader}
            >
              <div className="wrapper" style={{marginTop: '25px'}}>

                {foundUsers && foundUsers.map((people) => (
                  <div key={people.id} className="people-card">
                    <Link to={`/${people.slug}`}>
                      <img src={people.avatar} />
                      <div>{`${people.first_name} ${people.last_name}`}</div>
                    </Link>

                    <div
                      className="btn-following"
                    >
                      <div>
                        Following
                      </div>
                      <span/>
                    </div>

                  </div>
                ))}

              </div>
            </InfiniteScroll>
            : <Loader marginTop="52px"/>
          }
        </div>
      </div>
    );
  }
}

export default SearchPeople;
