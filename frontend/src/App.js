import AppRoute from "./AppRoute";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from 'react-redux';
import { AuthContext } from "./context/auth";
import { AlertContext } from "./context/alert";
import { isLoggedIn, getSignedInData } from "./utils/auth";
import { useState, useEffect } from "react";
import { AlertBox, ErrorBoundary } from "./components/index";
import { io } from "socket.io-client";
import { SOCKET_URL } from "./utils/constants";
import axios from "axios";
import { API_PATH } from "./utils/constants";
import { logout, checkPlanStatus } from "./utils/auth";
import { useHistory } from "react-router";
import store from './store';
export const socket = io(SOCKET_URL);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  // const socket = useRef();
  // useEffect(() => {
  //   socket.current = io('ws://localhost:8010');
  // }, []);

  useEffect(() => {
    planStatus();
  });

  const planStatus = async () => {
    if (localStorage.token) {
      const subscriptionStatus = await checkPlanStatus();
      if (!subscriptionStatus && localStorage.role === "Founder") {
        logout();
        setIsSignedIn(false);
        history.push("/signin");
      }
    }
  };

  const history = useHistory();

  const [isSignedIn, setIsSignedIn] = useState(isLoggedIn());
  const signedData = useState(getSignedInData());
  const [on, setOn] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: 'Error!',
    message: 'Something went wrong',
    success: false,
  });

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className="App">
          <QueryClientProvider client={queryClient}>
            <AuthContext.Provider
              value={{ isSignedIn, setIsSignedIn, signedData }}
            >
              <AlertContext.Provider
                value={{
                  on: on,
                  setOn: setOn,
                  content: alertContent,
                  setAlertContent: setAlertContent,
                }}
              >
                <AlertBox />
                <AppRoute />
              </AlertContext.Provider>
            </AuthContext.Provider>
          </QueryClientProvider>
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
