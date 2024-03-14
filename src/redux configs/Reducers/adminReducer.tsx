import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface AdminState {
  admin: any;
  errors: [string];
  isLogin: boolean;
}

const initialState: AdminState = {
  admin: null,
  errors: [""],
  isLogin: false,
};


export const adminReducer = createSlice({
    name: "admin",
    initialState,
    reducers:{
        addAdmin: (state, action: PayloadAction<any>) => {
            state.admin = action.payload;
            state.isLogin = true;
          },
          removeAdmin: (state) => {
            state.admin = null;
            state.isLogin = false;
          },
          isError: (state, action: PayloadAction<any>) => {
            state.errors.push(action.payload);
          },
          removeError: (state) => {
            state.errors = [""];
          },
    }

})

export const {addAdmin, removeAdmin, isError, removeError} =
  adminReducer.actions;

export default adminReducer.reducer;