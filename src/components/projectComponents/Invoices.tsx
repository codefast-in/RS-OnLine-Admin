import {usePDF, Margin, Resolution} from "react-to-pdf";

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
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import Image from "next/image";
import dayjs from "dayjs";
import {convertAmountToWords} from "@/utils/amountToWard";
import {ScrollArea} from "../ui/scroll-area";

const logo = require("@/assets/img/lightlogo.png");

const formatted = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
};

function Invoice({data}: any) {
  // console.log(data);
  const {toPDF, targetRef} = usePDF({
    filename: `RS-Online${data.invoicenumber}.pdf`,
    page: {
      margin: Margin.MEDIUM,
    },
    method: "open",
  });
  const [disAmount, setdisAmount] = useState(0);
  const dis = (data: any) =>
    data.products.map((itme: any) =>
      setdisAmount(disAmount + itme.quantity * itme.mrp)
    );

  useEffect(() => {
    dis(data);
  }, [data]);

  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button variant="ghost" className="w-full">
            View Invoices
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-screen md:w-[70vw]">
          <ScrollArea className="sm:h-[70vh] h-full pt-5">
            <div ref={targetRef}>
              <div className="flex justify-between items-center px-3 w-full ">
                <div className="w-1/2 h-full ">
                  <Image
                    src={logo}
                    alt="RS"
                    width={500}
                    height={500}
                    className="h-full w-1/6 "
                  />
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold mb-10 w-full">
                    RS Online Services
                  </span>

                  <p className="text-xs py-2">
                    In front of krishi vikash Adhikari karyalay
                    <br />
                    bhopal sagar road gairatganj
                    <br />
                    State: 23-Madhya Pradesh
                    <br />
                    Phone no.: 7869814684
                    <br /> Email: rsagriculture11@gmail.com
                  </p>
                </div>
              </div>

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
                    {data.offlinecustomer.name}
                    <br />
                    {data.offlinecustomer.contact}
                  </TableCell>
                  <TableCell colSpan={2} className="capitalize">
                    {dayjs(data.addtime).format("DD MMM,YY")}
                    <br />
                    {data.invoicenumber}
                  </TableCell>

                  <TableCell colSpan={2} className="capitalize">{data.status}</TableCell>
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
                  {data &&
                    data.products.map((invoice: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium border-r-2">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium border-r-2">
                          {invoice.title}
                        </TableCell>
                        <TableCell className="font-medium border-r-2">
                          {invoice.quantity}
                        </TableCell>
                        <TableCell className="font-medium border-r-2">
                          {formatted(invoice.mrp)}
                        </TableCell>
                        <TableCell className="font-medium border-r-2">
                          {formatted(invoice.rsprice)}
                        </TableCell>

                        <TableCell>
                          {formatted(
                            parseInt(invoice.quantity) * parseInt(invoice.mrp)
                          )}
                        </TableCell>
                      </TableRow>
                    ))}

                  <TableRow className="border-b-blue-400">
                    <TableHead colSpan={6}>Amounts</TableHead>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={1}>Discount</TableCell>
                    <TableCell colSpan={2}>
                      {formatted(disAmount - data.totalAmount)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>Total</TableCell>
                    <TableCell colSpan={1}>
                      {formatted(data.totalAmount)}/-
                    </TableCell>
                    <TableCell colSpan={1}>In Words</TableCell>
                    <TableCell colSpan={3} className="capitalize">
                      {convertAmountToWords(data.totalAmount)} only
                    </TableCell>
                  </TableRow>

                  <TableRow className="border-b-blue-400">
                    <TableHead colSpan={3}>Bank Details</TableHead>
                    <TableHead colSpan={2}>Turms & Conditions</TableHead>
                    <TableHead colSpan={1}>Signature</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>
                      <div className="w-1/2 h-1/2 ">
                        <Image
                          src={logo}
                          alt="RS"
                          width={300}
                          height={300}
                          className=" "
                        />
                      </div>
                    </TableCell>
                    <TableCell colSpan={2}>
                      Name: Central Bank Of India,
                      <br />
                      Kishanpura (chandpur)
                      <br />
                      Account No.: 3846696195
                      <br />
                      IFSC code: CBIN0282910
                      <br />
                      Account Holder's Name: RS
                      <br />
                      AGRICULTURE PRO SUPYAR SINGH MEENA
                    </TableCell>
                    <TableCell colSpan={2}>
                      Thank you for doing business with us.
                    </TableCell>
                    <TableCell className="capitalize">
                      {data.employee.name}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter></TableFooter>
              </table>
            </div>
          </ScrollArea>

          <Button onClick={() => toPDF()}>Download Invoice PDF</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Invoice;
