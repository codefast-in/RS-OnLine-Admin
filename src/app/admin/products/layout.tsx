import React from 'react'
import SideBar from '@/components/projectComponents/SideBar'

const linksData = [
    {label: "Electronics", path: "/admin/products/electronics"},
    {label: "Accessories", path: "/admin/products/accessories"}, 

  ];
export default function Productlayout({
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
