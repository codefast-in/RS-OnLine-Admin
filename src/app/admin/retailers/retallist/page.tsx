import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
const empPr = require("@/assets/img/profilepic1.jpg");

function page() {
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-xl">Rretailers</CardTitle>
      </CardHeader>
      <Card>
        <CardContent className="flex items-center justify-around gap-10 p-6 min-w-fit">
          <Image
            src={empPr}
            alt="employee name"
            width={1000}
            height={1000}
            className="rounded-full w-28 h-28"
          />
          <div className=" min-w-fit overflow-clip">
            <div className="flex justify-start items-center gap-2 ">
              <span className="font-semibold text-lg  min-w-[30%]">Name :</span>
              <span> Sachin Pawar</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">
                Email :
              </span>
              <Link href="mailto:sachinspindofficial@gmail.com">
                sachinspindofficial@gmail.com
              </Link>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">
                Mobile :
              </span>
              <Link href="tel:9516905325">9516905325</Link>
            </div>
          </div>
          <div  className=" min-w-fit">
            <div className="flex justify-start items-center gap-2 ">
              <span className="font-semibold text-lg  min-w-[30%]">Firm Name :</span>
              <span>Team Lead</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">
                Status :
              </span>
              <span className="text-green-500">Active</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">
                Login @ :
              </span>
              <span>10:24 AM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
