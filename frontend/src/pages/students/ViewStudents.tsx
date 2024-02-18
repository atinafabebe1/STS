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
  TableBody
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetchHook';
import colorConfigs from '../../configs/colorConfigs';
import { BASE_URL } from '../../api/api';
import { useUserContext } from '../../context/userContext';

const ViewStudents: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useUserContext();

  const { data, loading, error } = useFetch({ url: `${BASE_URL}/students` });

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

  const handleEditClick = (studentId: string) => {
    // Handle edit click logic
    console.log(studentId);
  };
  const handleAddGradeClicked = (studentId: string) => {
    navigate(`/grades/add/${studentId}`)
  };

  const handleDeleteClick = (studentId: string) => {
    // Handle delete click logic
    console.log(studentId);
  };

  const tableCellStyle = {
    color: colorConfigs.text,
    backgroundColor: colorConfigs.background
  };

  const linkStyle = {
    marginLeft: '8px',
    color: colorConfigs.primary,
    textDecoration: 'none', // Remove underline
    transition: 'color 0.3s ease' // Add smooth color transition on hover
  };

  const iconButtonStyle = {
    color: colorConfigs.primary
  };

  return (
    <div style={{ backgroundColor: colorConfigs.mainBg, padding: '16px' }}>
      <Typography variant="h4" gutterBottom style={{ color: colorConfigs.text }}>
        Students
      </Typography>

      {data && data.length > 0 ? (
        <TableContainer component={Paper} style={{ backgroundColor: colorConfigs.paper, marginBottom: '16px' }}>
          <Table size="small">
            <TableHead>
              <TableRow style={{ backgroundColor: colorConfigs.primary }}>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Student Name</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Age</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Stream</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Section</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>ID</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Gender</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Transcript</TableCell>
                {user?.role === 'Secretary' && <TableCell style={{ color: colorConfigs.secondaryText }}>Grade</TableCell>}
                <TableCell style={{ color: colorConfigs.secondaryText }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((student: any) => (
                <TableRow key={student.id} style={{ ...tableCellStyle }}>
                  <TableCell style={tableCellStyle}>{student.fullName}</TableCell>
                  <TableCell style={tableCellStyle}>{student.age}</TableCell>
                  <TableCell style={tableCellStyle}>{student.stream.name}</TableCell>
                  <TableCell style={tableCellStyle}>{student.section}</TableCell>
                  <TableCell style={tableCellStyle}>{student.idNumber}</TableCell>
                  <TableCell style={tableCellStyle}>{student.gender}</TableCell>
                  <TableCell style={tableCellStyle} sx={{ ...linkStyle }}>
                    <Link to={`/transcript/view/${student._id}`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'dodgerblue' }}>
                      See Transcript
                    </Link>
                  </TableCell>
                  {user?.role === 'Secretary' && (
                    <TableCell style={tableCellStyle} sx={{ ...linkStyle }}>
                      <Tooltip title="Add Grade" arrow>
                        <IconButton size="small" onClick={() => handleAddGradeClicked(student._id)} style={iconButtonStyle}>
                          <Add />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}

                  <TableCell>
                    <Tooltip title="Edit Student" arrow>
                      <IconButton size="small" onClick={() => handleEditClick(student._id)} style={iconButtonStyle}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Student" arrow>
                      <IconButton size="small" onClick={() => handleDeleteClick(student._id)} style={iconButtonStyle}>
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
          No students available.
        </Typography>
      )}
    </div>
  );
};

export default ViewStudents;
