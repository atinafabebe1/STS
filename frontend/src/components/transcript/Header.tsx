import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import assets from '../../assets';

const styles = {
  header: {
    marginBottom: '24px',
    width:"100%",
    display:"flex",
    justifyContent: 'center', 
  },
  logo: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '24px',
    marginRight: '24px',
  },
  schoolName: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  transcriptTitle: {
    fontSize: '1.2em',
  },
};

class Header extends React.Component {
  render() {
    return (
      <Grid container spacing={3} style={styles.header}>
        <Grid item>
          <img
            alt="image"
            src={assets.images.logo}
            style={styles.logo as React.CSSProperties} // Type assertion
          />
        </Grid>
        <Grid item xs={6} style={styles.titleContainer as React.CSSProperties}>
          <Typography variant="h4" style={styles.schoolName}>
            YABERUS WOLKITE SCHOOL
          </Typography>
          <Typography variant="h5" style={styles.transcriptTitle}>
            STUDENT'S TRANSCRIPT
          </Typography>
        </Grid>
        <Grid item>
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHBlcnNvbnxlbnwwfHx8fDE3MDgxNzkzMzd8MA&amp;ixlib=rb-4.0.3&amp;w=200"
            style={styles.logo as React.CSSProperties} // Type assertion
          />
        </Grid>
      </Grid>
    );
  }
}

export default Header;
