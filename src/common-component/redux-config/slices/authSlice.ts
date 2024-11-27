import { apiService } from "@/services/axios.service";
import { getCookies } from "@/services/cookies.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const isAuthorized = async (token: string | null) => {
  if (!token) throw new Error("No token provided");
  try {
    const res = await apiService.get("/auth/check-authorization", {
      Authorization: `Bearer ${token}`,
    });
    const response = res.data;
    return response.data;
  } catch (error) {
    window.location.href = "/private/rbac/login";
  }
};

interface AuthState {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  user: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {},
  status: "idle",
  error: null,
};

// Async thunk to check authorization
export const verifyAuth = createAsyncThunk(
  "authStates/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = getCookies("token") || "";
      if (!token) {
        window.location.href = "/private/rbac/login";
        throw new Error("Token not found in cookies.");
      }
      const data = await isAuthorized(token);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to verify authentication"
      );
    }
  }
);

const authStateSlice = createSlice({
  name: "checkAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export default authStateSlice.reducer;
