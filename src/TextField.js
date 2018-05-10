/* eslint-disable no-confusing-arrow1 */
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// string or result of css`props => result` call
const styleType = PropTypes.oneOfType([PropTypes.string, PropTypes.array]);

const textOrNodeType = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);

class TextFieldComponent extends PureComponent {
  static propTypes = {
    /* Generic */
    defaultValue: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    textarea: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
    autoComplete: PropTypes.string,

    /* textarea = true only */
    rows: PropTypes.number,
    autoFocus: PropTypes.bool,
    multiline: PropTypes.bool,

    /* Generic style */
    inputStyle: styleType,

    /* Floating text related */
    floatingLabelText: textOrNodeType,
    floatingLabelStyle: styleType,
    floatingLabelErrorStyle: styleType,

    /* Hint related */
    hintText: textOrNodeType,
    hintTextStyle: styleType,

    /* Helper text related */
    helperText: textOrNodeType,
    helperTextStyle: styleType,
    helperTextPersistent: PropTypes.bool,

    /* Focus */
    focusDisabled: PropTypes.bool,
    underlineFocusStyle: styleType,

    /* Prefix/suffix */
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /* Callbacks */
    onChange: PropTypes.func,
    onChangeValue: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    validator: PropTypes.func,

    /* Error related */
    error: PropTypes.bool,
    errorText: textOrNodeType,
    errorTextStyle: styleType,

    /* System */
    className: PropTypes.string.isRequired,
  }

  static defaultProps = {
    defaultValue: '',
    required: false,
    type: 'text',
    disabled: false,
    readOnly: false,
    autoComplete: 'on',
    textarea: false,
    rows: 1,
    autoFocus: false,
    multiline: false,
    name: 'text',
    value: '',
    inputStyle: '',
    floatingLabelText: '',
    floatingLabelStyle: '',
    floatingLabelErrorStyle: '',
    hintText: '',
    hintTextStyle: '',
    helperText: '',
    helperTextStyle: '',
    helperTextPersistent: false,
    focusDisabled: false,
    underlineFocusStyle: '',
    suffix: null,
    prefix: null,
    onChange: null,
    onChangeValue: null,
    onFocus: null,
    onBlur: null,
    onClick: null,
    onKeyDown: null,
    validator: null,
    error: false,
    errorText: null,
    errorTextStyle: '',
  }

  state = {
    text: this.props.defaultValue,
    focus: false,
    error: this.props.error,
    // hasBeenFocused: false,
    height: '100%',
  };

  onChange = (e) => {
    const text = e.target.value;
    if (this.props.onChange) this.props.onChange(e);
    if (this.props.onChangeValue) this.props.onChangeValue(text, this.props.name);
    const isInvalid = this.props.validator && !this.props.validator(text);
    const isEmptyButRequired = this.props.required ? !text : false;
    const newHeight = this.props.textarea ? this.textArea.scrollHeight : '';

    this.setState({
      text,
      error: this.props.error || isInvalid || isEmptyButRequired,
      errorValidate: isInvalid || isEmptyButRequired,
      height: !this.props.multiline || (this.textArea || {}).value === '' ? '100%' : newHeight,
    });
  };

  onFocus = (e) => {
    if (this.props.onFocus) this.props.onFocus(e);
    this.setState({ focus: true /* hasBeenFocused: true */ });
  };

  onBlur = (e) => {
    if (this.props.onBlur) this.props.onBlur(e);
    this.setState({ focus: false });
  };

  onClick = (e) => {
    if (this.props.onClick) this.props.onClick(e);
    this.setState({ focus: true });
  };

  onKeyDown = (e) => {
    if (!this.props.disabled && this.props.onKeyDown) this.props.onKeyDown(e);
  };

  setRef = (ref) => { this.textArea = ref; }

  textArea = null;

