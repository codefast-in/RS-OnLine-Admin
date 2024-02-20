import React,{useState} from "react";
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



function UserLoginForm() {
  const [visible, setVisible] = useState(false);

  const changType = () => {
    setVisible(!visible);
  };
  return (
    <Card>
    <CardHeader>
      <CardTitle className="text-xl">
        Wellcome To <br />
        RS Online Services
      </CardTitle>
      <CardDescription>
        Enter Your employee id then enter your password then login
        with your profile.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Employee Id</Label>
        <Input id="name" placeholder="example@mail.com" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="username">Password</Label>
        <div className="relative w-full">
          <Input
            id="username"
            type={visible ? "text" : "password"}
            placeholder="Your PassWord"
            className="pr-12 pl-4"
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
        <div>
          <Link href="/user">Login</Link>
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </div>
      </Button>
    </CardFooter>
  </Card>
  );
}

export default UserLoginForm;
