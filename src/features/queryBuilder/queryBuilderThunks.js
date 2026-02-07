import { createAsyncThunk } from "@reduxjs/toolkit";
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
