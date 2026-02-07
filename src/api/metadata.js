import API from "./axios";

export const getTablesAPI = async () => {
  return API.get("/metadata/tables");
};

export const getTableColumnsAPI = async (tableName) => {
  return API.get(`/metadata/tables/${tableName}/columns`);
};
