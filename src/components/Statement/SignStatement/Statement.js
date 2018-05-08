import React from 'react';

import PresentationView from './PresentationView/PresentationView';
import JsonEditor from './JsonEditor/JsonEditor';
import StatementTabs from '../StatementTabs/StatementTabs';

import './Statement.scss';

const STATEMENT_TAB = {
  PRESENTATION_VIEW: 'presentation_view',
  RAW_JSON_VIEW: 'raw_json_view'
};

const statement = ({ selected_tab, json, data_template_id, creator, certificateChanged, jsonChanged, statementViewTabChanged }) => {
  let content = null;

  switch (selected_tab) {
    case STATEMENT_TAB.PRESENTATION_VIEW: {
      if (json.presentationTemplate) {
        content = (
          <PresentationView
            json={json}
            creator={creator}
            changed={certificateChanged}
          />
        );
      }
      break;
    }

    case STATEMENT_TAB.RAW_JSON_VIEW: {
      content = (
        <JsonEditor
          data_template_id={data_template_id}
          json={json}
          changed={jsonChanged}
        />
      );
      break;
    }

    default:
      content = null;
  }

  return (
    <div className="statement_text">
      <StatementTabs 
        tab={selected_tab}
        clicked={statementViewTabChanged}
      />
      {content}
    </div>
  );
};

export default statement;
