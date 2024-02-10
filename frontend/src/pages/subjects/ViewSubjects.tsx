/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  CircularProgress,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Link,
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

const ViewSubjects: React.FC = () => {
  const { data, loading, error } = useFetch({ url: `${BASE_URL}/subjects` });
    
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

  const handleEditClick = (subjectId: string) => {
  };

  const handleDeleteClick = (subjectId: string) => {
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
        Subjects
      </Typography>

      {data && data.length > 0 ? (
        <TableContainer component={Paper} style={{ backgroundColor: colorConfigs.paper, marginBottom: '16px' }}>
          <Table size='small'>
            <TableHead>
              <TableRow style={{ backgroundColor: colorConfigs.primary }}>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Name</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((subject: any) => (
                <TableRow key={subject.id} style={tableCellStyle}>
                  <TableCell style={tableCellStyle}>
                    {subject.name}
                  </TableCell>
                  <TableCell>

                    <Tooltip title="Edit Subject" arrow>
                      <IconButton onClick={() => handleEditClick(subject.id)} style={iconButtonStyle}>
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Subject" arrow>
                      <IconButton onClick={() => handleDeleteClick(subject.id)} style={iconButtonStyle}>
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
          No school subjects available.
        </Typography>
      )}
    </div>
  );
};

export default ViewSubjects;
