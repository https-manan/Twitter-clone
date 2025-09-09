import {} from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import Login from './Login'

const Body = () => {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
         <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default Body
