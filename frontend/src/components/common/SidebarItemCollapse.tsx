import { useEffect, useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useUserContext } from '../../context/userContext';
import colorConfigs from '../../configs/colorConfigs';
import { RouteType } from '../../routes/config';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from './SidebarItem';

type Props = {
  item: RouteType;
};

const SidebarItemCollapse = ({ item }: Props) => {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { appState } = useSelector((state: RootState) => state.appState);

  const userRole = user?.role || 'DefaultRole';

  useEffect(() => {
    setLoading(true);
    if (appState.includes(item.state)) {
      setOpen(true);
    }
    setLoading(false);
  }, [appState, item]);

  const childRoutes = item.child?.filter((childRoute) => !childRoute.visibleOn || childRoute.visibleOn.includes(userRole));

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleToggle}
        sx={{
          '&:hover': {
            backgroundColor: colorConfigs.sidebar.hoverBg,
            transition: 'background-color 0.3s ease, transform 0.3s ease'
          },
          padding: '12px 24px',
          backgroundColor: open ? colorConfigs.sidebar.activeBg : 'transparent',
          transition: 'background-color 0.3s ease, transform 0.3s ease',
          '&:active': {
            transform: 'scale(0.98)'
          }
        }}
        aria-expanded={open}
        aria-controls={`sidebar-collapse-${item.state}`}
        disabled={loading}
      >
        <ListItemIcon sx={{ color: colorConfigs.sidebar.color }}>{item.sidebarProps?.icon && item.sidebarProps.icon}</ListItemIcon>
        <ListItemText disableTypography primary={<Typography sx={{ paddingY: 0 }}>{item.sidebarProps?.displayText}</Typography>} />
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" id={`sidebar-collapse-${item.state}`}>
        <List>
          {loading ? (
            <div>Loading...</div>
          ) : (
            childRoutes?.map((route, index) =>
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  <div key={index} style={{ height: '40px' }}>
                    <SidebarItem item={route} />
                  </div>
                )
              ) : null
            )
          )}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarItemCollapse;
