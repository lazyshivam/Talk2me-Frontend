import React from 'react'
import ChatContainer from './ChatContainer'
// import HomeContainer from './HomeContainer'
import SideBar from './SideBar'
import VideoContainer from "./homecontainer/VideoContainer";
import { Routes, Route ,Link} from "react-router-dom";
import Home from "./homecontainer/Home";
import About from "./homecontainer/About";
import User from "./homecontainer/User";


const Container = () => {
  return (
    <div className='flex  bg-white p-3 mx-20 my-2 rounded-3xl'  style={{width:"100vw"}}>
      <SideBar/>
      <div style={{width:"56vw"}} className='border-l-2 p-2  rounded-l-2xl'>
        <div className="flex justify-start items-center  p-3 shadow-md " >
        <Link to="" className='bg-slate-300 p-2 mr-4 rounded-2xl'><i className="fa-solid fa-angle-left"></i></Link>
        <h1 className="mx-3">Overview of new real estate proposals</h1>
        <button className="bg-slate-300 p-2 m-2 rounded-2xl"><i className="fa-solid fa-user-group mx-2"></i>Team</button>
      </div>
      <Routes>

        <Route exact path="/" element={<Home/>} />
        <Route  exact path="/about" element={<About/>} />
        <Route  exact path="/user" element={<User/>} />
        <Route  exact path="/video" element={ <VideoContainer />} />
        

      </Routes>
    </div>
      <ChatContainer/>
    </div>
  )
}

export default Container
