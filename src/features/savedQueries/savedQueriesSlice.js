import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSavedQueriesAPI, saveQueryAPI, deleteQueryAPI } from "../../api/savedQueries";

export const fetchSavedQueries = createAsyncThunk(
  "savedQueries/fetchSavedQueries",
  async () => {
    const res = await fetchSavedQueriesAPI();
    return res.data;
  }
);

export const saveQuery = createAsyncThunk(
  "savedQueries/saveQuery",
  async (payload) => {
    const res = await saveQueryAPI(payload);
    return res.data;
  }
);

export const deleteQuery = createAsyncThunk(
  "savedQueries/deleteQuery",
  async (queryId) => {
    await deleteQueryAPI(queryId);
    return queryId;
  }
);

const savedQueriesSlice = createSlice({
  name: "savedQueries",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedQueries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedQueries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSavedQueries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveQuery.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(deleteQuery.fulfilled, (state, action) => {
        state.list = state.list.filter((q) => q.id !== action.payload);
      });
  }
});

export default savedQueriesSlice.reducer;
