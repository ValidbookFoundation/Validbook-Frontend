import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './index.scss';

export default class PinStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      order: {},
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.Counter = this.Counter.bind(this);
    this.pinStory = this.pinStory.bind(this);
    this.props.books.map((book) => {
      this.state.order[book.id] = 0;
    });
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  Counter(type, id) {
    switch (type) {
      case 'inc':
        const newOrderInc = this.state.order;
        newOrderInc[id]++;
        this.setState({ order: newOrderInc });
        break;

      case 'dec':
        const newOrderDec = this.state.order;
        if (newOrderDec[id] > 0) {
          newOrderDec[id]--;
        }
        this.setState({ order: newOrderDec });
        break;

      default:
        console.log('error');
    }
    console.log(this.state.order);
  }

  pinStory() {
    const result = [];
    for (const key in this.state.order) {
      result.push({ book_id: key, order: this.state.order[key] });
    }
    this.props.pinStory(result, this.props.id)
      .then(() => this.Close());
  }

  render() {
    const { books } = this.props;
    return (
      <div className="delete-story-popup" onClick={this.Open}>
        <Modal show={this.state.showModal} onHide={this.Close}>
          <Modal.Header closeButton>
            <Modal.Title>Pin Story</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            { books.map((book) => (
              <div key={book.id} className="pin-body">
                <div style={{paddingBottom: '13px'}}>{book.name}</div>
                <div className="pin-counter">
                  <input type="text" value={this.state.order[book.id]} id={book.id}/>
                  <button className="minus" onClick={() => this.Counter('dec', book.id)}>-</button>
                  <button className="plus" onClick={() => this.Counter('inc', book.id)}>+</button>
                </div>
              </div>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button
                className="btn-brand" style={{marginLeft: '10px'}} type="submit"
                onClick={() => this.pinStory()}
              >Pin Story</button>
            </div>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

PinStory.propTypes = {
  books: PropTypes.array,
  pinStory: PropTypes.func,
  id: PropTypes.number,
};
