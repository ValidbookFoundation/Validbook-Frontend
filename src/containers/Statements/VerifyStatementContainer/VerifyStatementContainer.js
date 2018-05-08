import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Dropzone from 'react-dropzone';

import {
  getHtmlTemplateByLink
} from '../../../actions/statements';

import SignModal from '../../../components/AccountCardPage/SignAccountCardModal';
import StatementTabs from '../../../components/Statements/StatementTabs/StatementTabs';
import PresentationView from '../../../components/Statements/VerifyStatement/PresentationView/PresentationView';
import JsonEditor from '../../../components/Statements/VerifyStatement/JsonEditor/JsonEditor';

import './VerifyStatementContainer.scss';

const TAB = {
  PRESENTATION_VIEW: 'presentation_view',
  RAW_JSON_VIEW: 'raw_json_view'
};

@connect(null, {
  getHtmlTemplateByLink
})

class VerifyStatement extends Component {
  state = {
    files: [],
    json: {},
    dropzone_active: false,
    verify_modal: false,
    selected_tab: TAB.PRESENTATION_VIEW
  }

  componentDidMount() {
    const header_container = document.querySelector('.header_container');
    header_container.style.boxShadow = 'none';
  }
  

  dragEnterHandler = () => {
    const dropzone = document.querySelector('.dropzone');
    dropzone.style.zIndex = 50;
    this.setState({
      dropzone_active: true
    });
  }

  dragLeaveHandler = () => {
    const dropzone = document.querySelector('.dropzone');
    dropzone.style.zIndex = 1;
    this.setState({
      dropzone_active: false
    });
  }

  dropHandler = (files) => {
    const dropzone = document.querySelector('.dropzone');
    dropzone.style.zIndex = 1;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          json: JSON.parse(reader.result),
          files,
          dropzone_active: false
        });
      };
      reader.readAsText(files[0]);
    } else {
      this.setState({
        dropzone_active: false
      });
    }
  }

  statementViewTabChangeHandler = (e) => {
    // const { json, presentation_template_link } = this.state;
    const tab_id = e.target.id;
      
    // if (e.target.id === STATEMENT_TAB.PRESENTATION_VIEW && 
    //   json.originOfPresentationTemplate && 
    //   json.originOfPresentationTemplate !== presentation_template_link) {
    //   this.props.getHtmlTemplateByLink(json.originOfPresentationTemplate)
    //     .then(response => {
    //       this.setState({
    //         selected_tab: tab_id,
    //         presentation_template_link: json.originOfPresentationTemplate,
    //         json: Object.assign({}, json, {
    //           presentationTemplate: response.data
    //         })
    //       });
    //     });
    // } else {
      this.setState({
        selected_tab: tab_id
      });
    // }
  }

  closeModalHandler = () => {
    this.setState({
      verify_modal: false
    });
  }

  verifyStatementHandler = () => {
    axios.post('http://api-futurama1x.validbook.org/v1/statements/verify', {
      message: JSON.stringify(this.state.json)
    })
      .then(response => {
        console.log(response);
      });
  }

  jsonChangeHandler = (json) => {
    this.setState({ json });
  }

  verifyModalRender = () => {
    const { verify_modal } = this.state;

    if (!verify_modal) {
      return null;
    }

    return (
      <SignModal
        showModal={verify_modal}
        closeModalHandler={this.closeSingModalHandler}
        saveModalHandler={this.verifyStatementHandler}
      />
    );
  }

  viewPageRender = () => {
    const { selected_tab, json, dropzone_active } = this.state;
    let content = null;

    switch (selected_tab) {
      case TAB.PRESENTATION_VIEW: {
        content = (
          <PresentationView
            droped={this.dropHandler}
            json={json}
          />
        );
        break;
      }
      case TAB.RAW_JSON_VIEW: {
        content = (
          <JsonEditor
            json={json}
            changed={this.jsonChangeHandler}
          />
        );
        break;
      }
      default:
        content = null;
    }

    return content;
  }

  verifyButtonRender = () => {
    if (this.state.json.id) {
      return (
        <footer className="verify_statement_footer">
          <button
            className="btn-brand"
            onClick={this.verifyStatementHandler}
          >
            Verify
          </button>
        </footer>
      );
    }
  }

  render() {
    const { files, json, selected_tab } = this.state;
    
    return (
      <div className="verify_statement_container">
        <Dropzone
          disableClick
          className="dropzone"
          accept="application/json"
          multiple={false}
          onDrop={this.dropHandler}
          onDragEnter={this.dragEnterHandler}
          onDragLeave={this.dragLeaveHandler}
        >
          {this.activeDropzoneRender()}
          <StatementTabs 
            tab={selected_tab}
            clicked={this.statementViewTabChangeHandler}
          />
          <div className="verify_presentation_view">
            {this.viewPageRender()}
          </div>
        </Dropzone>
        {this.verifyButtonRender()}
      </div>
    );
  }
}

export default VerifyStatement;
