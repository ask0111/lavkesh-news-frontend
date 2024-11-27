// store.ts
import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from "./slices/toggleSlice";
import blogPostReducer from "./slices/blogPostSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    blogPosts: blogPostReducer,
    checkAuth: authReducer,
  },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
