import {
  loading,
  dataLoading,
  failed,
  blogs_add,
  blogs_get,
  blogs_getById,
  blogs_delete,
  blogs_update,
} from "./blogs.type";

const initialState = {
  blogsData: [],
  blogsDetails: {},
  blogLoading: false,
  error: false,
};

export const blogsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case loading: {
      return { ...state, blogLoading: true, error: false };
    }

    case dataLoading: {
      return { ...state, blogLoading: false, error: false };
    }

    case failed: {
      return { ...state, blogLoading: false, error: true };
    }

    case blogs_get: {
      return { ...state, blogLoading: false, error: false, blogsData: payload };
    }

    case blogs_getById: {
      return {
        ...state,
        blogLoading: false,
        error: false,
        blogsDetails: payload,
      };
    }

    case blogs_add: {
      return { ...state, blogLoading: false, error: false };
    }

    case blogs_delete: {
      return { ...state, blogLoading: false, error: false };
    }

    case blogs_update: {
      return { ...state, blogLoading: false, error: false };
    }

    default:
      return state;
  }
};