  render() {
    const hasError = Boolean(
      this.state.error
      || this.props.error
      || (this.props.errorText && !this.props.validator)
      || (this.state.errorValidate && this.props.validator)
    );
    return (
      <div className={`${this.props.className} smc-text-field-container`}>
        {this.props.suffix && <Suffix>{this.props.suffix}</Suffix>}
        {this.props.prefix && <Prefix>{this.props.prefix}</Prefix>}
        <FloatingLabel
          className="smc-text-field-floating-label"
          error={hasError}
          hasPrefix={!!this.props.prefix}
          focus={this.state.focus}
          floatingLabelStyle={
            hasError ? this.props.floatingLabelErrorStyle : this.props.floatingLabelStyle
          }
          floating={
            this.state.focus
            || this.props.hintText
            || this.props.value
            || this.state.text.length}>
          {!this.props.required &&
            <React.Fragment>
              {this.props.floatingLabelText}
            </React.Fragment>
          }
          {this.props.required &&
            <React.Fragment>
              <Required>*</Required>
              {' '}
              {this.props.floatingLabelText}
            </React.Fragment>
          }
          {/* <RequiredStar
            hasBeenFocused={this.state.hasBeenFocused}
            show={this.props.required}
            requiredStarStyle={this.props.requiredStarStyle} /> */}
        </FloatingLabel>
        <HintText
          className="smc-text-field-hint-text"
          hintTextStyle={this.props.hintTextStyle}
          hasPrefix={this.props.prefix}
          error={hasError}
          show={!this.props.defaultValue && !this.state.text.length && !this.props.value}>
          {this.props.hintText}
        </HintText>
        {this.props.helperText && !hasError && (
          <HelperText
            className="smc-text-field-helper-text"
            helperTextStyle={this.props.helperTextStyle}
            show={!this.state.error && (this.props.helperTextPersistent ? true : this.state.focus)}>
            <React.Fragment>
              {this.props.helperText}
            </React.Fragment>
          </HelperText>
        )}
        <ErrorText
          show={hasError}
          className="smc-text-field-error-text"
          errorTextStyle={this.props.errorTextStyle}>
          <React.Fragment>
            {this.props.errorText}
          </React.Fragment>
        </ErrorText>
        <UnderlineFocus
          disabled={this.props.focusDisabled}
          className="smc-text-field-underline-focus"
          underlineFocusStyle={this.props.underlineFocusStyle}
          focus={this.state.focus}
          error={hasError} />
        {this.props.textarea
          ? (
            <Area
              rows={this.props.rows}
              hasPrefix={!!this.props.prefix}
              hasSuffix={!!this.props.suffix}
              inputStyle={this.props.inputStyle}
              disabled={this.props.disabled}
              readOnly={this.props.readOnly}
              autoFocus={this.props.autoFocus}
              value={this.props.value || this.state.text}
              height={this.state.height}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onClick={this.onClick}
              className="smc-text-field-area"
              name={this.props.name}
              innerRef={this.setRef} />
          )
          : (
            <Input
              autoComplete={this.props.autoComplete}
              type={this.props.type}
              hasPrefix={!!this.props.prefix}
              hasSuffix={!!this.props.suffix}
              inputStyle={this.props.inputStyle}
              disabled={this.props.disabled}
              readOnly={this.props.readOnly}
              autoFocus={this.props.autoFocus}
              value={this.props.value || this.state.text}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onClick={this.onClick}
              onKeyDown={this.onKeyDown}
              name={this.props.name}
              className="smc-text-field-input" />
          )
        }
      </div>
    );
  }
}

const Required = styled.span`
  color: ${props => props.theme.colors.required};
`;

const primaryTextColor = css`
  ${props => props.theme.textColors.primary};
`;
const secondaryTextColor = css`
  ${props => props.theme.textColors.secondary};
`;
const hintTextColor = css`
  ${props => props.theme.textColors.hint};
`;
const primary = css`
  ${props => props.theme.primary};
`;
const error = css`
  ${props => props.theme.textColors.error || '#d50000'};
`;

const fadeInOut = css`
  transition: opacity 200ms;
  opacity: ${props => +props.show};
`;

