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
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: colorConfigs.background,
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
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '20px', color: colorConfigs.primary }}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          fullWidth
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          fullWidth
          sx={{ marginBottom: '15px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ marginBottom: '15px', backgroundColor: colorConfigs.primary }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default LoginPage;
