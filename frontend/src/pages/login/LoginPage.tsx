import { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useUserContext } from '../../context/userContext';
import colorConfigs from '../../configs/colorConfigs';
import schoolLogo from '../../assets/logo.png';

const LoginPage = () => {
  const { loading, login, error } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: `linear-gradient(${colorConfigs.background})`,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '30px',
          maxWidth: '400px',
          width: '100%',
          borderRadius: '10px',
          textAlign: 'center',
          background: colorConfigs.paper,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img src={schoolLogo} alt="Yabersu Logo" style={{ marginBottom: '20px', maxWidth: '200px' }} />

        <Typography variant="h4" sx={{ marginBottom: '20px', color: colorConfigs.primary }}>
          Yaberus High School
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          fullWidth
          sx={{ marginBottom: '15px', '& .Mui-focused': { borderColor: colorConfigs.primary } }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          fullWidth
          sx={{ marginBottom: '20px', '& .Mui-focused': { borderColor: colorConfigs.primary } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            marginBottom: '15px',
            backgroundColor: colorConfigs.primary,
            borderRadius: '25px',
            position: 'relative',
            '&:hover': {
              backgroundColor: colorConfigs.primary,
            },
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />
              <span style={{ opacity: loading ? 0 : 1 }}>Login</span>
            </>
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
    </Box>
  );
};

export default LoginPage;
