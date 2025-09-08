import {} from 'react'
import logo from '../assets/x-logo.png'
import { CiHome, CiSearch, CiBellOn, CiMail, CiUser } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

const LeftSideBar = () => {
  return (
    <div className="flex flex-col justify-between h-screen p-4 border-r w-[20%] border-gray-200">
      
      <div className="mb-6">
        <img src={logo} alt="x-logo" className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
          <CiHome size={24} /> <span>Home</span>
        </div>
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
          <CiSearch size={24} /> <span>Explore</span>
        </div>
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
          <CiBellOn size={24} /> <span>Notifications</span>
        </div>
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
          <CiMail size={24} /> <span>Messages</span>
        </div>
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
          <CiViewList size={24} /> <span>Lists</span>
        </div>
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
          <CiUser size={24} /> <span>Profile</span>
        </div>
        <div className="flex items-center gap-4 text-lg font-medium cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
          <IoIosLogOut size={24} /> <span>Logout</span>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-blue-500 cursor-pointer text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition">
          Post
        </button>
      </div>
    </div>
  )
}

export default LeftSideBar
