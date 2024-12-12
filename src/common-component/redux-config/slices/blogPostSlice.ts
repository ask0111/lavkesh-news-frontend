import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogPost {
  _id?: string,
  title: string;
  subTitle: string;
  image: string;
  content: string;
  categories: string[];
  slug: string;
  url: string;
  tags: string[];
  meta: { title: string; description: string };
  headline: boolean,
  excerpt: string;
  author: string;
  status: string;
}

interface BlogPostState {
  posts: BlogPost;
  emptyPosts: Partial<Record<keyof BlogPost, string>>,
  loading: boolean;
  error: string | null;
}

const InitailPost = {
  title: "",
  subTitle: "",
  image: "",
  content: "Small phones have been a rare find for years, and that's only expected to continue in 2025 and beyond. If reports and leaks about upcoming Samsung and Apple devices turn out to be true, both companies may shake up their smartphone lineups in the coming years -- potentially resulting in an even bigger shift towards larger screens. ",
  categories: [],
  slug: "",
  url: "",
  tags: [],
  meta: { title: "", description: "" },
  headline: true,
  author: "string",
  excerpt: "string",
  status: "published",
}

const initialState: BlogPostState = {
  posts: InitailPost,
  emptyPosts: {} ,
  loading: false,
  error: null,
};

const blogPostSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<BlogPost>) {
      state.posts = action.payload
    },
    clearPosts(state, action) {
      state.posts = InitailPost;
    },
    setEmptyPosts(state, action: PayloadAction<object>){
      state.emptyPosts = action.payload
    },

    // Set loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Set error state
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setPosts,
  clearPosts,
  setEmptyPosts,
  setLoading,
  setError,
} = blogPostSlice.actions;

export default blogPostSlice.reducer;
