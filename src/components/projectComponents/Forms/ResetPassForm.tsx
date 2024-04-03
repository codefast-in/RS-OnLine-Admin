import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/components/ui/use-toast";
import app from "@/utils/axios";

import React, {useEffect, useState} from "react";

function ResetPassForm({user}:any) {
    
  const Toast = useToast();
  const [Email, setEmail] = useState("");
  const [OTPSENT, setOTPSENT] = useState(false);

  const [resetData, setresetData] = useState({
    email: Email,
    otp: "",
    password: "",
  });
  //   console.log(Email);
  const sendOTP = async () => {
    try {
      const data = {email: Email};
      const response = await app.post(`/api/${user}/send-mail`, data);
      setOTPSENT(true);
      console.log("object");
      console.log(response.data);
      Toast.toast({
        title: response.data.message,
        variant: "success",
      });
    } catch (error: any) {
      console.log(error);
      Toast.toast({
        title: error.data.message,
        variant: "destructive",
      });
      setOTPSENT(false);
    }
  };

  const resetPassword = async () => {
    try {
      console.log(resetData);
      const response = await app.post(
        `/api/${user}/forgot-password`,
        resetData
      );
      console.log("object");
      console.log(response.data);
      Toast.toast({
        title: response.data.message,
        variant: "success",
      });
      setOTPSENT(false);
    } catch (error: any) {
      console.log(error);
      Toast.toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-primary">Forgot Password ?</DialogTrigger>
      {!OTPSENT ? (
        <DialogContent className="sm:max-w-[425px] text-left">
          <DialogHeader className="text-left">
            <DialogTitle>Enter Your Email</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Registerd Email</Label>
              <Input
                id="name"
                placeholder="example@email"
                className="col-span-3"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setresetData({...resetData, email: e.target.value});
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={sendOTP}>Send OTP</Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px] text-left">
          <DialogHeader className="text-left">
            <DialogTitle>Create New Password</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Registerd Email</Label>
              <Input
                id="name"
                placeholder="example@email"
                className="col-span-3"
                value={Email}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Enter OTP</Label>
              <Input
                id="name"
                placeholder="****"
                className="col-span-3"
                onChange={(e) =>
                  setresetData({...resetData, otp: e.target.value})
                }
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">New Password</Label>
              <Input
                id="name"
                placeholder="password"
                className="col-span-3"
                onChange={(e) =>
                  setresetData({...resetData, password: e.target.value})
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={resetPassword}>Reset Password</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ResetPassForm;
