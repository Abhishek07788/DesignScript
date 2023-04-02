import {
  loading,
  error,
  addComment,
  getAllComments,
  deleteOneComment,
  getAllCommentsCount,
} from "./comments.type";

const initialState = {
  commentData: [],
  commentLoading: false,
  error: false,
  commentCount: 0,
};

export const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case loading: {
      return { ...state, commentLoading: true, error: false };
    }
    case error: {
      return { ...state, commentLoading: false, error: true };
    }
    case getAllComments: {
      return {
        ...state,
        commentLoading: false,
        error: false,
        commentData: payload,
      };
    }
    case getAllCommentsCount: {
      return {
        ...state,
        commentLoading: false,
        error: false,
        commentCount: payload,
      };
    }
    case addComment: {
      return { ...state, commentLoading: false, error: false };
    }
    case deleteOneComment: {
      return { ...state, commentLoading: false, error: false };
    }

    default:
      return state;
  }
};
