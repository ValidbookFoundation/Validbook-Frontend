import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone';
import Web3 from 'web3';
import v4 from 'uuid/v4';

import {
  getDataTemplates,
  getHtmlTemplateByLink
} from '../../actions/statements';

// import Statement from '../../components/Statements/SignStatement/Statement';
// import StatementTabs from '../../components/Statement/StatementTabs/StatementTabs';
import Operations from '../../components/Statement/Operations/Operations';
import Statement from '../../components/Statement/Statement';
import SignModal from '../../components/AccountCardPage/SignAccountCardModal';

import './Statements.scss';

const web3 = new Web3(Web3.givenProvider);

const STATEMENT_TAB = {
  PRESENTATION_VIEW: 'presentation_view',
  RAW_JSON_VIEW: 'raw_json_view'
};

@connect((state) => ({
  authorized_user: state.user.authorized_user,
  data_templates: state.statements.data_templates,
}), {
  getDataTemplates,
  getHtmlTemplateByLink
})


class Statements extends Component {
  static propTypes = {
    authorized_user: PropTypes.object,
    data_templates: PropTypes.array,
    getDataTemplates: PropTypes.func,
    getHtmlTemplateByLink: PropTypes.func,
  }

  state = {
    selected_tab: STATEMENT_TAB.PRESENTATION_VIEW,
    data_template_id: null,
    presentation_template_link: null,
    json: {},
    sign_statement: false,
    signed_file: null,
  }

  componentDidMount() {
    const header_container = document.querySelector('.header_container');
    header_container.style.boxShadow = 'none';

    this.props.getDataTemplates();
  }
  
  // componentDidUpdate() {
  //   const { data_templates, getHtmlTemplateByLink } = this.props;
    
  //   if (data_templates.length > 0 && !this.state.data_template_id) {
  //     const link = data_templates[0].templates[0].link;
  //     const json = JSON.parse(data_templates[0].json);
  //     getHtmlTemplateByLink(link)
  //       .then(response => {
  //         this.setState({
  //           // data_template_id: data_templates[0].id,
  //           // json: Object.assign(json, {
  //           //   presentationTemplate: response.data,
  //           //   id: v4()
  //           // }),
  //           // presentation_template_link: link
  //         });
  //       });
  //   }
  // }

  jsonChangeHandler = (json) => {
    this.setState({ json });
  }

  statementViewTabChangeHandler = (e) => {
    const { json, presentation_template_link } = this.state;
    const tab_id = e.target.id;
      
    if (e.target.id === STATEMENT_TAB.PRESENTATION_VIEW && 
      json.originOfPresentationTemplate && 
      json.originOfPresentationTemplate !== presentation_template_link) {
      this.props.getHtmlTemplateByLink(json.originOfPresentationTemplate)
        .then(response => {
          this.setState({
            selected_tab: tab_id,
            presentation_template_link: json.originOfPresentationTemplate,
            json: Object.assign({}, json, {
              presentationTemplate: response.data
            })
          });
        });
    } else {
      this.setState({
        selected_tab: tab_id
      });
    }
  }

  certificateChangeHandler = (e) => {
    if (e.target.id === 'file') {
      const reader = new FileReader();

      reader.readAsText(e.target.files[0]);
      reader.onloadend = () => {
        this.setState({
          json: Object.assign({}, this.state.json, {
            claim: Object.assign({}, this.state.json.claim, {
              fileHash: web3.utils.sha3(reader.result),
              fileName: e.target.files[0].name
            })
          })
        });
      };
    } else {
      this.setState({
        json: Object.assign({}, this.state.json, {
          claim: Object.assign({}, this.state.json.claim, {
            [e.target.id]: e.target.value
          })
        })
      });
    }
  }

  dataTemplateChangeHandler = (id) => {
    const { data_templates, getHtmlTemplateByLink } = this.props;
    const selected_data_template = data_templates.filter(template => template.id === id);
    let new_json = {};
    if (selected_data_template.length && selected_data_template[0].json) {
      new_json = JSON.parse(selected_data_template[0].json);
    }

    if (new_json.originOfPresentationTemplate) {
      getHtmlTemplateByLink(new_json.originOfPresentationTemplate)
        .then(response => {
          new_json.presentationTemplate = response.data;
          this.setState({
            data_template_id: id,
            json: Object.assign(new_json, {
              id: v4()
            }),
            presentation_template_link: new_json.originOfPresentationTemplate
          });
        });
    } else {
      this.setState({
        data_template_id: id,
        json: Object.assign(new_json, {
          id: v4()
        })
      });
    }
  }

