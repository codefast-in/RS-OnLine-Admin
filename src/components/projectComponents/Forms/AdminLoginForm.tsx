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
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeNoneIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import SwichMode from "@/components/swichMode";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {AdminState} from "@/redux configs/Reducers/adminReducer";
import {asyncLoginAdmin} from "@/redux configs/Actions/adminActions";
import ResetPassForm from "./ResetPassForm";

function AdminLoginForm() {
  const [visible, setVisible] = useState(false);
  const changType = () => {
    setVisible(!visible);
  };

  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const {isLogin, errors} = useSelector((state: AdminState) => {
    return state.admin;
  });

  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;

    try {
      dispatch(asyncLoginAdmin(info));
    } catch (error: any) {
      console.log(error);

      toast.toast({
        variant:'destructive',
        title:error.message,
      });
    }
  };



  useEffect(() => {
    !isLogin ? router.push("/") : router.push("/admin/");

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
        <CardTitle className="text-xl">Wellcome Again...</CardTitle>
        <CardDescription>
          Enter Your user id or email then enter your password then login with
          your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">User id /Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@mail.com"
            onChange={(e) => setData({...data, email: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <Input
              id="password"
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
        <Button className="w-full" onClick={sendData}>
          Login
        </Button>
        <ResetPassForm user="admin" />
      </CardFooter>
    </Card>
  );
}

export default AdminLoginForm;
