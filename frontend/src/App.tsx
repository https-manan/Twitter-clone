import { } from 'react'
import './App.css'
import Body from './components/Body'
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from 'recoil';


function App() {

  return (
    <>
       <RecoilRoot>
         <Body/>
       </RecoilRoot>
      <ToastContainer/>
    </>
  )
}

export default App
