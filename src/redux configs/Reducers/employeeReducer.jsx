import {createSlice} from "@reduxjs/toolkit";
// import type {PayloadAction} from "@reduxjs/toolkit";


// export interface CounterState {
//   employee: any;
//   errors: [];
//   isLogin: boolean;
// }

const initialState = {
  employee: null,
  errors: [],
  isLogin: false,
};

export const employeeReducer = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      console.log(action.payload,state)
      state.employee = action.payload;
      state.isLogin = true;
    },
    removeEmployee: (state, action) => {
      state.employee = null;
      state.isLogin = false;
     
    },
    isError: (state, action) => {
      state.errors.push(action.payload);
    },
    removeError: (state) => {
      state.errors = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addEmployee, removeEmployee, isError,removeError} = employeeReducer.actions;

export default employeeReducer.reducer;
