const ACTIONS = {
  LOGIN_INITIALIZED: "LOGIN_INITIALIZED", //User clicks the log in button > fetch AuthURL > page is redirected externally to authURL
  LOGIN_VALIDATED: "LOGIN_VALIDATED",
  LOGIN_LOGOUT: "LOGIN_LOGOUT",
};
const URLS = {
  LOGIN_INITIALIZED: "/auth/signin",
  LOGIN_VALIDATED: "/auth/redirect?code",
  LOGIN_LOGOUT: "/auth/signout",
};

export { ACTIONS, URLS };
