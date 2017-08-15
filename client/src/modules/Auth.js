const authenticateUser = ( user) => {
  localStorage.setItem( 'token', user.token);
  localStorage.setItem( 'name', user.name);
};
const isUserAuthenticated = () => {
  return localStorage.getItem( 'token') !== null;
};
const deauthenticateUser = () => {
  localStorage.removeItem( 'token');
  localStorage.removeItem( 'name');
};
const getToken = () => {
  return localStorage.getItem( 'token');
};
const getUsername = () => {
  return localStorage.getItem( 'name');
};

export default { authenticateUser, isUserAuthenticated, deauthenticateUser,
                  getToken, getUsername};
