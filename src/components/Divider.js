import styled from 'styled-components';

const Divider = styled.hr.attrs({
  'data-smc': 'Divider',
  ml: ({ inset }) => {
    let realInset = inset;
    if (typeof realInset === 'number') realInset = `${inset}px`;
    if (!realInset) return '0px';
    return typeof realInset === 'string' ? realInset : '16px';
  },
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
