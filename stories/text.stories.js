/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputText from '../src/TextField';
import MaterialThemeProvider from '../src/theme/ThemeProvider';

const ControlledTextInput = () => {
  const [inputValue, handleChange] = useState('this is a state');
  const onChange = (e) => {
    handleChange(e.target.value);
    action('on-input-change')(e.target, e.target.value);
  };
  return (
    <InputText
      floatingLabelText="By event"
      helperText="see actions tab"
      value={inputValue}
      onChange={onChange} />
  );
};

const ControlledTextInputValue = () => {
  const [inputValue, handleChange] = useState('this is a state');
  const onChange = (value) => {
    handleChange(value);
    action('on-input-change-value')(value);
  };
  return (
    <InputText
      floatingLabelText="By value"
      helperText="see actions tab"
      value={inputValue}
      onChangeValue={onChange} />
  );
};

class InnerTextInputRef extends React.PureComponent {
  state = { value: '' }
  onChange = () => {
    action('ref-dom-element')(this.ref.value, this.ref.tagName, this.ref);
    this.setState({ value: this.ref.value });
  }
  setRef = (el) => {
    this.ref = el;
  }
  render() {
    return (
      <InputText
        helperTextPersistent
        value={this.state.value}
        helperText="See actions on change"
        onChange={this.onChange}
        innerInputRef={this.setRef} />
    );
  }
}

class TextInputRef extends React.PureComponent {
  state = { value: '' }
  onChange = (e) => {
    action('ref-dom-element')(this.ref);
    this.setState({ value: e.target.value });
  }
  setRef = (component) => {
    this.ref = component;
  }
  render() {
    return (
      <InputText
        helperTextPersistent
        value={this.state.value}
        helperText="See actions on change"
        onChange={this.onChange}
        ref={this.setRef} />
    );
  }
}

storiesOf('TextF Field', module)
  .addDecorator(story => (
    <MaterialThemeProvider theme={{ primary: '#03A9F4' }}>
      <div style={{ padding: '3rem' }}>{story()}</div>
    </MaterialThemeProvider>
  ))
  .add('hint autofocus', () => (
    <InputText hintText="autofocus" autoFocus />
  ))
  .add('floating label', () => (
    <InputText
      floatingLabelText="floating label" />
  ))
  .add('floating label with defaults', () => (
    <InputText
      floatingLabelText="floating label"
      defaultValue="Default Value" />
  ))
  .add('floating label with value', () => (
    <InputText
      hintText="with hint text"
      value="not a default value"
      floatingLabelText="floating label" />
  ))
  .add('helper text', () => (
    <InputText
      autoFocus
      helperText="helper text" />
  ))
  .add('persistent helper text', () => (
    <InputText
      helperText="persistent helper text"
      helperTextPersistent />
  ))
  .add('disabled', () => (
    <InputText
      disabled
      hintText="disabled" />
  ))
  .add('controlled input', () => <ControlledTextInput />)
  .add('controlled input value', () => <ControlledTextInputValue />)
  .add('focus disabled', () => (
    <InputText
      focusDisabled
      hintText="Focus disabled" />
  ))
  .add('full width', () => (
    <InputText
      fullWidth
      hintText="Full Width" />
  ))
  .add('controlled error', () => (
    <InputText
      error
      value="a value"
      floatingLabelText="Controlled error"
      errorText="This error was passed in" />
  ))
  .add('validation error', () => {
    const validateLength = str => str.length > 7;
    return (
      <InputText
        css={{ width: 300 }}
        hintText="type something..."
        helperText="helper text and validation"
        validator={validateLength}
        errorText="This should be at least 8 chars" />
    );
  })
  .add('required', () => (
    <InputText
      required
      floatingLabelText="A required field" />
  ))
  .add('with prefix', () => (
    <InputText
      prefix="&#xa3;" />
  ))
  .add('with suffix', () => (
    <InputText
      suffix="&#x20ac;" />
  ))
  .add('with prefix & suffix', () => (
    <InputText
      prefix="&#xa3;"
      suffix="&#x20ac;" />
  ))
  .add('floating component', () => (
    <InputText
      floatingLabelText={
        <div>
          I &#x2764; GitHub
          <img
            style={{ height: '18px' }}
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ei-sc-github.svg/768px-Ei-sc-github.svg.png" />
        </div>
      } />
  ))
  .add('inner ref', () => (
    <InnerTextInputRef />
  ))
  .add('ref', () => (
    <TextInputRef />
  ))
  .add('text area', () => (
    <InputText
      textarea
      floatingLabelText="Text area with 1 row" />
  ))
  .add('text area rows', () => (
    <InputText
      textarea
      css={{ width: '300px' }}
      floatingLabelText="Text area with two rows"
      rows={2} />
  ))
  .add('text area auto', () => (
    <InputText
      textarea
      multiline
      floatingLabelText="Multiline text area" />
  ));
