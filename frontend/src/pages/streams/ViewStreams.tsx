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
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import useFetch from '../../hooks/useFetchHook';
import colorConfigs from '../../configs/colorConfigs';
import { BASE_URL } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const ViewStreams: React.FC = () => {
  const { data, loading, error } = useFetch({ url: `${BASE_URL}/streams` });
  const navigate = useNavigate()

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

  const handleEditClick = (streamId: string) => {
  };

  const handleDeleteClick = (streamId: string) => {
  };
  const handleViewSubject = (streamId: string) => {
    navigate(`/stream/subjects/${streamId}`)
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
        Streams
      </Typography>

      {data && data.length > 0 ? (
        <TableContainer component={Paper} style={{ backgroundColor: colorConfigs.paper, marginBottom: '16px' }}>
          <Table size='small'>
            <TableHead>
              <TableRow style={{ backgroundColor: colorConfigs.primary }}>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Stream Name</TableCell>
                <TableCell style={{ color: colorConfigs.secondaryText }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((stream: any) => (
                <TableRow key={stream.id} style={tableCellStyle}>
                  <TableCell style={tableCellStyle}>
                    {stream.name}
                    <Link  to={`/stream/subjects/${stream._id}`} style={linkStyle}>
                      View Subjects
                    </Link>
                    <Link to={`/stream/subjects/${stream._id}`} style={linkStyle}>
                      Add Subject
                    </Link>
                  </TableCell>
                  <TableCell>

                    <Tooltip title="Edit Stream" arrow>
                      <IconButton onClick={() => handleEditClick(stream.id)} style={iconButtonStyle}>
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Stream" arrow>
                      <IconButton onClick={() => handleDeleteClick(stream.id)} style={iconButtonStyle}>
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

export default ViewStreams;
