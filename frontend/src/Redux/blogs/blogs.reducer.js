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
  loading: false,
  error: false,
};

export const blogsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case loading: {
      return { ...state, loading: true, error: false };
    }

    case dataLoading: {
      return { ...state, loading: false, error: false };
    }

    case failed: {
      return { ...state, loading: false, error: true };
    }

    case blogs_get: {
      return { ...state, loading: false, error: false, blogsData: payload };
    }

    case blogs_getById: {
      return { ...state, loading: false, error: false, blogsDetails: payload };
    }

    case blogs_add: {
      return { ...state, loading: false, error: false };
    }

    case blogs_delete: {
      return { ...state, loading: false, error: false };
    }

    case blogs_update: {
      return { ...state, loading: false, error: false };
    }

    default:
      return state;
  }
};
