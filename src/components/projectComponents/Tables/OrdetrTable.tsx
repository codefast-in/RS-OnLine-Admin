"use client";

import * as React from "react";
const dayjs = require("dayjs");
import axios from "axios";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {ScrollArea} from "@/components/ui/scroll-area";

import AddEmpForm from "../Forms/addEmpForm";
import Link from "next/link";
import Image from "next/image";
import AddProductForm from "../Forms/addProductFrom";

const data: Orders[] = [
  {
    orderId: 15255,
    orderAt: dayjs().format("DD MMM,YYYY"),
    totleItem: 10,
    status: "delivered",
    customerName: "Sachin Pawar",
    amount: 3025,
    orderType: "COD",
  },
  {
    orderId: 15254,
    orderAt: dayjs().format("DD MMM,YYYY"),
    totleItem: 10,
    status: "pending",
    customerName: "Vicky Pawar",
    amount: 3025,
    orderType: "Pre Paid",
  },
  {
    orderId: 15253,
    orderAt: dayjs().format("DD MMM,YYYY"),
    totleItem: 10,
    status: "cancelled",
    customerName: "Aman Pawar",
    amount: 3025,
    orderType: "COD",
  },
  {
    orderId: 15252,
    orderAt: dayjs().format("DD MMM,YYYY"),
    totleItem: 10,
    status: "delivered",
    customerName: "Kapil Pawar",
    amount: 3025,
    orderType: "Pre Paid",
  },
  {
    orderId: 15251,
    orderAt: dayjs().format("DD MMM,YYYY"),
    totleItem: 10,
    status: "pending",
    customerName: "Meena Pawar",
    amount: 3025,
    orderType: "COD",
  },
];

export type Orders = {
  orderId: number;
  orderAt: Date;
  totleItem: number;
  status: "delivered" | "pending" | "cancelled";
  customerName: string;
  amount: number;
  orderType: "COD" | "Pre Paid";
};

export const columns: ColumnDef<Orders, any>[] = [
  {
    id: "select",
    header: "No.",
    cell: ({row}) => {
     
      return <div>{row.index +1}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "orderId",
    header: "Order Id",
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("orderId")}</div>
    ),
  },

  {
    accessorKey: "customerName",
    header: ({column}) => {
      return (
        <Button
          variant="tableHead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Customer Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "orderAt",
    header: ({column}) => {
      return (
        <Button
          variant="tableHead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("orderAt")}</div>
    ),
  },

  {
    accessorKey: "totleItem",
    header: ({column}) => {
      return (
        <Button
          variant="tableHead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Totle Item
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("totleItem")}</div>
    ),
  },

  {
    accessorKey: "amount",
    header: ({column}) => {
      return (
        <Button
          variant="tableHead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-start font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "orderType",
    header: "Type",
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("orderType")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => <div className="capitalize">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const Orders = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(Orders.orderId.toString())
              }>
              Copy Orders ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View Employee</DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <Link href={`/admin/orders/${Orders.orderId}`}>
                View Orders details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function OrdersTable() {
  // const [data, setOrders] = React.useState([]);

  // React.useEffect(() => {
  //   (async () => {
  //     const response = await axios.get(
  //         'https://dummyjson.com/products'
  //     );
  //     setOrders(response.data.products);
  //   })();

  // }, []);

  const [searcBy, setSearcBy] = React.useState<string>("customerName");

  {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    });

    return (
      <div className="w-full ">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search Name..."
            value={(table.getColumn(searcBy)?.getFilterValue() as string) ?? ""}
            onChange={(event: any) =>
              table.getColumn(searcBy)?.setFilterValue(event.target.value)
            }
            className="max-w-sm mr-5"
          />

          <div className="ml-auto flex gap-5">
            {/* <AddProductForm /> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <ScrollArea className="h-[350px] border-0 p-4  py-5 w-full ">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </ScrollArea>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          {/* <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div> */}
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default OrdersTable;
