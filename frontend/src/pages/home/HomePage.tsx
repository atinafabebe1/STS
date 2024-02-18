import RecentActivities from "../../components/dashboard/recentActivities";

const Dashboard = () => {
  const recentActivities = [
    { id: 1, timestamp: '2022-02-18 10:30 AM', activity: 'Submitted assignment' },
    { id: 2, timestamp: '2022-02-18 11:45 AM', activity: 'Received new grade' },
  ];
  return (
    <div>
      <RecentActivities activities={recentActivities}/>
    </div>
  );
};

export default Dashboard;