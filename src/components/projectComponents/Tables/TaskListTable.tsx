"use client";

import * as React from "react";
const dayjs = require("dayjs");
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

import AddTaskForm from "../Forms/addTaskForm";
import app from "@/utils/axios";
let count = 0;

// const data: Tasks[] = [
//   {
//     description: "task des",
//     employee: {
//       avatar: {
//         url: "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
//       },
//       name: "sachin",
//       _id: "65e816e31c2ce675279dfc5f",
//     },
//     enddate: "2024-03-23",
//     startdate: "2024-03-22",
//     status: "success",
//     title: "task 1",
//     _id: "65fbd3f6b8e97748f855562d",
//   },
// ];

export type Tasks = {
  _id: string;
  title: string;
  status: "pending" | "success";
  description: string;
  employee: {
    avatar: {url: string};
    name: string;
    _id: string;
  };
  enddate: string;
  startdate: string;
};

export const columns: ColumnDef<Tasks>[] = [
  {
    id: "select",
    header: "No.",
    cell: ({row}) => {
     
      return <div>{row.index+1}</div>;
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
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => <div className="capitalize">{row.getValue("title")}</div>,
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
    cell: ({row}: any) => {
      // console.log(row.getValue("employee").name);
      return <div className="capitalize">{row.getValue("employee").name}</div>;
    },
  },

  {
    accessorKey: "startdate",
    header: "Start Date",
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("startdate")}</div>
    ),
  },

  {
    accessorKey: "enddate",
    header: ({column}) => {
      return (
        <Button
          variant="tableHead"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          End Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="capitalize">{row.getValue("enddate")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <div
        className={`capitalize ${
          row.getValue("status") == ("pending" || "failed")
            ? "text-red-500"
            : "text-green-500"
        } `}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const Tasks = row.original;

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
              onClick={() => navigator.clipboard.writeText(Tasks._id)}>
              Copy Tasks ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View Employee</DropdownMenuItem> */}
            <DropdownMenuItem>View Tasks details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TaskListTable({taskData, employeesData}: any) {
  let {tasks} = taskData;
  let data = tasks;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log(data);

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
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-5">
          <AddTaskForm employessData={employeesData} />
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
          <ScrollArea className="h-[350px] border-0 p-4 mr-10 py-5 w-full ">
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
              {tasks && table.getRowModel().rows?.length ? (
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
        <div className="flex-1 text-sm text-muted-foreground">
          {tasks && table.getFilteredSelectedRowModel().rows.length} of{" "}
          {tasks && table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={tasks && !table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={tasks && !table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
