import { } from 'react'
import LeftSideBar from './LeftSideBar'
import Feed from './Feed'
import RightSideBar from './RightSideBar'

const Home = () => {
  return (
    <div className='flex justify-between'>
      <LeftSideBar />
      <Feed />
      <RightSideBar />
    </div>
  )
}

export default Home
