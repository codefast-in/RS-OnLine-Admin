import React from 'react'
import SideBar from '@/components/projectComponents/SideBar'

const linksData = [
    {label: "Employees", path: "/admin/employees"},
    {label: "Tasks", path: "/admin/employees/tasks"},
    {label: "Leave Requests", path: "/admin/employees/leave"},

  ];
export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex w-screen items-start justify- gap-10'>
          <SideBar links={linksData} />
      {children}
    </div>
  )
}
