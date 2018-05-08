import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap';

class LoundnessDropdown extends Component {
  render() {
    return (
      <DropdownButton
        className="bootstrap-pure-btn sbox-dropdown-btn" bsStyle="default"
        title={<i className={`dropdown-btn-icon ${this.state.loudIcon}`}/>} id={6}
        style={{display: this.state.sboxVisibleElements}}
      >
        <div className="sbox-logging">
          <ul>
            <li style={{borderBottom: '1px solid #eee'}}>
              <div>
                <input
                  type="radio" name="quiet_log" id="quiet_log"
                  checked={this.state.loud.quiet_log}
                  onChange={this.handleCheckLoud}/>
                <label htmlFor={'quiet_log'}><span/></label>
                <div>
                  <i className="quiet_log_icon"/>
                  <p>Quiet logging</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <input
                  type="checkbox" name="loud_log" id="loud_log"
                  checked={this.state.loud.loud_log}
                  onChange={this.handleCheckLoud}/>
                <label htmlFor={'loud_log'}><span/></label>
                <div>
                  <i className="loud_log_icon"/>
                  <p>Loud logging</p>
                </div>
              </div>
            </li>
            <li style={{borderBottom: '1px solid #eee'}}>
              <div>
                <input
                  type="checkbox" name="loud_book" id="loud_book"
                  checked={this.state.loud.loud_book}
                  onChange={this.handleCheckLoud}/>
                <label htmlFor={'loud_book'}><span/></label>
                <div>
                  <i className="loud_book_icon"/>
                  <p>Loud in book</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <input
                  type="checkbox" name="post_fb" id="post_fb"
                  checked={this.state.loud.post_fb}
                  onChange={this.handleCheckLoud}/>
                <label htmlFor={'post_fb'}><span/></label>
                <div>
                  <i className="post_fb_icon"/>
                  <p>Post to Facebook</p>
                </div>
              </div>
            </li>
            <li style={{borderBottom: '1px solid #eee'}}>
              <div>
                <input
                  type="checkbox" name="post_twitter" id="post_twitter"
                  checked={this.state.loud.post_twitter}
                  onChange={this.handleCheckLoud}/>
                <label htmlFor={'post_twitter'}><span/></label>
                <div>
                  <i className="post_twitter_icon"/>
                  <p>Post to Twitter</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <input
                  type="checkbox" name="storyline" id="storyline"
                  checked={this.state.loud.storyline}
                  onChange={this.handleCheckLoud}/>
                <label htmlFor={'storyline'}><span/></label>
                <div>
                  <p>Story will appear on Storyline</p>
                </div>
              </div>
            </li>
            {/*<button onClick={() => console.log('state 8:', this.state.loud_type)}>click for test</button>*/}
          </ul>
        </div>
      </DropdownButton>
    );
  }
}

export default LoundnessDropdown;
