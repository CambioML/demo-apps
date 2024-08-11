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
