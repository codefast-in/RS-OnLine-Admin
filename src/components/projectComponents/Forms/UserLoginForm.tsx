"use client";

import React, {useEffect, useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {useDispatch, useSelector} from "react-redux";
import {
  asyncLoginEmployee,
  asynceCurrentEmployee,
} from "@/redux configs/Actions/employeeAction";

import {useRouter} from "next/navigation";
import {EmployeeState} from "@/redux configs/Reducers/employeeReducer";
import {useToast} from "@/components/ui/use-toast";
import ResetPassForm from "./ResetPassForm";

import axios from "axios";
import {latlonToURL} from "@/utils/geoLocationUrl";
import { useFormState } from "react-dom";

function UserLoginForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
const[locationAcc,setLocationAcc] = useState(true)
  const [visible, setVisible] = useState(false);
  const changType = () => {
    setVisible(!visible);
  };
  const [data, setData] = React.useState({
    email: "",
    password: "",
    locationurl:''
  });

  const {isLogin, errors} = useSelector((state: EmployeeState) => {
    return state.employee;
  });

  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;

    try {
      dispatch(asyncLoginEmployee(info));
    } catch (error: any) {
      console.log(error);

      toast.toast({
        title: "Invalid Email/Password",
      });
    }
  };

  // console.log(state.employee.isLogin);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (postion) => {
          setLocationAcc(false)
          const {latitude, longitude} = postion.coords;

          let mapurl = latlonToURL(latitude, longitude);
          console.log(mapurl);
          setData({...data,locationurl:mapurl})
        },
        (error: any) => console.log(error.message)
      );
    }

    !isLogin ? router.push("/") : router.push("/user");

    errors.length != 1
      ? toast.toast({
          variant: "destructive",
          title: errors[errors.length - 1],
        })
      : "";
  }, [isLogin, errors]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Wellcome To <br />
          RS Online Services
        </CardTitle>
        <CardDescription>
          Enter Your employee id then enter your password then login with your
          profile.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Employee Id</Label>
          <Input
            id="name"
            placeholder="example@mail.com"
            onChange={(e) => setData({...data, email: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Password</Label>
          <div className="relative w-full">
            <Input
              id="username"
              type={visible ? "text" : "password"}
              placeholder="Your PassWord"
              className="pr-12 pl-4"
              onChange={(e) => setData({...data, password: e.target.value})}
            />
            {visible ? (
              <EyeOpenIcon
                onClick={changType}
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500  right-3"
              />
            ) : (
              <EyeClosedIcon
                onClick={changType}
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500  right-3"
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="felx flex-col gap-5">
        <Button className="w-full" onClick={sendData} disabled={locationAcc}>
          Login
        </Button>
        <ResetPassForm user="employee" />
      </CardFooter>
    </Card>
  );
}

export default UserLoginForm;
