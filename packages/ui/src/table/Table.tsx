import TableHeader from './TableHeader';
import { TableProps } from './types';

import * as React from 'react';
import styled from 'styled-components';

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Table = ({ columns }: TableProps) => {
  return (
    <TableContainer>
      <TableHeader columns={columns} />
    </TableContainer>
  );
};

export default Table;
