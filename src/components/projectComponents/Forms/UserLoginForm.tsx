import React, {useState} from "react";
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
import Link from "next/link";
import SwichMode from "@/components/swichMode";
import {Button} from "@/components/ui/button";
import {useDispatch} from "react-redux";
import {asyncLoginEmployee,asynceCurrentEmployee} from "@/redux configs/Actions/employeeAction";
import {addWeeks} from "date-fns";
import { removeEmployee } from "@/redux configs/Reducers/employeeReducer";

function UserLoginForm() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const changType = () => {
    setVisible(!visible);
  };
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const logout = async (e: any) => {
    e.preventDefault();    
    try {
      // const responce = dispatch(removeEmployee());
      // console.log(responce);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;
    try {
      const responce = dispatch(asyncLoginEmployee(info));
     
      // console.log(responce);
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/user" onClick={sendData}>
            Login
          </Link>
        </Button>
        <Button className="w-full" asChild>
          <Link href="/user" onClick={logout}>
          Logout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserLoginForm;
