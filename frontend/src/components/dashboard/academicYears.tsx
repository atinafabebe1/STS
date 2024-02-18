import React from 'react';
import { Box, Paper, Avatar } from '@mui/material';

interface StudentChartProps {
  totalStudents: number;
}

const StudentChart: React.FC<StudentChartProps> = ({ totalStudents }) => {
  return (
    <Box>
     
      <Paper elevation={3} sx={{ padding: '15px', borderRadius: '10px' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            backgroundColor: '#2196f3',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          {totalStudents}
        </Avatar>
      </Paper>
    </Box>
  );
};

export default StudentChart;
