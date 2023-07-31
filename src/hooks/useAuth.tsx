export const useAuth = () => {
  let token = localStorage.getItem('token');
  if (token != null && typeof token !== 'undefined') {
    return true;
  } else {
    return false;
  }
};
