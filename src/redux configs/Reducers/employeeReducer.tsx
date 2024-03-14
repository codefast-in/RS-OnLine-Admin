import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface EmployeeState {
  employee: any;
  errors: [string];
  isLogin: boolean;
}

const initialState: EmployeeState = {
  employee: null,
  errors: [""],
  isLogin: false,
};

export const employeeReducer = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<any>) => {
      state.employee = action.payload;
      state.isLogin = true;
    },
    removeEmployee: (state) => {
      state.employee = null;
      state.isLogin = false;
    },
    isError: (state, action: PayloadAction<any>) => {
      state.errors.push(action.payload);
    },
    removeError: (state) => {
      state.errors = [""];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addEmployee, removeEmployee, isError, removeError} =
  employeeReducer.actions;

export default employeeReducer.reducer;
