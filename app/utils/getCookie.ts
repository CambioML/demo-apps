import Cookies from 'js-cookie';

const USER_ID = 'sustainability_report_user_id';

export const getSustainabilityUserId = (): string => {
  let userId = Cookies.get(USER_ID);
  if (!userId) {
    userId = Math.random().toString(36).substring(2);
    Cookies.set(USER_ID, userId, { expires: 365 });
  }
  return userId;
};

const INSIGHT_DASHBOARD_USER_ID = 'insight_dashboard_user_id';

export const getInsightDashboardUserId = (): string => {
  let userId = Cookies.get(INSIGHT_DASHBOARD_USER_ID);
  if (!userId) {
    userId = Math.random().toString(36).substring(2);
    Cookies.set(INSIGHT_DASHBOARD_USER_ID, userId, { expires: 365 });
  }
  return userId;
};
