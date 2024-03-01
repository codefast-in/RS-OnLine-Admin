import app from "@/utils/axios";
import {
  addEmployee,
  removeEmployee,
  isError,
  removeError,
} from "../Reducers/employeeReducer";


export const asyncAddEmployee =
  (employee) => async (dispatch, getState) => {
    try {
      const {data} = await app.post("/api/employee/signup/", employee);

      // console.log(data);
    } catch (error) {
      dispatch(isError(error.response.data.message));
    }
  };

export const asynceCurrentEmployee =
  () => async (dispatch, getState) => {
    try {
      const {data} = await app.post("/api/employee/current/");
      console.log(data);      
      dispatch(addEmployee(data.employee));
    } catch (error) {
      dispatch(isError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

export const asyncLoginEmployee =
  (loginData) => async (dispatch, getState) => {
    try {
      const {data} = await app.post("/api/employee/signin/", loginData);
      console.log(data);
      setTimeout(() => {
        console.log("1sec")
        dispatch(asynceCurrentEmployee());
      }, 1000);
    } catch (error) {
      dispatch(isError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

export const asyncLogoutEmployee =
  () => async (dispatch, getState) => {
    try {
      const {data} = await app.get("/api/employee/signout/");

      console.log(data);
      dispatch(removeEmployee());
    } catch (error) {
      dispatch(isError(error.response.data.message));
    }
  };
