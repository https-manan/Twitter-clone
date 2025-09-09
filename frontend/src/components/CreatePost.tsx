import {} from "react";
import { CiImageOn } from "react-icons/ci";
import image from "../assets/manan.png";

const CreatePost = () => {
  return (
    <div className="border-b border-r border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex-1 text-center font-semibold cursor-pointer py-3 hover:bg-gray-100">
          For you
        </div>
        <div className="flex-1 text-center font-semibold text-gray-500 cursor-pointer py-3 hover:bg-gray-100">
          Following
        </div>
      </div>

      <div className="flex items-start gap-4 p-6">
       
        <img
          src={image}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        
        <div className="flex-1">
          <textarea
            placeholder="What is happening?!"
            className="w-full border-none focus:outline-none text-xl text-gray-800 placeholder-gray-500 resize-none min-h-[80px] p-2"
          />

          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-5 text-blue-400">
              <CiImageOn
                size={24}
                className="cursor-pointer hover:text-blue-500"
              />
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
