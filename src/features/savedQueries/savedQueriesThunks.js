import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSavedQueriesAPI,
  saveQueryAPI,
  deleteQueryAPI
} from "../../api/savedQueries";

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
    const res = await deleteQueryAPI(queryId);
    return res.data;
  }
);
