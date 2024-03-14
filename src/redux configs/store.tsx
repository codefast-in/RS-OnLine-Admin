import {configureStore} from "@reduxjs/toolkit";
import employeeReducer from "./Reducers/employeeReducer";
import adminReducer from "./Reducers/adminReducer";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    admin: adminReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch; 

export const useAppDispatch: () => AppDispatch = useDispatch