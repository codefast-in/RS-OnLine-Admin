"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
const dayjs = require("dayjs");
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
import AddIncomeForm from "../Forms/addIncomeForm";
import EditIncomeForm from "../Forms/editIncomeForm";



export type Income = {
  _id: string;
  mrp: number;
  status: "paid" | "pending";
  addtime: string;
  employee: string;
 
  rsprice: number;
  title: string;
};

export const columns: ColumnDef<Income>[] = [
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
    accessorKey: "title",
    header: ({column}) => {
      return (
        <Button
          variant="tableHead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "employee",
    header: ({column}) => {
      
      return (
        <Button
          variant="tableHead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
         Employee
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}:any) => (
      <div className="capitalize">{row.getValue("employee").name}</div>
    ),
  },

 
  {
    accessorKey: "mrp",
    header: ({column}) => {
      return (
        <Button
          variant="tableHead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          M.R.P.
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const rsPrice = parseFloat(row.getValue("mrp"));

      // Format the rsPrice as a dollar rsPrice
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(rsPrice);

      return <div className="text-start font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "rsprice",
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
      const rsPrice = parseFloat(row.getValue("rsprice"));

      // Format the rsPrice as a dollar rsPrice
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(rsPrice);

      return <div className="text-start font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "addtime",
    header: "Date",
    cell: ({row}) => <div className="capitalize">{ dayjs(row.getValue("addtime")).format("DD,MMM YY")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => <div className={`capitalize ${
      row.getValue("status") == ("pending" || "failed")
        ? "text-red-500"
        : "text-green-500"
    } `}>{row.getValue("status")}</div>,
  },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({row}) => {
//       const income = row.original;

//       return (
        
//         <EditIncomeForm
//         title={income.title}
//         mrp={income.mrp}
//         rsprice={income.rsprice}
//         status={income.status}
//         id={income._id}        
//         // customercontact={income.contact}
//         // setfirst={setfirst}
//       />
//       );
//     },
//   },
];

export function OfflineOrdersTable({tableData}: any) {
  console.log(tableData);
  const data = tableData;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
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
      <div className="flex items-center py-4 gap-5">
        <Input
          placeholder="Search Name..."
          value={
            (table.getColumn("title")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-5">
          {/* <AddIncomeForm /> */}
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
          <ScrollArea className="h-[350px] border-0 p-4 py-5 w-full z-0 ">
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
