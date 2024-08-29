'use client';

import Dashboard from '@/app/components/Dashboard/Dashboard';
import useFetchData from '@/app/hooks/InsightDashboard/useFetchData';

function Page() {
  return <Dashboard dashboardName="Insight Dashboard" projectLabel="Project" useFetchData={useFetchData} />;
}

export default Page;
