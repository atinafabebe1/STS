import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Header from './Header';
import StudentDetails from './StudentDetails';
import NestedTable from './NestedTable';
import SubjectsTable from './SubjectsTable';

const styles = {
  container: {
    padding: '5%',
    // maxWidth: '100%',
    // margin: 'auto'
  },
  dashedLine: {
    border: '2px dashed rgba(120, 120, 120, 0.4)',
    marginTop: '24px',
    marginBottom: '24px'
  }
};

class ComponentToPrint extends React.Component {
  render() {
    return (
      <Paper elevation={5} style={styles.container}>
        <Header />
        <StudentDetails />
        <Divider style={styles.dashedLine} />
        <Grid container spacing={3}>
          <Grid item xs={1.6}>
            <SubjectsTable />
          </Grid>
          <Grid item xs={2.6}>
            <NestedTable />
          </Grid>
          <Grid item xs={2.6}>
            <NestedTable />
          </Grid>
          <Grid item xs={2.6}>
            <NestedTable />
          </Grid>
          <Grid item xs={2.6}>
            <NestedTable />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default ComponentToPrint;
