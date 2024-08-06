import app from "@/utils/axios";

import { addAdmin,removeAdmin,isError,removeError } from "../Reducers/adminReducer";


export const asyncAddAdmin:any =
  (admin: {}) => async (dispatch: any, getState: any) => {
    try {
      const {data} = await app.post("/api/admin/signup/", admin);
      // console.log(data);
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(isError(error.response.data.message));
    }
  };

export const asynceCurrentAdmin:any =
  () => async (dispatch: any, getState: any) => {
    try {
      const data = await app.post("/api/admin/current/");
      // console.log(data);
      dispatch(addAdmin(data.data));
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

export const asyncLoginAdmin: any =
  (loginData: {}) => async (dispatch: any, getState: any) => {
    try {
      const {data} = await app.post("/api/admin/signin/", loginData);
console.log(data)
      dispatch(asynceCurrentAdmin());
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

export const asyncLogoutAdmin:any =
  () => async (dispatch: any, getState: any) => {
    try {
      const {data} = await app.get("/api/admin/signout/");

      console.log(data);
      dispatch(removeAdmin());
      dispatch(removeError());
    } catch (error: any) {
      dispatch(isError(error.response.data.message));
    }
  };
