import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const styles = {
  tableContainer: {
    marginBottom: '16px',
    // width:"140px"
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
    height:"110px"
  },
  tableCell: {
    fontSize: '0.8rem',
  },
};

const SubjectsTable = () => {
  return (
    <TableContainer component={Paper} style={styles.tableContainer}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell style={styles.tableHeaderCell} rowSpan={4}>Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={styles.tableCell}>Mathematics</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={styles.tableCell}>Mathematics</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={styles.tableCell}>Mathematics</TableCell>
          </TableRow>
          {/* You can add more rows as needed */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectsTable;
