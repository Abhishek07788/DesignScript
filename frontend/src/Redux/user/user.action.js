import {
  loading,
  failed,
  login_success,
  signup_success,
  logout,
  clear
} from "./user.type";
import axios from "axios";

// ------------ (Sign up) ----------------
export const signup_api_call = (form) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.post("https://magnificent-pink-horse.cyclic.app/user/signup", {
      name: form.name,
      email: form.email,
      password: form.password,
      role: "user",
    });
    dispatch({ type: signup_success, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (Log in) ----------------
export const login_api_call = (form) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.post("https://magnificent-pink-horse.cyclic.app/user/login", {
      email: form.email,
      password: form.password,
    });
    dispatch({ type: login_success, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (Log out) ----------------
export const logoutFunc = () => ({ type: logout });

// ------------ (Clear) ----------------
export const ClearFunc = () => ({ type: clear });

