import { useRecoilValue } from "recoil";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import image from "../assets/bg.png";
import manan from "../assets/manan.png";
import { userProfileSelector } from "../recoil/selector";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const userData = useRecoilValue(userProfileSelector);
  const navigate = useNavigate();

  useEffect(() => {
    // If userData is null, user is not authenticated
    if (userData === null) {
      navigate('/login');
    }
  }, [userData, navigate]);

  if (userData === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Redirecting to login...
      </div>
    );
  }

  if (userData === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <LeftSideBar />

      <div className="w-[60%]">
        <div className="border-b border-r border-gray-200">

          <div className="px-4 py-3 border-b border-gray-200">
            <h1 className="font-bold text-xl">{userData?.name}</h1>
            <p className="text-gray-500 text-sm">
              {userData?.posts?.length || 0} Posts
            </p>
          </div>

          <div className="w-full relative">
            <img
              src={image}
              alt="profile banner"
              className="w-full h-48 object-cover"
            />
            <div className="absolute -bottom-16 left-4">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white">
                <img
                  src={manan}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* User info */}
          <div className="pt-20 px-4 pb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-bold text-xl text-gray-900">
                  {userData?.name}
                </h2>
                <p className="text-gray-500">@{userData?.username}</p>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
                Edit Profile
              </button>
            </div>

            <p className="text-gray-800 mb-3">
              {userData?.bio || "Full Stack Developer | Building amazing web experiences"}
            </p>

            <div className="flex gap-4 text-sm text-gray-500">
              <span>
                <strong className="text-gray-900">
                  {userData?.following?.length || 0}
                </strong>{" "}
                Following
              </span>
              <span>
                <strong className="text-gray-900">
                  {userData?.followers?.length || 0}
                </strong>{" "}
                Followers
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <div className="flex-1 text-center font-semibold cursor-pointer py-3 hover:bg-gray-100">
              Posts
            </div>
            <div className="flex-1 text-center font-semibold text-gray-500 cursor-pointer py-3 hover:bg-gray-100">
              Replies
            </div>
            <div className="flex-1 text-center font-semibold text-gray-500 cursor-pointer py-3 hover:bg-gray-100">
              Media
            </div>
            <div className="flex-1 text-center font-semibold text-gray-500 cursor-pointer py-3 hover:bg-gray-100">
              Likes
            </div>
          </div>
        </div>
      </div>

      <RightSideBar />
    </div>
  );
};

export default Profile;