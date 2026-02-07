import API from "./axios";

export const generateSQLAPI = async (queryGraph) => {
  return API.post("/query/generate", queryGraph);
};

export const executeHiveSQLAPI = async (sql_query) => {
  return API.post("/query/execute-hive", { sql_query });
};
