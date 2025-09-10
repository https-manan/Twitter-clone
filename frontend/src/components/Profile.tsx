import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import image from '../assets/bg.png'
import manan from '../assets/manan.png'


const Profile = () => {
  return (
    <div className="flex justify-between">
      <LeftSideBar />

      
      <div className="w-[60%]">
        <div className="border-b border-r border-gray-200">
          
          <div className="px-4 py-3 border-b border-gray-200">
            <h1 className="font-bold text-xl">Manan</h1>
            <p className="text-gray-500 text-sm">10 Posts</p>
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

         
          <div className="pt-20 px-4 pb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-bold text-xl text-gray-900">Manan Bhardwaj</h2>
                <p className="text-gray-500">@manan-dev</p>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
                Edit Profile
              </button>
            </div>
            
            <p className="text-gray-800 mb-3">
              Full Stack Developer | Building amazing web experiences
            </p>
            
            <div className="flex gap-4 text-sm text-gray-500">
              <span><strong className="text-gray-900">120</strong> Following</span>
              <span><strong className="text-gray-900">1.2K</strong> Followers</span>
            </div>
          </div>

          
          <div className="flex border-b border-gray-200">
            <div className="flex-1 text-center font-semibold cursor-pointer py-3 hover:bg-gray-100  ">
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
  )
}

export default Profile