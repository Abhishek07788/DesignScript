import {
  loading,
  failed,
  login_success,
  signup_success,
  logout,
  clear,
} from "./user.type";

const initialState = {
  signupData: "",
  loginData: JSON.parse(localStorage.getItem("loginData")) || "",
  loginDataFail: "",
  userLoading: false,
  error: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case loading: {
      return { ...state, userLoading: true, error: false };
    }

    case failed: {
      return { ...state, userLoading: false, error: true };
    }

    case signup_success: {
      return {
        ...state,
        userLoading: false,
        error: false,
        signupData: payload,
      };
    }

    case login_success: {
      if (payload.status === true) {
        localStorage.setItem("loginData", JSON.stringify(payload));
        return {
          ...state,
          userLoading: false,
          error: false,
          loginData: payload,
        };
      } else {
        return {
          ...state,
          userLoading: false,
          error: false,
          loginDataFail: payload,
        };
      }
    }

    case clear: {
      return {
        ...state,
        userLoading: false,
        error: false,
        signupData: "",
        loginData: "",
        loginDataFail: "",
      };
    }
    case logout: {
      localStorage.clear("loginData");
      return {
        ...state,
        userLoading: false,
        error: false,
        loginData: "",
        signupData: "",
        loginDataFail: "",
      };
    }

    default:
      return state;
  }
};
