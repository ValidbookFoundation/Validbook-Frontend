import {
  GET_DATA_TEMPLATES,
  GET_DATA_TEMPLATES_SUCCESS,
  GET_DATA_TEMPLATES_FAIL,
  GET_HTML_TEMPLATE_BY_LINK,
  GET_HTML_TEMPLATE_BY_LINK_SUCCESS,
  GET_HTML_TEMPLATE_BY_LINK_FAIL,
} from '../constants/statements';

const initial_state = {
  data_templates: [],
};

const statementsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case GET_DATA_TEMPLATES_SUCCESS: {
      return {
        ...state,
        data_templates: [...state.data_templates, ...action.result.data]
      };
    }
    default:
      return state;
  }
};

export default statementsReducer;
