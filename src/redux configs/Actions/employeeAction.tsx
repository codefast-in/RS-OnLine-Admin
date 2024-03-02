import app from "@/utils/axios";
import {
  addEmployee,
  removeEmployee,
  isError,
  removeError,
} from "../Reducers/employeeReducer";

export const asyncAddEmployee =
  (employee: {}) => async (dispatch: any, getState: any) => {
    try {
      const {data} = await app.post("/api/employee/signup/", employee);

      // console.log(data);
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
    }
  };

export const asynceCurrentEmployee =
  () => async (dispatch: any, getState: any) => {
    try {
      const {data} = await app.post("/api/employee/current/");
      console.log(data);
      dispatch(addEmployee(data.employee));
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

export const asyncLoginEmployee =
  (loginData: {}) => async (dispatch: any, getState: any) => {
    try {
      const {data} = await app.post("/api/employee/signin/", loginData);
      console.log(data);
      dispatch(asynceCurrentEmployee());
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

export const asyncLogoutEmployee =
  () => async (dispatch: any, getState: any) => {
    try {
      const {data} = await app.get("/api/employee/signout/");

      console.log(data);
      dispatch(removeEmployee());
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
    }
  };
