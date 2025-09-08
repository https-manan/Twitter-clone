import {} from "react";
import { CiImageOn } from "react-icons/ci";
import image from "../assets/image.png";

const CreatePost = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex-1 text-center font-semibold cursor-pointer py-3 hover:bg-gray-100 ">
          For you
        </div>
        <div className="flex-1 text-center font-semibold text-gray-500 cursor-pointer py-3 hover:bg-gray-100">
          Following
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 border-b border-gray-200">
        <img
          src={image}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <input
            type="text"
            placeholder="What is happening?!"
            className="w-full border-none focus:outline-none text-lg text-gray-700 placeholder-gray-500"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-blue-400">
              <CiImageOn
                size={22}
                className="cursor-pointer hover:text-blue-500"
              />
            </div>
            <button className="bg-blue-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
