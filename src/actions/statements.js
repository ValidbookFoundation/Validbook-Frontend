import {
  GET_DATA_TEMPLATES,
  GET_DATA_TEMPLATES_SUCCESS,
  GET_DATA_TEMPLATES_FAIL,
  GET_HTML_TEMPLATE_BY_LINK,
  GET_HTML_TEMPLATE_BY_LINK_SUCCESS,
  GET_HTML_TEMPLATE_BY_LINK_FAIL,
} from '../constants/statements';

export const getDataTemplates = () => ({
  types: [GET_DATA_TEMPLATES, GET_DATA_TEMPLATES_SUCCESS, GET_DATA_TEMPLATES_FAIL],
  promise: (client) => client.get('/statements/templates')
});

export const getHtmlTemplateByLink = (link) => ({
  types: [GET_HTML_TEMPLATE_BY_LINK, GET_HTML_TEMPLATE_BY_LINK_SUCCESS, GET_HTML_TEMPLATE_BY_LINK_FAIL],
  promise: (client) => client.post('/statements/html-template', {data: {link}})
});

export const verifyStatement = (json) => ({
  types: [VERIFY_STATEMENT, VERIFY_STATEMENT_SUCCESS, VERIFY_STATEMENT_FAIL],
  promise: (client) => client.post('/statements/verify', {data: {message: json}})
});
