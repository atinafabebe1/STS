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
import {  useParams } from 'react-router-dom';
import {  Delete } from '@mui/icons-material';
import useFetch from '../../hooks/useFetchHook';
import colorConfigs from '../../configs/colorConfigs';
import { BASE_URL } from '../../api/api';

const ViewStreamSubjects: React.FC = () => {
  const { streamId} = useParams();

  const { data, loading, error } = useFetch({ url: `${BASE_URL}/streams?_id=${streamId}` });


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


  const handleDeleteClick = (streamId: string) => {
    console.log(streamId)
  };
  
  const tableCellStyle = {
    color: colorConfigs.text,
    backgroundColor: colorConfigs.background
  };

  const iconButtonStyle = {
    color: colorConfigs.primary
  };

  return (
    <div style={{ backgroundColor: colorConfigs.mainBg, padding: '16px' }}>
      <Typography variant="h4" gutterBottom style={{ color: colorConfigs.text }}>
        Subjects Under 
        {data[0] && <> {data[0].name} </>} Stream
      </Typography>

      {data[0] && data[0]?.subjects.length > 0 ? (
        <TableContainer component={Paper} style={{ backgroundColor: colorConfigs.paper, marginBottom: '16px' }}>
          <Table size='small'>
            <TableHead>
              <TableRow style={{ backgroundColor: colorConfigs.primary }}>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Subject Name</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data[0].subjects.map((subject: any) => (
                <TableRow key={subject.id} style={tableCellStyle}>
                  <TableCell style={tableCellStyle}>{subject.name}</TableCell>
                  <TableCell>
                    
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
          No school streams available.
        </Typography>
      )}
    </div>
  );
};

export default ViewStreamSubjects;
