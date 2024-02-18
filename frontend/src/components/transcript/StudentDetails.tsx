import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const styles = {
  detailsContainer: {
    marginBottom: '24px',
  },
  detailItem: {
    display:"flex",
    marginBottom: '16px',
    marginTop: '16px',
    justifyContent:"flex-start"
  },
  detailValue: {
    marginTop: '4px',
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: '8px',
  },
};

class StudentDetails extends React.Component {
  render() {
    return (
    <div style={styles.detailsContainer}>
      <Grid container spacing={3}>
        <Grid item xs={4} style={styles.detailItem}>
          <Typography variant="h6" style={styles.detailLabel}>
            Student Name:
          </Typography>
          <Typography variant="body1" style={styles.detailValue} >Chala Girma Sileshi</Typography>
        </Grid>
        <Grid item xs={4} style={styles.detailItem}>
          <Typography variant="h6" style={styles.detailLabel}>
            Age:
          </Typography>
          <Typography variant="body1" style={styles.detailValue}>20</Typography>
        </Grid>
        <Grid item xs={4} style={styles.detailItem}>
          <Typography variant="h6" style={styles.detailLabel}>
            Stream:
          </Typography>
          <Typography variant="body1" style={styles.detailValue}>General</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs={3} style={styles.detailItem}>
          <Typography variant="h6" style={styles.detailLabel}>
            ID No:
          </Typography>
          <Typography variant="body1" style={styles.detailValue}>NSr/23/23</Typography>
        </Grid>
        <Grid item xs={3} style={styles.detailItem}>
          <Typography variant="h6" style={styles.detailLabel}>
            Gender:
          </Typography>
          <Typography variant="body1" style={styles.detailValue}>F</Typography>
        </Grid>
        <Grid item xs={3} style={styles.detailItem}>
          <Typography variant="h6" style={styles.detailLabel}>
            Date of Admission:
          </Typography>
          <Typography variant="body1" style={styles.detailValue}>2/2/22</Typography>
        </Grid>
        <Grid item xs={3} style={styles.detailItem}>
          <Typography variant="h6" style={styles.detailLabel}>
            Date of Leaving:
          </Typography>
          <Typography variant="body1" style={styles.detailValue}>2/22/2222</Typography>
        </Grid>
      </Grid>
    </div>
    );
  }
}

export default StudentDetails;
