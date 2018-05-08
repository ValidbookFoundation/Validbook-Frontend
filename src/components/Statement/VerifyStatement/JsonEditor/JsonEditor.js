import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import './JsonEditor.scss';

class JsonEditor extends Component {

  static propTypes = {
    json: PropTypes.object,
    changed: PropTypes.func,
  }

  editor = null;

  createJsonEditor = (json) => {
    const node = this.aceEditor;
    this.editor = ace.edit(node);
    this.editor.setTheme('ace/theme/github');
    this.editor.getSession().setMode('ace/mode/json');
    this.editor.setValue(JSON.stringify(json, null, '\t'), -1);
    this.editor.setShowPrintMargin(false);
    this.editor.getSession().setUseWrapMode(true);
    this.editor.getSession().setTabSize(2);
    this.editor.setOptions({minLines: 25});
    this.editor.setOptions({maxLines: Infinity});
  }

  componentDidMount() {
    this.createJsonEditor(this.props.json);
  } 

  componentWillReceiveProps(nextProps) { 
    this.editor.destroy(); 
    this.createJsonEditor(nextProps.json); 
  } 

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};
    return (
      <div ref={el => this.aceEditor = el} style={style}>
      </div>
    );
  }
  componentWillUnmount() {
    this.props.changed(JSON.parse(this.editor.getSession().getValue()));
    this.editor.destroy();
  }
}

export default JsonEditor;
