import React from 'react'
import SideBar from '@/components/projectComponents/SideBar'

const linksData = [
    {label: "Employees List", path: "/employees/emplist"},
    {label: "Tasks", path: "/employees/tasks"},
    {label: "Leave Requests", path: "/employees/leave"},
    {label: "Attendance", path: "/employees/attendance"},
  ];
export default function Eventslayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex w-screen items-center justify-center  gap-10'>
          {/* <SideBar links={linksData} /> */}
      {children}
    </div>
  )
}
