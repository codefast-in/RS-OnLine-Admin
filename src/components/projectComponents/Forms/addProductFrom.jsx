"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {CalendarIcon, PlusIcon} from "@radix-ui/react-icons";

import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {format} from "date-fns";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export default function AddProductForm() {
  const [date, setDate] = React.useState();
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="ml-auto">
          Add New Product <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80dvh] w-full rounded-md border p-4">
          <DialogDescription>
            <form action="#" className="mt-5">
              <div className="mb-5 flex flex-col">
                <Label>Category</Label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphones" className="capitalize">
                      smartphones
                    </SelectItem>
                    <SelectItem value="laptop" className="capitalize">
                      laptop
                    </SelectItem>
                    <SelectItem value="groceries" className="capitalize">
                      groceries
                    </SelectItem>
                    <SelectItem value="home-decoration" className="capitalize">
                      home-decoration
                    </SelectItem>
                    <SelectItem value="automotive" className="capitalize">
                      automotive
                    </SelectItem>
                    <SelectItem value="lighting" className="capitalize">
                      lighting
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-5">
                <Label>Title</Label>
                <Input placeholder="Product Title" required />
              </div>
              <div className="mb-5">
                <Label>Description</Label>
                <Input placeholder="Product description" required />
              </div>
              <div className="mb-5">
                <Label>Price</Label>
                <Input placeholder="Product Price" required />
              </div>
              <div className="mb-5">
                <Label>Discount Percentage</Label>
                <Input placeholder="Discount" required />
              </div>
              <div className="mb-5">
                <Label>Stock Quantity </Label>
                <Input placeholder="Quantity" required />
              </div>
              <div className="mb-5">
                <Label>Brand </Label>
                <Input placeholder="Brand Name" required />
              </div>
              <div className="mb-5">
                <Label>Thumbnail </Label>
                <Input type="file" placeholder="Image" required />
              </div>
              <div className="mb-5">
                <Label>Product Images </Label>
                <Input type="file" placeholder="Image" multiple required />
              </div>
              <div className="mb-5">
                <Label>On Sell</Label>
                <RadioGroup defaultValue="none" className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-5">
                <Button variant="destructive" className="w-full">
                  Cancel
                </Button>
                <Button variant="default" className="w-full">
                  Add
                </Button>
              </div>
            </form>
          </DialogDescription>
        </ScrollArea>
        
      </DialogContent>
    </Dialog>
  );
}
