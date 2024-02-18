import React from 'react';
import {  Grid, Paper } from '@mui/material';
import StudentChart from '../../components/dashboard/academicYears';
import GradeLevelChart from '../../components/dashboard/gradeLevelReport';
import RecentActivities from '../../components/dashboard/recentActivities';

const Dashboard = () => {
  const recentActivities = [
    { id: 1, timestamp: '2022-02-18 10:30 AM', activity: 'Submitted grade report' },
    { id: 2, timestamp: '2022-02-18 11:45 AM', activity: 'Updated grade' }
  ];

  const totalStudents = 1510;

  const gradeData = [
    { grade: '9th', totalStudents: 100 },
    { grade: '10th', totalStudents: 120 },
    { grade: '11th', totalStudents: 90 },
    { grade: '12th', totalStudents: 80 }
  ];

  return (
    <Grid container justifyContent="center" spacing={4} style={{ padding: '20px' }}>
      <Grid item xs={12}>
       
      </Grid>
      <Grid container item spacing={4}>
        <Grid item xs={12} sm={6}>
          <GradeLevelChart gradeData={gradeData} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StudentChart totalStudents={totalStudents} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <RecentActivities activities={recentActivities} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
