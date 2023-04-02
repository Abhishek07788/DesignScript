import {
  loading,
  error,
  addComment,
  getAllComments,
  deleteOneComment,
  getAllCommentsCount
} from "./comments.type";
import axios from "axios";

// -------------- add new comment --------
export const add_comment_api_call = (form) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    await axios.post(`https://magnificent-pink-horse.cyclic.app/comments`, form);
    dispatch({ type: addComment });
  } catch (e) {
    dispatch({ type: error });
  }
};

// -------------- get all comments --------
export const get_comments_api_call = () => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.get(`https://magnificent-pink-horse.cyclic.app/comments`);
    dispatch({ type: getAllComments, payload: res.data });
  } catch (e) {
    dispatch({ type: error });
  }
};

// -------------- get comments by blogs id --------
export const get_comments_by_blogs_api_call = (id) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.get(`https://magnificent-pink-horse.cyclic.app/comments/blog/${id}`);
    dispatch({ type: getAllComments, payload: res.data });
  } catch (e) {
    dispatch({ type: error });
  }
};

// -------------- get comments by user id --------
export const get_comments_by_user_api_call = (id) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    const res = await axios.get(`https://magnificent-pink-horse.cyclic.app/comments/user/${id}`);
    dispatch({ type: getAllCommentsCount, payload: res.data.length });
  } catch (e) {
    dispatch({ type: error });
  }
};

// -------------- delete comment --------
export const delete_comments_api_call = (id) => async (dispatch) => {
  dispatch({ type: loading });
  try {
    await axios.delete(`https://magnificent-pink-horse.cyclic.app/comments/${id}`);
    dispatch({ type: deleteOneComment });
  } catch (e) {
    dispatch({ type: error });
  }
};
