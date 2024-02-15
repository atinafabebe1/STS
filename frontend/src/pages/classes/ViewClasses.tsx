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
import { Edit, Delete } from '@mui/icons-material';
import useFetch from '../../hooks/useFetchHook';
import colorConfigs from '../../configs/colorConfigs';
import { BASE_URL } from '../../api/api';
const ViewClasses: React.FC = () => {
  const { data, loading, error } = useFetch({ url: `${BASE_URL}/classes` });

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
    console.log(classId);
  };

  const handleDeleteClick = (classId: string) => {
    console.log(classId);
  };

  const tableCellStyle = {
    color: colorConfigs.text,
    backgroundColor: colorConfigs.background,
  };

  const iconButtonStyle = {
    color: colorConfigs.primary,
  };

  return (
    <div style={{ backgroundColor: colorConfigs.mainBg, padding: '16px' }}>
      <Typography variant="h4" gutterBottom style={{ color: colorConfigs.text }}>
        Classes
      </Typography>

      {data && data.length > 0 ? (
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
              {data.map((schoolClass: any) => (
                <TableRow key={schoolClass.id} style={tableCellStyle}>
                  <TableCell style={tableCellStyle}>{schoolClass.gradeLevel}</TableCell>
                  <TableCell style={tableCellStyle}>{schoolClass.sections.join(', ')}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Class" arrow>
                      <IconButton onClick={() => handleEditClick(schoolClass.id)} style={iconButtonStyle}>
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Class" arrow>
                      <IconButton onClick={() => handleDeleteClick(schoolClass.id)} style={iconButtonStyle}>
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
          No school classes available.
        </Typography>
      )}
    </div>
  );
};

export default ViewClasses;