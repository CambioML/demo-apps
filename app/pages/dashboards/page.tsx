'use client';
import { postUser } from '@/app/actions/sustainabilityReport/postUser';
import Title from '@/app/components/Title';
import useInsightDashboardStore from '@/app/hooks/InsightDashboard/insightDashboardStore';
import useFetchInsightDashboardData from '@/app/hooks/InsightDashboard/useFetchInsightDashboardData';
import { getInsightDashboardUserId } from '@/app/utils/getCookie';
import { Button } from '@material-tailwind/react';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

enum InsightDashboardState {
  LOADING,
  LOGIN,
  DASHBOARD,
}

const DashboardPage = () => {
  const { setUserId, dashboards } = useInsightDashboardStore();
  const [state, setState] = useState<InsightDashboardState>(InsightDashboardState.LOADING);
  const { fetchUserData } = useFetchInsightDashboardData();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getInsightDashboardUserId();
      if (userId) {
        setUserId(userId);
        setState(InsightDashboardState.DASHBOARD);
      } else {
        setState(InsightDashboardState.LOGIN);
      }
    };
    fetchUser();
  }, []);

  const addUser = async () => {
    const userId = await getInsightDashboardUserId();
    const response: AxiosResponse = await postUser({ userId });
    if (response.status === 200 || response.status === 201) {
      console.log('User added/created!', response);
      setUserId(response.data.userId);
      setState(InsightDashboardState.DASHBOARD);
      fetchUserData();
    } else {
      console.error('Failed to add user', response);
      setState(InsightDashboardState.LOGIN);
    }
  };

  const handleLogin = async () => {
    setState(InsightDashboardState.LOADING);
    await addUser();
  };

  const loginContent = (
    <div className="flex flex-col items-center">
      <Title label="Insight Dashboards" />
      <div className="flex flex-col items-center mt-4">
        <Button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Button>
      </div>
    </div>
  );
  const dashboardContent = (
    <div className="flex flex-col items-start mt-4">
      <div>Dashboards</div>
      {dashboards.map((dashboard) => (
        <div key={dashboard.dashboardId}>{dashboard.dashboardName}</div>
      ))}
    </div>
  );
  return (
    <div className="w-full h-full flex flex-col">
      <Title label="Insight Dashboards" />
      {state === InsightDashboardState.LOADING ? (
        <div>Loading...</div>
      ) : state === InsightDashboardState.LOGIN ? (
        loginContent
      ) : state === InsightDashboardState.DASHBOARD ? (
        dashboardContent
      ) : null}
    </div>
  );
};

export default DashboardPage;
