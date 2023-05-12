import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export const Layout: React.FC = () => {
  const location = useLocation()
  return (
    <div className=" min-h-screen min-w-screen bg-slate-950">
      {location.pathname === "/" && <Navbar />}
      <div>
        <Outlet />
      </div>
    </div>
  )
}
