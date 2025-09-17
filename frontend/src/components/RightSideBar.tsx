import { } from 'react'
import { CiSearch } from "react-icons/ci";
import modi from '../assets/modi.png'
import xi from '../assets/xi-jinping.png'
import putin from '../assets/putin.png'

const RightSideBar = () => {
  return (
    <div className="w-[20%] p-4">
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
        <CiSearch size={20} className="text-gray-500" />
        <input
          className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
          placeholder="Search..."
        />
      </div>

      <div className="mt-6 bg-gray-50 shadow-sm">
        <h1 className="font-bold text-lg px-4 py-3 border-b border-gray-200">
          Who to follow
        </h1>

        <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition">
          <div className="flex items-center gap-3">
            <img src={modi} alt="modi" className="w-10 h-10 rounded-full object-cove-r" />
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Modi</h2>
              <p className="text-gray-500 text-sm">@Modiji</p>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-800">
            Follow
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition">
          <div className="flex items-center gap-3">
            <img src={xi} alt="xi" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Xi Jinping</h2>
              <p className="text-gray-500 text-sm">@xipingchina</p>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-800">
            Follow
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition rounded-b-xl">
          <div className="flex items-center gap-3">
            <img src={putin} alt="putin" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Putin</h2>
              <p className="text-gray-500 text-sm">@putin</p>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-800">
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
