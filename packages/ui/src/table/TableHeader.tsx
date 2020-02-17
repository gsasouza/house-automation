import { TableProps } from './types';

import * as React from 'react';
import styled from 'styled-components';

const Header = styled.thead`
  display: flex;
`;

const TableRow = styled.tr`
  display: flex;
  flex: 1;
`;

const HeaderCell = styled.th`
  text-align: start;
  padding: 1rem 3rem;
  opacity: 0.7;
  border-top: 1px solid #0000002e;
  border-bottom: 1px solid #0000002e;
  text-transform: uppercase;
  font-size: 12px;
  flex: 1;
`;

type Props = Pick<TableProps, 'columns'>;

const TableHeader = ({ columns = [] }: Props) => {
  const getHeaderLabel = column => column.header.label;
  return (
    <Header>
      <TableRow>
        {columns.map(column => (
          <HeaderCell key={column.property}>{getHeaderLabel(column)}</HeaderCell>
        ))}
      </TableRow>
    </Header>
  );
};

export default TableHeader;
