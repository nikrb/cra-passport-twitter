const authenticateUser = (token) => {
  localStorage.setItem( 'token', token);
};
const isUserAuthenticated = () => {
  return localStorage.getItem( 'token') !== null;
};
const deauthenticateUser = () => {
  localStorage.removeItem( 'token');
};
const getToken = () => {
  return localStorage.getItem( 'token');
};

export default { authenticateUser, isUserAuthenticated, deauthenticateUser, getToken};
