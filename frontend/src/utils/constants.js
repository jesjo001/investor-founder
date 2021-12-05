export const API_PATH =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? process.env.REACT_APP_API_PATH_LOCAL
    : process.env.REACT_APP_API_PATH_PROD;
export const STRIPE_PUBLIC = process.env.REACT_APP_STRIPE_PUBLIC;
export const SOCKET_URL =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? process.env.REACT_APP_SOCKET_URL_LOCAL
    : process.env.REACT_APP_SOCKET_URL_PROD;
export const FRONTEND_PATH = process.env.REACT_APP_FRONTEND;