  signStatementHandler = (keystore, password) => {
    const { authorized_user } = this.props;
    const { json } = this.state;

    const decrypt = web3.eth.accounts.decrypt(
      JSON.parse(keystore.toLowerCase()),
      password
    );

    const json_for_sign = Object.assign({}, json, {
      claim: Object.assign({}, json.claim, {
        recipient: `did:vb:${json.claim.recipient}`
      }),
    });

    const result = web3.eth.accounts.sign(
      JSON.stringify(json_for_sign),
      decrypt.privateKey
    );

    const proof = {
      type: 'EcdsaKoblitzSignature2016',
      created: new Date().toISOString(),
      creator: `did:vb:jimbo.fry${authorized_user.identity.name}`,
      nonce: v4(),
      signatureValue: result.signature
    };

    const signed_json = Object.assign(json_for_sign, {
      proof
    });
    
    this.setState({
      json: signed_json
    });
    this.downloadSignedStatement(signed_json);
    this.closeSingModalHandler();
  }

  presentationTemplateChangeHandler = (link) => {
    this.props.getHtmlTemplateByLink(link)
      .then(response => {
        this.setState({
          presentation_template_link: link,
          json: Object.assign({}, this.state.json, {
            originOfPresentationTemplate: link,
            presentationTemplate: response.data
          })
        });
      });
  }

  closeSingModalHandler = () => {
    this.setState({
      sign_statement: false
    });
  }

  openModalHandler = () => {
    this.setState({
      sign_statement: true
    });
  }

  downloadSignedStatement = (json) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json)));
    element.setAttribute('download', 'statement.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  signModalRender = () => {
    const { sign_statement } = this.state;

    if (!sign_statement) {
      return null;
    }

    return (
      <SignModal
        showModal={sign_statement}
        closeModalHandler={this.closeSingModalHandler}
        saveModalHandler={this.signStatementHandler}
      />
    );
  }  

  onDragEnter = () => {
    const dropzone = document.querySelector('.dropzone');
    dropzone.style.zIndex = 50;
    this.setState({
      dropzone_active: true
    });
  }

  onDragLeave = () => {
    const dropzone = document.querySelector('.dropzone');
    dropzone.style.zIndex = 1;
    this.setState({
      dropzone_active: false
    });
  }

  onDrop = (files) => {
    const dropzone = document.querySelector('.dropzone');
    dropzone.style.zIndex = 1;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const received_json = JSON.parse(reader.result);
        if (received_json.presentationTemplate) {
          this.setState({
            json: received_json,
            files,
            dropzone_active: false
          });
        } else {
          this.setState({
            json: received_json,
            selected_tab: STATEMENT_TAB.RAW_JSON_VIEW,
            files,
            dropzone_active: false
          });
        }
      };
      reader.readAsText(files[0]);
    } else {
      this.setState({
        dropzone_active: false
      });
    }
  }

  activeDropzoneRender = () => {
    if (!this.state.dropzone_active) {
      return null;
    }

    return (
      <div className="active_dropzone">
        <svg xmlns="http://www.w3.org/2000/svg" height="150" width="150" version="1.1" viewBox="0 0 150 150">
          <path d="m150 85.714h-64.286v64.286h-21.428v-64.286h-64.286v-21.428h64.286v-64.286h21.429v64.286h64.285z" strokeWidth="10.714" fill="#fff"/>
        </svg>
      </div>
    );
  }

  render() {
    const { data_templates, authorized_user } = this.props;
    const { data_template_id, selected_tab, presentation_template_link, json } = this.state;
    const selected_data_template = data_templates.filter(template => template.id === data_template_id);
    const data_template_items = data_templates.map(template => ({
      value: template.id,
      label: template.title
    }));
    
    let presentation_templates_items = [];
    if (selected_data_template.length > 0) {
      const presentation_selected_data_templates = selected_data_template[0].templates;
      presentation_templates_items = presentation_selected_data_templates.map(template => ({
        value: template.link,
        label: template.title
      }));
    }

    let creator = '';
    if (authorized_user.identity && authorized_user.identity.name) {
      creator = authorized_user.identity.name;
    }
    return (
      <div className="statements_page">
        <Helmet 
          title="Statements - Validbook"
        />
        <Operations
          data_template_id={data_template_id}
          presentation_tepmlate_id={presentation_template_link}
          data_templates={data_template_items}
          presentation_templates={presentation_templates_items}
          dataTemplateChanged={this.dataTemplateChangeHandler}
          presentationTemplateChanged={this.presentationTemplateChangeHandler}
          buttonClicked={this.openModalHandler}
        />
        <Dropzone
          disableClick
          className="dropzone"
          multiple={false}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          {this.activeDropzoneRender()}
          <Statement
            selected_tab={selected_tab}
            json={json}
            data_template_id={data_template_id}
            creator={creator}
            certificateChanged={this.certificateChangeHandler}
            jsonChanged={this.jsonChangeHandler}
            statementViewTabChanged={this.statementViewTabChangeHandler}
            fileSelected={this.onDrop}
          />
        </Dropzone>
      </div>
    );
  }
}

export default Statements;
