import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { TableProps } from './types';

import * as React from 'react';
import styled from 'styled-components';

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: flex;
  flex-direction: column;
`;

function Table<T>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <TableContainer>
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} onRowClick={onRowClick} />
    </TableContainer>
  );
}

export default Table;
