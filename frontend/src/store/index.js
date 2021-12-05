import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as toastrReducer } from 'react-redux-toastr';
import errorReducer from './reducers/errorReducer';
import blogReducer from './reducers/blogReducer';

const rootReducer = combineReducers({
  error: errorReducer,
  blog: blogReducer,
  toastr: toastrReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(ReduxThunk)));

export default store;
