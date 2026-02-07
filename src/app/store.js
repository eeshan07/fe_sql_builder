import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import metadataReducer from "../features/metadata/metadataSlice";
import savedQueriesReducer from "../features/savedQueries/savedQueriesSlice";
import queryBuilderReducer from "../features/queryBuilder/queryBuilderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    metadata: metadataReducer,
    savedQueries: savedQueriesReducer,
    queryBuilder: queryBuilderReducer
  }
});

export default store;
