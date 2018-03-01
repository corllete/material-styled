import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from './Row';
import Datum from './Datum';
import Title from './Title';
import Header from './Header';

/*
 * The user of the table is responsible for passing in a unique key for each
 * object in props.data
 *
 *
 * TODO:
 * - footer
 * - row hover
 * - row selection
 * - enable column sorting
 * - column name hover
 * - long header titles
 * - inline text editing
 * - inline menus
 * - alternate headers
 */
const TableComponent = props => (
  <div className={`smc-table-wrapper ${props.className}`}>
    {props.header && <Header>{props.header}</Header>}
    <table className="smc-table-table">
      <thead className="smc-table-head">
        <Row header>
          {props.fields.map(({ label, numerical, key }, i) => (
            <Title
              key={label}
              column={key}
              numerical={numerical}
              first={i === 0}
              last={i === props.fields.length - 1}>
              {label}
            </Title>
          ))}
        </Row>
      </thead>
      <tbody>
        {props.data.map(datum => (
          <Row key={`row_${datum.key}`}>
            {props.fields.map(({ key, numerical }, i) => (
              <Datum
                key={`{${datum.key}_${key}}`}
                column={key}
                numerical={numerical}
                first={i === 0}
                last={i === props.fields.length - 1}>
                {datum[key]}
              </Datum>
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  </div>
);

TableComponent.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    numerical: PropTypes.bool,
    key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TableComponent.defaultProps = {
  header: '',

};

const Table = styled(TableComponent)`
  ${props => (props.fullWidth ? 'width: 100%' : '')};

  > .smc-table-table {
    ${props => (props.fullWidth ? 'width: 100%' : '')};
    border-collapse:collapse;
    border-spacing: 40px;
  }
`;

Table.propTypes = {
  ...TableComponent.propTypes,
  fullWidth: PropTypes.bool,
};

Table.defaultProps = {
  ...TableComponent.defaultProps,
  fullWidth: false,
};

export default Table;
