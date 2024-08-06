"use client";

import React, {useEffect, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {CheckIcon, Pencil1Icon} from "@radix-ui/react-icons";

import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";

import {Button} from "@/components/ui/button";

import app from "@/utils/axios";
import {useToast} from "@/components/ui/use-toast";
import Image from "next/image";
import {convertAmountToWords} from "@/utils/amountToWard";
import {formatted} from "@/utils/formatted";
import dayjs from "dayjs";
import {set} from "date-fns";
const logo = require("@/assets/img/lightlogo.png");
export default function EditIncomeForm(parms: any) {
  const {invoice, setfirst, first} = parms;
  // console.log(invoice)

  const [invoiceData, setInvoiceData] = useState<any>(invoice);

  

  const setArr = (productId: any, newQuantity: number) => {
    const updatedProducts = invoiceData.products.map((product: any) => {
      console.log("yaha");
      if (product._id === productId) {
        return {...product, quantity: newQuantity};
      }
      return product;
    });

    setInvoiceData((invoiceData: any) => ({
      ...invoiceData,
      products: updatedProducts,
    }));

    // Create new array with _id and new quantity
    const updatedQuantities = updatedProducts.map((product: any) => ({
      _id: product._id,
      quantity: product.quantity,
    }));

    console.log("Updated quantities:", updatedQuantities);
    setData({...data, productsids:updatedProducts})
  };

  const Toast = useToast();

  const [data, setData] = React.useState({
    productsids: [],
    status: invoice.status,
  });

  const [disAmount, setdisAmount] = useState(0);

  const dis = (data: any) =>
    data.products.map((itme: any) =>
      setdisAmount(disAmount + itme.quantity * itme.mrp)
    );

  const sendData = async (e: any) => {
    e.preventDefault();

    try {
      const info = data;
      console.log(info);
      const responce = await app.post(
        `/api/employee/updateincome/${invoice._id}`,
        info
      );
      console.log(responce);
      Toast.toast({
        variant: "success",
        title: "Income Edited Successfully",
      });
      setfirst(first + 1);
    } catch (error: any) {
      Toast.toast({
        variant: "destructive",
        title: error.message,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    dis(invoice);
  }, [invoice]);
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button variant="ghost" className="w-full">
          Update Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen md:w-[80vw]">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
          <div>
            {/* <TableCaption>Add new invoices.</TableCaption> */}
            <table className="w-full px-3">
              <TableHeader>
                <TableRow className="border-b-blue-400">
                  <TableHead colSpan={2}>Bill To</TableHead>
                  <TableHead colSpan={2}>Invocie Details</TableHead>
                  <TableHead colSpan={2}>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableRow>
                <TableCell colSpan={2} className="capitalize">
                  {invoice.offlinecustomer.name}
                  <br />
                  {invoice.offlinecustomer.contact}
                </TableCell>
                <TableCell colSpan={2} className="capitalize">
                  {dayjs(invoice.addtime).format("DD MMM,YY")}
                  <br />
                  {invoice.invoicenumber}
                </TableCell>
                <TableCell colSpan={2}>
                <Select
                  onValueChange={(e) => setData({...data, status: e})}
                  required 
                  defaultValue={invoice.status}
                  >
                  <SelectTrigger className="w-full" >
                    <SelectValue   />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
                </TableCell>
              </TableRow>
              <TableHeader>
                <TableRow className="border-b-blue-400">
                  <TableHead>NO.</TableHead>
                  <TableHead>Product/Service</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>MRP</TableHead>
                  <TableHead>RS Price/Unit</TableHead>

                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice &&
                  invoice.products.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium border-r-2">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium border-r-2">
                        {item.title}
                      </TableCell>
                      <TableCell className="font-medium border-r-2">
                        <Input
                          type="number"
                          placeholder={item.quantity}
                          onChange={(e) => {
                            // setProduct({
                            //   id: ,
                            //   quantity: ,
                            // });
                            setArr(item._id, parseInt(e.target.value));
                            // setCanEdit(e.target.value)
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium border-r-2">
                        {formatted(item.mrp)}
                      </TableCell>
                      <TableCell className="font-medium border-r-2">
                        {formatted(item.rsprice)}
                      </TableCell>

                      <TableCell>
                        {formatted(
                          parseInt(item.quantity) * parseInt(item.mrp)
                        )}
                      </TableCell>
                      {/* <TableCell>
                        <Button onClick={()=>setArr(item._id,parseInt(canEdit))} size={"icon"}>
                          <CheckIcon />
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}

                <TableRow className="border-b-blue-400">
                  <TableHead colSpan={6}>Amounts</TableHead>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={1}>Discount</TableCell>
                  <TableCell colSpan={2}>
                    {formatted(disAmount - invoice.totalAmount)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell colSpan={1}>
                    {formatted(invoice.totalAmount)}/-
                  </TableCell>
                  <TableCell colSpan={1}>In Words</TableCell>
                  <TableCell colSpan={3} className="capitalize">
                    {convertAmountToWords(invoice.totalAmount)} only
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </div>
          <Button onClick={(e) => sendData(e)}>Save Changes</Button>
          {/* <DialogDescription>
            <form onSubmit={sendData} className="mt-5">
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Product Name</Label>
                <Input
                  placeholder={title}
                  onChange={(e) => setData({...invoice, title: e.target.value})}
                  contentEditable={true}
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Status</Label>

                <Select
                  defaultValue={status}
                  onValueChange={(e) => setData({...invoice, status: e})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="return">Return</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>MRP</Label>
                <Input
                  type="number"
                  placeholder={mrp}
                  onChange={(e) => setData({...invoice, mrp: e.target.value})}
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>RS Price</Label>
                <Input
                  type="number"
                  placeholder={rsprice}
                  onChange={(e) => setData({...invoice, rsprice: e.target.value})}
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Customer Name</Label>
                <Input
                  type="text"
                  placeholder="00.0"
                  onChange={(e) =>
                    setData({...invoice, customername: e.target.value})
                  }
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Customer Mobile No.</Label>
                <Input
                  type="number"
                  placeholder="00.0"
                  onChange={(e) =>
                    setData({...invoice, customercontact: e.target.value})
                  }
                  required
                />
              </div>

              <div className="flex gap-3">
                <DialogClose asChild>
                  <Button variant="destructive" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="default" type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </form>
          </DialogDescription> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
