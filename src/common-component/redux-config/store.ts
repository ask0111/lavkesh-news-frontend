// store.ts
import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from "./slices/toggleSlice";
import blogPostReducer from "./slices/blogPostSlice";

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    blogPosts: blogPostReducer,
  },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
