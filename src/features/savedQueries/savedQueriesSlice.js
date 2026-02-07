import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchSavedQueries = createAsyncThunk(
  "savedQueries/fetchSavedQueries",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/saved-query");

      console.log("Saved Query Response:", res.data);

      // Normalize response
      if (Array.isArray(res.data)) return res.data;
      if (res.data.saved_queries) return res.data.saved_queries;
      if (res.data.data) return res.data.data;

      return [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const savedQueriesSlice = createSlice({
  name: "savedQueries",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedQueries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedQueries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSavedQueries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default savedQueriesSlice.reducer;
