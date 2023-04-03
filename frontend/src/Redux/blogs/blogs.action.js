import {
  loading,
  failed,
  blogs_add,
  blogs_get,
  blogs_getById,
  blogs_delete,
  blogs_update,
  blogs_getByUserId,
} from "./blogs.type";
import axios from "axios";

// ------------ (Add new blogs) ----------------
export const add_blogs_api_call = (form) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    await axios.post("https://magnificent-pink-horse.cyclic.app/blogs", form);
    dispatch({ type: blogs_add });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (get blogs) ----------------
export const get_blogs_api_call = () => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.get("https://magnificent-pink-horse.cyclic.app/blogs");
    dispatch({ type: blogs_get, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (get blogs by id) ----------------
export const get_blogs_by_id_api_call = (id) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.get(`https://magnificent-pink-horse.cyclic.app/blogs/${id}`);
    dispatch({ type: blogs_getById, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (get blogs by user id) ----------------
export const get_blogs_by_user_id_api_call = (id) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.get(`https://magnificent-pink-horse.cyclic.app/blogs/user/${id}`);
    dispatch({ type: blogs_getByUserId, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (get blogs) ----------------
export const get_blogs_by_title_api_call = (title) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.get(`https://magnificent-pink-horse.cyclic.app/blogs/title/${title}`);
    dispatch({ type: blogs_get, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (delete blogs) ----------------
export const delete_blog_api_call = (id) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    await axios.delete(`https://magnificent-pink-horse.cyclic.app/blogs/${id}`);
    dispatch({ type: blogs_delete });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (update blogs) ----------------
export const update_blogs_api_call = (id, cred) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    await axios.patch(`https://magnificent-pink-horse.cyclic.app/blogs/${id}`, cred);
    dispatch({ type: blogs_update });
  } catch (e) {
    dispatch({ type: failed });
  }
};
