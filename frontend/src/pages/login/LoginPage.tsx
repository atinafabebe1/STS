import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
} from '@mui/material';
import { useUserContext } from '../../context/userContext';
import colorConfigs from '../../configs/colorConfigs';
import schoolLogo from '../../assets/logo.png';

const LoginPage = () => {
  const { loading, login, error } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Director');

  const handleLogin = () => {
    const credentials = {
      Director: { username: 'Director', password: 'abcdabcd' },
      Secretary: { username: 'Secretary', password: 'abcdabcd' },
    };

    const selectedCredentials = credentials[role];
    setUsername(selectedCredentials.username);
    setPassword(selectedCredentials.password);
    login(selectedCredentials);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '30px',
          width: '100%',
          borderRadius: '10px',
          textAlign: 'center',
          background: colorConfigs.paper,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img src={schoolLogo} alt="Yabersu Logo" style={{ marginBottom: '20px', maxWidth: '200px' }} />

        <Typography variant="h5" sx={{ marginBottom: '20px', color: colorConfigs.primary }}>
          Yaberus High School
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
          Select a demo account:
        </Typography>

        <RadioGroup
          aria-label="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          row
          sx={{ marginBottom: '15px' }}
        >
          <FormControlLabel value="Director" control={<Radio />} label="Director Demo" />
          <FormControlLabel value="Secretary" control={<Radio />} label="Secretary Demo" />
        </RadioGroup>

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          fullWidth
          disabled
          sx={{ marginBottom: '15px', '& .Mui-focused': { borderColor: colorConfigs.primary } }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          fullWidth
          disabled
          sx={{ marginBottom: '20px', '& .Mui-focused': { borderColor: colorConfigs.primary } }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          disabled={loading}
          sx={{
            marginBottom: '15px',
            backgroundColor: colorConfigs.primary,
            borderRadius: '25px',
            '&:hover': {
              backgroundColor: colorConfigs.primary,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ marginRight: '10px' }} />
          ) : (
            'Login'
          )}
        </Button>

        {error && (
          <Alert severity="error" sx={{ marginBottom: '15px', borderRadius: '10px' }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default LoginPage;
