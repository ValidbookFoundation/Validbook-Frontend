import React from 'react';
import PropTypes from 'prop-types';

import './StatementTabs.scss';

const TAB = {
  PRESENTATION_VIEW: 'presentation_view',
  RAW_JSON_VIEW: 'raw_json_view'
};

const statementTabs = ({ tab, clicked }) => {
  const tabRender = (tab_id, text) => {
    return (
      <div
        id={tab_id}
        className={'tab' + (tab === tab_id ? ' active' : '')}
        onClick={clicked}
      >
        {text}
      </div>
    );
  };
  return (
    <div className="statement_text_tabs">
      {tabRender(TAB.RAW_JSON_VIEW, 'Raw JSON View')}
      {tabRender(TAB.PRESENTATION_VIEW, 'Presentation View')}
    </div>
  );
};

statementTabs.propTypes = {
  tab: PropTypes.string,
  clicked: PropTypes.func,
};

export default statementTabs;
