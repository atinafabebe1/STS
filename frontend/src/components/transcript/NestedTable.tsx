// AcademicYearsTable.jsx
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
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
  tableCell: {
    fontSize: '0.8rem',
  },
};

const AcademicYearsTable = () => {
  return (
    <TableContainer component={Paper} style={styles.tableContainer}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell style={styles.tableHeaderCell} colSpan={3}>
              Academic Year
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={styles.tableHeaderCell} colSpan={2}>
              Semester
            </TableCell>
            <TableCell style={styles.tableHeaderCell}>Average</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={styles.tableHeaderCell}>I</TableCell>
            <TableCell style={styles.tableHeaderCell}>II</TableCell>
            <TableCell style={styles.tableHeaderCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={styles.tableCell}>95</TableCell>
            <TableCell style={styles.tableCell}>89</TableCell>
            <TableCell style={styles.tableCell}>92</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={styles.tableCell}>95</TableCell>
            <TableCell style={styles.tableCell}>89</TableCell>
            <TableCell style={styles.tableCell}>92</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={styles.tableCell}>95</TableCell>
            <TableCell style={styles.tableCell}>89</TableCell>
            <TableCell style={styles.tableCell}>92</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AcademicYearsTable;
