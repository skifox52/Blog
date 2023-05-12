import React from "react"
import { Link } from "react-router-dom"

export const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-slate-950 shadow-md relative z-50 text-gray-100 shadow-indigo-800">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl font-extrabold tracking-tighter"
        >
          BLOG
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className=" from-control mx-4 relative  after:absolute after:h-[1px] after:w-0 after:bottom-0 after:bg-white after:left-0 hover:after:w-full after:transition-all duration-300 ">
          <Link to={"/profile"}>Profile</Link>
        </div>
        <div className=" from-control mx-4">
          <button className=" bg-black border border-gray-800 px-4 py-2 rounded-lg shadow-md shadow-indigo-800 hover:shadow-none hover:translate-y-[1px]">
            Logout
          </button>
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search..."
            className="input  input-bordered border-gray-800 bg-transparent"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
