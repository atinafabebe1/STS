import { Avatar, Drawer, List, Stack, Toolbar } from '@mui/material';
import assets from '../../assets';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';
import appRoutes from '../../routes/appRoutes';
import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse';
import { useUserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useUserContext();

  const userRole = user?.role || 'DefaultRole';

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sizeConfigs.sidebar.width,
          boxSizing: 'border-box',
          borderRight: '0px',
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color
        }
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: '20px' }}>
          <Stack sx={{ width: '100%' }} direction="row" justifyContent="center">
            <Link to={'/'}>
              <Avatar src={assets.images.logo} sx={{ width: 60, height: 60 }} />
            </Link>
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) =>
          route.visibleOn && !route.visibleOn.includes(userRole) ? null : route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
