import React from 'react'
import SideBar from '@/components/projectComponents/SideBar'

const linksData = [
    {label: "Retailer List", path: "/admin/retailers/retallist"},
    
  ];
export default function Retailerslayout({
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
