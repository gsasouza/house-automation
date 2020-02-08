import * as React from 'react';
import styled, { css } from 'styled-components';

const Body = styled.tbody`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Row = styled.tr`
  display: flex;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  &:hover {
    ${props =>
      props.onClick &&
      css`
        box-shadow: 0 7px 20px 3px rgba(0, 0, 0, 0.12);
        cursor: pointer;
      `};
  }
`;

const Cell = styled.td`
  padding: 1.5rem 3rem;
  font-size: 18px;
  flex: 1;
`;

const TableRow = ({ node, columns, onRowClick }) => {
  return (
    <Row onClick={onRowClick ? () => onRowClick(node) : undefined}>
      {columns.map(column => (
        <Cell key={`${column.property}:${node.id}`}>{node[column.property]}</Cell>
      ))}
    </Row>
  );
};

const TableBody = ({ data, columns, onRowClick }) => {
  const { edges } = data;
  return (
    <Body>
      {edges.map(({ node, cursor }) => (
        <TableRow key={cursor} node={node} columns={columns} onRowClick={onRowClick} />
      ))}
    </Body>
  );
};

export default TableBody;
