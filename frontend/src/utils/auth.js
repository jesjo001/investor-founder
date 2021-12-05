import { API_PATH } from "./constants";
import axios from "axios";

const setLocalStorage = ({ token, email, role, id }) => {
  logout();
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("role", role);
  localStorage.setItem("id", id);
};

export const signIn = async (
  signInData,
  history,
  setIsSignedIn,
  setAlertContent,
  setOn
) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_PATH}/signin`,
      data: {
        email: signInData.email,
        password: signInData.password,
      },
    });
    const data = await response.data;

    setLocalStorage(data);
    localStorage.subscriptionStatus = data.subscriptionStatus;
    switch (data.role) {
      case "Investor":
        history.push("/investor/dashboard");
        setIsSignedIn(true);
        break;
      case "Founder":
        history.push("/founder/dashboard");
        setIsSignedIn(true);
        break;
      default:
        history.push("/");
        break;
    }
  } catch (e) {
    // alert("Invalid credentials.");
    setAlertContent({
      title: "Error!",
      message: e?.response?.data?.message ?? "Something went wrong",
      success: false,
    });
    setOn(true);
    setIsSignedIn(false);
  }
};

export const checkPlanStatus = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_PATH}/confirm-login`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { subscriptionStatus } = await response.data;
    return subscriptionStatus;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const isAuthorized = (roles, planStatus) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const subStat = localStorage.subscriptionStatus === "true" ? true : false;

  console.log(556, planStatus);

  if (role === "Founder" && planStatus === false) {
    return false;
  }
  if (token === null || role === null) {
    return false;
  }
  if (roles.includes(role) === false) {
    return false;
  }

  return true;
};

export const isLoggedIn = () => {
  return localStorage?.getItem("role") !== null;
};

export const getSignedInData = () => {
  return {
    token: localStorage.getItem("token") ?? "",
    email: localStorage.getItem("email") ?? "",
    id: localStorage.getItem("id") ?? "",
    role: localStorage.getItem("role") ?? "",
  };
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/signin";
};

export const axiosInterceptor = () => {
  if (axios?.interceptors?.response) {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(`error?.response`, error?.response);
        if (error?.response?.status === 401) {
          //action to take place
          logout();
        }
      }
    );
  }
};
