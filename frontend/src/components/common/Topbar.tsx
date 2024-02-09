import { AppBar, Toolbar, Typography, Button, CircularProgress } from '@mui/material';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';
import { useUserContext } from '../../context/userContext';

const Topbar = () => {
  const { logout, loading } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: 'unset',
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar>
        <Typography variant="h6">Student Transcript System</Typography>
        {loading ? (
          <CircularProgress color="inherit" size={24} sx={{ marginLeft: 'auto' }} />
        ) : (
          <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
