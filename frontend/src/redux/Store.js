import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./reducers/UserReducer"; 
import { createLogger } from "redux-logger";

const logger = createLogger();

export default configureStore({
  reducer: { UserReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