const placeBelow = css`
  position: absolute;
  bottom: -2em;
  font-size: 0.75em;
  width: 100%;
`;

/*
This is the code for the red asterisk for required fields
Leaving this in in case there is further deliberation on this subject.
const RequiredStar = styled.span`
  ::after{
    color: ${props => props.hasBeenFocused ? error : hintTextColor};
    content: '*';
    show: ${props => props.show ? 'inline-block' : 'none'}
  }
  ${props => props.requiredStarStyle};
`;
*/

const SuffixComponent = props => (
  <div className={`${props.className} smc-textfield-suffix`}>{props.children}</div>
);

SuffixComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Suffix = styled(SuffixComponent)`
  position: absolute;
  bottom: 0;
  right: 0;
  color: ${hintTextColor};
`;

const PrefixComponent = props => (
  <div className={`${props.className} smc-textfield-prefix`}>{props.children}</div>
);

PrefixComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Prefix = styled(PrefixComponent)`
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${hintTextColor};
`;

const FloatingLabel = styled.div`
  position: absolute;
  transition: all 200ms;
  top: ${props => (props.floating ? '-1.5em' : '0em')};
  font-size: 1em;
  transform: ${props => `scale(${props.floating ? 0.75 : 1})`};
  transform-origin: 0 50%;
  color: ${(props) => {
    if (props.error) return error;
    return props.focus && props.floating ? primary : secondaryTextColor;
  }};
  width: 100%;
  left: ${props => (props.hasPrefix ? '1em' : '0em')};
  ${props => props.floatingLabelStyle};
`;

const HintText = styled.div`
  position: absolute;
  color: ${props => (props.error ? error : hintTextColor)};
  opacity: ${props => +props.show};
  width: 100%;
  left: ${props => (props.hasPrefix ? '1em' : '0em')};
  ${props => props.hintTextStyle};
`;

const ErrorText = styled.div`
  color: ${error};
  ${fadeInOut};
  ${placeBelow};
  ${props => props.errorTextStyle};
`;

const HelperText = styled.div`
  color: ${secondaryTextColor};
  ${fadeInOut};
  ${placeBelow};
  ${props => props.helperTextStyle};
`;

const UnderlineFocus = styled.div`
  position: absolute;
  bottom: 0px;
  border-top: 1.5px solid;
  border-top-color: ${props => (props.error ? error : primary)};
  width: 0%;
  transition: width 200ms;
  ${props => props.focus && !props.disabled && 'width: 100%'};
  ${props => props.underlineFocusStyle};
`;

/*
 * Styles that will be shared between textfield and text area
 */
const inputStyles = `
  position: relative;
  border: none;
  outline: none;
  cursor: inherit;
  background-color: inherit;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
`;

/*
 * Since these styles depend on props, they can't live in the template literal
 * above
 */
const Input = styled.input`${inputStyles}`.extend`
  width: calc(100% - ${({ hasSuffix }) => (hasSuffix ? 1 : 0)}em);
  color: ${primaryTextColor};
  padding-left: ${props => (props.hasPrefix ? '1em' : '0')};
  ${props => props.inputStyle};
`;

const Area = styled.textarea`${inputStyles}`.extend`
  width: calc(100% - ${({ hasSuffix }) => (hasSuffix ? 1 : 0)}em);
  height:  ${props => props.height - 4}px;
  color: ${primaryTextColor};
  padding-left: ${props => (props.hasPrefix ? '1em' : '0')};
  ${props => props.inputStyle};
  resize: none;
`;

const TextField = styled(TextFieldComponent)`
  width: ${props => (props.fullWidth ? '100%' : '167px')};
  font-size: 1em;
  line-height: 1.5em;
  position: relative;
  background-color: transparent;
  font-family: lato, sans-serif;
  border-bottom: 0.5px ${props => (props.disabled ? 'dotted' : 'solid')};
  border-bottom-color: ${props => (props.error ? error : hintTextColor)};
`;

export default TextField;
