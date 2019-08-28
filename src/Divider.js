import styled from 'styled-components';

const toProp = (inset) => {
  let realInset = inset;
  if (typeof realInset === 'number') realInset = `${inset}px`;
  if (!realInset) return '0px';
  return typeof realInset === 'string' ? realInset : '16px';
};

const Divider = styled.hr.attrs((props) => {
  const { inset } = props;
  return {
    'data-smc': 'Divider',
    ml: toProp(inset),
  };
})`
  border: none;
  background-color: rgba(0, 0, 0, .12);
  height: 1px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: ${props => props.ml};
`;

export default Divider;
