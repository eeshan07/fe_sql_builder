import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateSQLAPI, executeHiveSQLAPI } from "../../api/query";

export const generateSQL = createAsyncThunk(
  "queryBuilder/generateSQL",
  async (queryGraph) => {
    const res = await generateSQLAPI(queryGraph);
    return res.data;
  }
);

export const executeHiveSQL = createAsyncThunk(
  "queryBuilder/executeHiveSQL",
  async (sql_query) => {
    const res = await executeHiveSQLAPI(sql_query);
    return res.data;
  }
);

const queryBuilderSlice = createSlice({
  name: "queryBuilder",
  initialState: {
    queryGraph: {
      nodes: [],
      edges: [],
      metadata: {}
    },
    generatedSQL: "",
    executionResult: null,
    loading: false,
    error: null
  },
  reducers: {
    setQueryGraph: (state, action) => {
      state.queryGraph = action.payload;
    },
    resetBuilder: (state) => {
      state.queryGraph = { nodes: [], edges: [], metadata: {} };
      state.generatedSQL = "";
      state.executionResult = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSQL.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateSQL.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedSQL = action.payload.sql_query || action.payload.sql || "";
      })
      .addCase(generateSQL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(executeHiveSQL.fulfilled, (state, action) => {
        state.executionResult = action.payload;
      });
  }
});

export const { setQueryGraph, resetBuilder } = queryBuilderSlice.actions;
export default queryBuilderSlice.reducer;
