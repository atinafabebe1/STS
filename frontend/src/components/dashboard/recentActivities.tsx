import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

interface RecentActivity {
  id: number;
  timestamp: string;
  activity: string;
}

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography>
      <Paper elevation={3} sx={{ padding: '15px', borderRadius: '10px' }}>
        {activities.length > 0 ? (
          <List>
            {activities.map((activity) => (
              <ListItem key={activity.id}>
                <ListItemText
                  primary={activity.activity}
                  secondary={activity.timestamp}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2">No recent activities</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RecentActivities;
