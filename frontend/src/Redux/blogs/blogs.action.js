import {
  loading,
  failed,
  dataLoading,
  blogs_add,
  blogs_get,
  blogs_getById,
  blogs_delete,
  blogs_update,
} from "./blogs.type";
import axios from "axios";

// ------------ (Add new blogs) ----------------
export const add_blogs_api_call = (form) => async (dispatch) => {
  console.log("form: ", form);
  dispatch({ type: loading });
  try {
    await axios.post("http://localhost:8080/blogs", form);
    dispatch({ type: blogs_add });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (get blogs) ----------------
export const get_blogs_api_call = () => async (dispatch) => {
  dispatch({ type: dataLoading });
  try {
    const res = await axios.get("http://localhost:8080/blogs");
    dispatch({ type: blogs_get, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (get blogs by id) ----------------
export const get_blogs_by_id_api_call = (id) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.get(`http://localhost:8080/blogs/${id}`);
    dispatch({ type: blogs_getById, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (get blogs) ----------------
export const get_blogs_by_title_api_call = (title) => async (dispatch) => {
  dispatch({ type: dataLoading });
  try {
    const res = await axios.get(`http://localhost:8080/blogs/title/${title}`);
    dispatch({ type: blogs_get, payload: res.data });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (delete blogs) ----------------
export const delete_blog_api_call = (id) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    await axios.delete(`http://localhost:8080/blogs/${id}`);
    dispatch({ type: blogs_delete });
  } catch (e) {
    dispatch({ type: failed });
  }
};

// ------------ (update blogs) ----------------
export const update_blogs_api_call = (id, cred) => async (dispatch) => {
  console.log("id, cred: ", id, cred);
  dispatch({ type: loading });
  try {
    await axios.patch(`http://localhost:8080/blogs/update/${id}`, cred);
    dispatch({ type: blogs_update });
  } catch (e) {
    dispatch({ type: failed });
  }
};
