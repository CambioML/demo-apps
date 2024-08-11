import Cookies from 'js-cookie';

export const getUserId = (): string => {
  let userId = Cookies.get('user_id');
  if (!userId) {
    userId = Math.random().toString(36).substring(2);
    Cookies.set('user_id', userId, { expires: 365 });
  }
  return userId;
};
