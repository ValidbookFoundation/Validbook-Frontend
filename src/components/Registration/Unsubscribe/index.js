import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import InformationFooter from '../../Information&Profile/Information/InformationFooter';
import './index.scss';

class Unsubscribe extends Component {
  render() {
    return (
      <div>
        <Helmet title="Unsubscribe"/>
        <div className="unsubscribe">
          <h3 className="registration-xs-title">Would you like to unsubscribe from this email notification?</h3>
          <hr/>
          <h4 style={{'margin-bottom': '10px'}}>You will no longer receive this type of email:</h4>
          <ul>
            <li style={{'margin-left': '30px', 'font-size': '16px'}}>When someone commented on my story</li>
          </ul>
          <hr/>

          <div>
            <Link to="/settings/notifications">Manage Notification Settings</Link>
            <div style={{float: 'right', 'margin-top': '-5px'}}>
              <button className="btn-brand btn-cancel">Cancel</button>
              <button className="btn-brand" style={{'margin-left': '10px'}}>Confirm</button>
            </div>
          </div>


          <InformationFooter/>
        </div>
      </div>
      );
  }
}



export default Unsubscribe;
