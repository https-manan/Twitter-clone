import {} from 'react'
import image from "../assets/manan.png";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

const Tweet = () => {
  return (
    <div className="border-b border-r border-gray-200 p-4 hover:bg-gray-50 transition">
      
      <div className="flex items-start gap-3">
        <img 
          className="w-10 h-10 rounded-full object-cover" 
          src={image} 
          alt="profile" 
        />

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-gray-900">Manan Bhardwaj</h1>
            <p className="text-gray-500 text-sm">@https-manan · 1m</p>
          </div>

          <p className="text-gray-800 mt-1">
            Hy developers, let’s connect and build a great network.
          </p>

          <div className="flex justify-between items-center text-gray-500 text-sm mt-3 w-4/5">
            <div className="flex items-center gap-2 cursor-pointer hover:text-pink-500 transition">
              <CiHeart size={20} />
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
              <FaRegComment size={18} />
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-500 transition">
              <CiBookmark size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
