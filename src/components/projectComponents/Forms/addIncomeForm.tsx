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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {PlusIcon} from "@radix-ui/react-icons";

import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";

import {addDays, format} from "date-fns";
import {DateRange} from "react-day-picker";

import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import app from "@/utils/axios";
import {useToast} from "@/components/ui/use-toast";

export type Product = {
  title: string;
  mrp: string;
  rsprice: string;
  quantity: string;
};

export default function AddIncomeForm({first, setfirst}: any) {
  const Toast = useToast();
  const [totalAmount, settotalAmount] = useState(0);
  const [productArr, setProductArr] = useState<Product[]>([]);

  const [data, setData] = React.useState({
    products: productArr,
    status: "",
    contact: "",
  });
  const [product, setProduct] = useState({
    title: "",
    mrp: "",
    rsprice: "",
    quantity: "",
  });
  const addProduct = () => {
    // console.log(product);
    if (
      product.mrp.length == 0 ||
      product.quantity.length == 0 ||
      product.rsprice.length == 0 ||
      product.title.length == 0
    ) {
      Toast.toast({
        title: "All Feild Required",
        variant: "destructive",
      });

      return 0;
    }
    setProductArr([...productArr, product]);
    productArr.map((item) =>
      settotalAmount(
        totalAmount + parseInt(item.rsprice) * parseInt(item.quantity)
      )
    );
    setProduct({
      title: "",
      mrp: "",
      rsprice: "",
      quantity: "",
    });
  };
  // console.log(totalAmount);

  // console.log(productArr);
  const sendData = async (e: any) => {
    e.preventDefault();
    data.products = productArr;
    const info = data;
    if (data.contact.length == 0 || data.status.length == 0) {
      Toast.toast({
        title: "Enter Full Details",
        variant: "destructive",
      });
      return 0;
    }
    try {
      console.log(info);
      const responce = await app.post("/api/employee/addincome/", info);
      console.log(responce.data);
      Toast.toast({
        variant: "success",
        title: "Income Added Successfully",
      });
      setfirst(first + 1);
    } catch (error: any) {
      console.log(error);
      Toast.toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    }
      setProductArr([]);
      setData({
        products: productArr,
        status: "",
        contact: "",
      });
      console.log(data, productArr);
  };

  useEffect(() => {}, [productArr]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">
          Add Income <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen md:w-[80vw] md:ml-20">
        <Table>
          <TableCaption>Add new invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>NO.</TableHead>
              <TableHead>Product/Service</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>MRP</TableHead>
              <TableHead>RS Price</TableHead>

              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productArr &&
              productArr.map((invoice: any, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{invoice.title}</TableCell>
                  <TableCell>{invoice.quantity}</TableCell>
                  <TableCell>{invoice.mrp}</TableCell>
                  <TableCell>{invoice.rsprice}</TableCell>

                  <TableCell>
                    {parseInt(invoice.quantity) * parseInt(invoice.rsprice)}
                  </TableCell>
                </TableRow>
              ))}

            <TableRow>
              <TableCell className="font-medium">New Item</TableCell>

              <TableCell>
                <Input
                  placeholder="Name"
                  value={product.title}
                  onChange={(e) =>
                    setProduct({...product, title: e.target.value})
                  }
                  required={true}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="00.0"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({...product, quantity: e.target.value})
                  }
                  required
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="00.0"
                  value={product.mrp}
                  onChange={(e) =>
                    setProduct({...product, mrp: e.target.value})
                  }
                  required
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="00.0"
                  value={product.rsprice}
                  onChange={(e) =>
                    setProduct({...product, rsprice: e.target.value})
                  }
                  required
                />
              </TableCell>

              <TableCell className="text-right">
                <Button type="submit" onClick={addProduct}>
                  <PlusIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell className="text-right">{totalAmount}</TableCell>
              <TableCell className="text-right">Customer Mobile No.</TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="Mobile No."
                  onChange={(e) => setData({...data, contact: e.target.value})}
                  required
                />
              </TableCell>
              <TableCell>
                <Select
                  onValueChange={(e) => setData({...data, status: e})}
                  required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <Button
                  variant="default"
                  type="submit"
                  onClick={(e) => sendData(e)}
                  className="w-full">
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </PopoverContent>
    </Popover>
  );
}

{
  /* <form onSubmit={sendData} className="mt-5">
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Product Name</Label>
                <Input
                  placeholder="Name"
                  onChange={(e) => setData({...data, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Status</Label>

                <Select
                  onValueChange={(e) => setData({...data, status: e})}
                  required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>MRP</Label>
                <Input
                  type="number"
                  placeholder="00.0"
                  onChange={(e) => setData({...data, mrp: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>RS Price</Label>
                <Input
                  type="number"
                  placeholder="00.0"
                  onChange={(e) => setData({...data, rsprice: e.target.value})}
                  required
                />
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Customer Mobile No.</Label>
                <Input
                  type="number"
                  placeholder="Mobile No."
                  onChange={(e) => setData({...data, contact: e.target.value})}
                  required
                />
              </div>

              <div className="flex gap-3">
                <DialogClose asChild>
                  <Button variant="destructive" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                
              </div>
            </form> */
}
