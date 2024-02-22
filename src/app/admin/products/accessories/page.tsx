
import ProductsTable from "@/components/projectComponents/Tables/ProductsTable";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";

export default function page() {
  return (
    <div className="mr-10 py-5 w-[80%] h-full  ">

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Accessorie's</CardTitle>
        </CardHeader>
        <CardContent>
            <ProductsTable/>
        </CardContent>
      </Card>
    </div>
  );
}
