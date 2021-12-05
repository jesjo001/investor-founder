import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as toastrReducer } from 'react-redux-toastr';
import errorReducer from './reducers/errorReducer';
import authReducer from './reducers/authReducer';
import eventReducer from './reducers/eventReducer';
import investorReducer from './reducers/investorReducer';
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';
import dashboardReducer from './reducers/dashboardReducer';
import founderReducer from './reducers/founder';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  investor: investorReducer,
  error: errorReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  blog: blogReducer,
  founder: founderReducer,
  toastr: toastrReducer,
  search: searchReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(ReduxThunk)));

export default store;
