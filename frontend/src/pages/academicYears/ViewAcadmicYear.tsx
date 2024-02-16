/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  CircularProgress,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import useFetch from '../../hooks/useFetchHook';
import colorConfigs from '../../configs/colorConfigs';
import { BASE_URL } from '../../api/api';

const ViewAcademicYears: React.FC = () => {
  const { data, loading, error } = useFetch({ url: `${BASE_URL}/academicYears` });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="body1" style={{ color: colorConfigs.error }}>
        Error: {error}
      </Typography>
    );
  }

  const handleEditClick = (academicYearId: string) => {
    console.log(academicYearId);
  };

  const handleDeleteClick = (academicYearId: string) => {
    console.log(academicYearId);
  };

  const tableCellStyle = {
    color: colorConfigs.text,
    backgroundColor: colorConfigs.background,
  };

  const linkStyle = {
    marginLeft: '8px',
    color: colorConfigs.primary,
  };

  const iconButtonStyle = {
    color: colorConfigs.primary,
  };

  return (
    <div style={{ backgroundColor: colorConfigs.mainBg, padding: '16px' }}>
      <Typography variant="h4" gutterBottom style={{ color: colorConfigs.text }}>
        Academic Years
      </Typography>

      {data && data.length > 0 ? (
        <TableContainer component={Paper} style={{ backgroundColor: colorConfigs.paper, marginBottom: '16px' }}>
          <Table size='small'>
            <TableHead>
              <TableRow style={{ backgroundColor: colorConfigs.primary }}>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Year</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Total Classes</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((academicYear: any) => (
                <TableRow key={academicYear.id} style={tableCellStyle}>
                  <TableCell style={tableCellStyle}>
                    {academicYear.year}
                    <Link to={`/academicYear/classes/${academicYear._id}`} style={linkStyle}>
                      View Class Rooms
                    </Link>
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {academicYear.classes.length}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit Academic Year" arrow>
                      <IconButton size='small' onClick={() => handleEditClick(academicYear.id)} style={iconButtonStyle}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Academic Year" arrow>
                      <IconButton size='small' onClick={() => handleDeleteClick(academicYear.id)} style={iconButtonStyle}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" style={{ color: colorConfigs.text }}>
          No academic years available.
        </Typography>
      )}
    </div>
  );
};

export default ViewAcademicYears;
