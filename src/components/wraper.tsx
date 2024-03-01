"use client";
import React from "react";
import {store} from "@/redux configs/store";
import {Provider} from "react-redux";
const Wraper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default Wraper;
