import app from "@/utils/axios";
import {
  addEmployee,
  removeEmployee,
  isError,
  removeError,
  EmployeeState,
} from "../Reducers/employeeReducer";
import {AppDispatch} from "../store";

export const asyncAddEmployee: any =
  (employee: {}) => async (dispatch: any, getState: any) => {
    try {
      const {data} = await app.post("/api/employee/signup/", employee);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(isError(error.response.data.message));
    }
  };

export const asynceCurrentEmployee: any =
  () => async (dispatch: AppDispatch, getState: any) => {
    try {
      const data = await app.post("/api/employee/current/");
      // console.log(data);
      dispatch(addEmployee(data.data));
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

export const asyncLoginEmployee: any =
  (loginData: {}) => async (dispatch: AppDispatch, getState: any) => {
    try {
      const {data} = await app.post("/api/employee/signin/", loginData);

      dispatch(asynceCurrentEmployee());
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

export const asyncLogoutEmployee: any =
  () => async (dispatch: AppDispatch, getState: any) => {
    try {
      const {data} = await app.get("/api/employee/signout/");

      console.log(data);
      dispatch(removeEmployee());
      dispatch(removeError());
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
    }
  };
