import API from "./axios";

export const fetchSavedQueriesAPI = async () => {
  return API.get("/saved-query");
};

export const saveQueryAPI = async (payload) => {
  return API.post("/saved-query", payload);
};

export const deleteQueryAPI = async (queryId) => {
  return API.delete(`/saved-query/${queryId}`);
};
