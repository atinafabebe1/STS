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
  Button,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import useFetch from '../../hooks/useFetchHook';
import colorConfigs from '../../configs/colorConfigs';
import { BASE_URL } from '../../api/api';

const ViewAcademicYearClasses: React.FC = () => {
  const { academicYearId } = useParams();

  const { data, loading, error } = useFetch({ url: `${BASE_URL}/academicYears?_id=${academicYearId}` });

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

  const handleEditClick = (classId: string) => {
    console.log(`Edit Class: ${classId}`);
  };

  const handleDeleteClick = (classId: string) => {
    console.log(`Delete Class: ${classId}`);
  };

  const tableCellStyle = {
    color: colorConfigs.text,
    backgroundColor: colorConfigs.background,
  };

  const iconButtonStyle = {
    color: colorConfigs.primary,
  };

  const buttonStyle = {
    color: colorConfigs.text,
    backgroundColor: colorConfigs.primary,
  };

  return (
    <div style={{ backgroundColor: colorConfigs.mainBg, padding: '16px' }}>
      <Typography variant="h4" gutterBottom style={{ color: colorConfigs.text }}>
        Class Rooms Under
        {data[0] && (
          <>
            {' '}
            <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{data[0].year}</span>{' '}
          </>
        )}
        Academic Year
      </Typography>

      {data[0] && data[0]?.classes.length > 0 ? (
        <TableContainer component={Paper} style={{ backgroundColor: colorConfigs.paper, marginBottom: '16px' }}>
          <Table size="small">
            <TableHead>
              <TableRow style={{ backgroundColor: colorConfigs.primary }}>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Grade Level</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Sections</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data[0].classes.map((classInfo: any) => (
                <TableRow key={classInfo.id} style={tableCellStyle}>
                  <TableCell style={tableCellStyle}>{classInfo.gradeLevel}</TableCell>
                  <TableCell style={tableCellStyle}>
                    {classInfo.sections.join(', ')}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit Class" arrow>
                      <IconButton size='small' onClick={() => handleEditClick(classInfo.id)} style={iconButtonStyle}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Class" arrow>
                      <IconButton size='small' onClick={() => handleDeleteClick(classInfo.id)} style={iconButtonStyle}>
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
          No classes available for the selected academic year.
        </Typography>
      )}
     
    </div>
  );
};

export default ViewAcademicYearClasses;
