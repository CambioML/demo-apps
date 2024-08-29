import { useCallback, useEffect } from 'react';
import useInsightDashboardStore from './insightDashboardStore';
import { getUserData } from '@/app/actions/insightDashboard/getUserData';

const useFetchInsightDashboardData = () => {
  const { userId, setDashboards } = useInsightDashboardStore();

  const fetchUserData = useCallback(async () => {
    try {
      const newUserData = await getUserData({ userId });
      console.log('newUserData', newUserData);
      if (!newUserData.dashboards) {
        console.error('No dashboards found in newUserData:', newUserData);
        return;
      }
      setDashboards(newUserData.dashboards);
    } catch (error) {
      console.error('Error fetching or updating reports:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [fetchUserData]);

  return { fetchUserData };
};

export default useFetchInsightDashboardData;
