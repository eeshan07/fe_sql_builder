import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchTables = createAsyncThunk("metadata/fetchTables", async () => {
  const res = await axiosInstance.get("/api/metadata/tables");

  console.log("DEBUG tables API response:", res.data);

  // normalize response
  if (Array.isArray(res.data)) return res.data;
  if (res.data.tables) return res.data.tables;
  return [];
});

export const fetchTableColumns = createAsyncThunk(
  "metadata/fetchTableColumns",
  async (tableId) => {
    const res = await axiosInstance.get(`/api/metadata/tables/${tableId}/columns`);

    console.log("DEBUG columns API response:", res.data);

    // normalize response
    if (Array.isArray(res.data)) return { tableId, columns: res.data };
    if (res.data.columns) return { tableId, columns: res.data.columns };
    return { tableId, columns: [] };
  }
);

const metadataSlice = createSlice({
  name: "metadata",
  initialState: {
    tables: [],
    tableColumnsById: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchTableColumns.fulfilled, (state, action) => {
        state.tableColumnsById[action.payload.tableId] = action.payload.columns;
      });
  },
});

export default metadataSlice.reducer;
