import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed for making API calls
import DashboardWidget from './DashboardWidget'; // Import any reusable widget component

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard'); // Adjust API endpoint as needed
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to trigger the data fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner or animation here
  }

  // Render the dashboard with different widgets based on fetched data
  return (
    <div>
      <h1>Dashboard</h1>
      {dashboardData && dashboardData.widgets.map((widget, index) => (
        <DashboardWidget key={index} data={widget} />
      ))}
    </div>
  );
};

export default Dashboard;
 
