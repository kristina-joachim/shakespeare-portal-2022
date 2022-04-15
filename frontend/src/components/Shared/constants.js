const ACTIONS = {
  LOGIN_INITIALIZED: "LOGIN_INITIALIZED", //User clicks the log in button > fetch AuthURL
  LOGIN_PROCESSING: "LOGIN_PROCESSING", //Page is redirected externally to authURL
  LOGIN_VALIDATED: "LOGIN_VALIDATED",
  LOGIN_COMPLETE: "LOGIN_COMPLETE",
  LOGOUT: "LOGOUT",
};
const URLS = {
  LOGIN_PROCESSING: "/auth/signin",
  LOGIN_VALIDATED: "/auth/redirect?code",
  LOGOUT: "/auth/signout",
};

export { ACTIONS, URLS };
