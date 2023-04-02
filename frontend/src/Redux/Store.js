import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { blogsReducer } from "./blogs/blogs.reducer";
import { userReducer } from "./user/user.reducer";
import { commentReducer } from "./comments/comments.reducer";

const rootReducer = combineReducers({
  User: userReducer,
  Blogs: blogsReducer,
  Comments: commentReducer,
});

export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));
