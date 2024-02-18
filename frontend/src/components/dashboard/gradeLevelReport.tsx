import React from 'react';
import { Box, Paper } from '@mui/material';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

interface GradeLevelChartProps {
  gradeData: { grade: string; totalStudents: number }[];
}

const GradeLevelChart: React.FC<GradeLevelChartProps> = ({ gradeData }) => {
  return (
    <Box>
    
      <Paper elevation={3} sx={{ padding: '15px', borderRadius: '10px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gradeData}>
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalStudents" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default GradeLevelChart;
