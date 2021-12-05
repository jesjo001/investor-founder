import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import './vibe/scss/styles.scss';
import './muon-styles.css';

// Imports
import store from './store';
import PrivateRoute from '../src/vibe/components/common/PrivateRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './views/pages/auth/Login';
import { loadUser } from './store/actions/authActions';

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ zoom: '100%' }}>
          {/* <Redirect to="/auth/login" /> */}
          <Switch>
            <Route exact path="/auth/login" component={props => <Login {...props} />} />
            <Route component={props => <DashboardLayout {...props} />} />
          </Switch>

          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr} // This is the default
            transitionIn="bounceIn"
            transitionOut="bounceOut"
            progressBar
            closeOnToastrClick />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
