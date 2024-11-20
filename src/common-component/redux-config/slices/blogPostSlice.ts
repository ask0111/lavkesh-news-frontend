import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogPost {
  _id: string;
  title: string;
  subTitle: string;
  image: string;
  content: string;
  categories: string;
  url: string;
  tags: string[];
  meta: { title: string; description: string };
  headline: boolean,
  slug: string;
  excerpt: string;
  author: string;
  status: string;
  coverImage: string;
}

interface BlogPostState {
  posts: BlogPost;
  loading: boolean;
  error: string | null;
}

const InitailPost = {
  _id: "",
  title: "",
  subTitle: "",
  image: "",
  content: "",
  categories: "",
  url: "",
  tags: [],
  meta: { title: "", description: "" },
  headline: true,
  slug: "string",
  author: "string",
  excerpt: "string",
  status: "string",
  coverImage: "string",
}

const initialState: BlogPostState = {
  posts: InitailPost,
  loading: false,
  error: null,
};

const blogPostSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    // Set posts (e.g., after fetching from API)
    setPosts(state, action: PayloadAction<BlogPost>) {
      state.posts = action.payload
      // state.posts = action.payload;
    },
    // Add a new post
    // addPost(state, action: PayloadAction<BlogPost>) {
    //   state.posts.push(action.payload);
    // },
    // // Update an existing post
    // updatePost(state, action: PayloadAction<BlogPost>) {
    //   const index = state.posts.findIndex((post) => post._id === action.payload._id);
    //   if (index !== -1) {
    //     state.posts[index] = action.payload;
    //   }
    // },
    // // Delete a post
    // deletePost(state, action: PayloadAction<string>) {
    //   state.posts = state.posts.filter((post) => post._id !== action.payload);
    // },
    // // Set loading state
    // setLoading(state, action: PayloadAction<boolean>) {
    //   state.loading = action.payload;
    // },
    // // Set error state
    // setError(state, action: PayloadAction<string | null>) {
    //   state.error = action.payload;
    // },
  },
});

export const {
  setPosts,
  // addPost,
  // updatePost,
  // deletePost,
  // setLoading,
  // setError,
} = blogPostSlice.actions;

export default blogPostSlice.reducer;
