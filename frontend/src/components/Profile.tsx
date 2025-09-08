import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import image from '../assets/bg.png'

const Profile = () => {
  return (
    <div className='flex justify-between'>
      <LeftSideBar/>
       <div className="w-[50%] border-x border-gray-200 min-h-screen">
        <div className="w-full">
          <img
            src={image}
            alt="profile banner"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
      <RightSideBar/>
    </div>
  )
}

export default Profile
