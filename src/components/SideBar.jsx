import React from 'react'
import userImage from '../image/icons8-user-80.png';
import Icon from '../image/talkmeIcon.webp';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='flex  mr-4 py-5 ' >
      <div className="flex flex-col w-20 justify-between items-center">
        <img src={Icon} className="w-20 h-14 rounded-full cursor-pointer hover:border" alt="Icon" />
        <div className="flex flex-col justify-around ">
          <Link to="/" className=' cursor-pointer hover:myhover rounded-sm p-3 m-2  text-zinc-400'><i className="fa-solid fa-house"></i></Link>
          <Link to="/user" className=' cursor-pointer hover:myhover rounded-sm p-3 m-2  text-zinc-400'><i className="fa-solid fa-user-group"></i></Link>
          <Link to="/video" className=' cursor-pointer hover:myhover rounded-sm p-3 m-2  text-zinc-400'><i className="fa-solid fa-video"></i></Link>
          <Link to="/about" className=' cursor-pointer hover:myhover rounded-sm p-3 m-2  text-zinc-400'><i className="fa-solid fa-eye"></i></Link>
          <Link to="/a" className=' cursor-pointer hover:myhover rounded-sm p-3 m-2  text-zinc-400'><i className="fa-solid fa-calendar-check"></i></Link>
          <Link to="/b" className=' cursor-pointer hover:myhover rounded-sm p-3 m-2  text-zinc-400'><i className="fa-sharp fa-solid fa-compass"></i></Link>
        </div>
        <img src={userImage} className="w-10 h-12  rounded-full cursor-pointer hover:border hover: border-zinc-400" alt="userImage" />
      </div>
    </div>
  )
}

export default SideBar
