import {
  INPUT_CHANGE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  AUTH_FAILURE,
  AUTH_SUCCESS
} from '../actions/types';

const initialState = {
  token: '',
  isAuthenticated: null,
  user: {},
  email: '',
  password: '',
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        email:'',
        password:''
      }
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
    case AUTH_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {}        
      }  
    default:
      return state;

  }
}
export default authReducer;