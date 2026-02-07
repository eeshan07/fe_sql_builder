import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchTables = createAsyncThunk("metadata/fetchTables", async () => {
  const res = await axiosInstance.get("api/metadata/tables");
  return res.data; 
});

const metadataSlice = createSlice({
  name: "metadata",
  initialState: {
    tables: [],
    tablesByName: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;

        // backend response should be array
        const tables = action.payload || [];

        state.tables = tables;

        // build lookup map
        const map = {};
        tables.forEach((t) => {
          map[t.name] = t;
        });

        state.tablesByName = map;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default metadataSlice.reducer;
