import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import merge from 'lodash.merge';
import defaultTheme from './defaultTheme';

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
