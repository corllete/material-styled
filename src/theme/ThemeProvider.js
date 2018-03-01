import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, injectGlobal } from 'styled-components';
import merge from 'lodash.merge';
import defaultTheme from './defaultTheme';

/* eslint-disable no-unused-expressions */
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    font-family: Roboto,sans-serif;
  }
`;
/* eslint-enable */

const MaterialThemeProvider = ({ children, theme }) => (
  <ThemeProvider theme={merge({}, defaultTheme, theme)}>
    {children}
  </ThemeProvider>
);

MaterialThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node.isRequired,
};

MaterialThemeProvider.defaultProps = {
  theme: {},
};

export default MaterialThemeProvider;
