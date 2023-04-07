import React from 'react'

const VideoContainer = () => {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex flex-nowrap p-3 ">
        <div className="flex mx-5">
          <p>
            <span className='text-slate-400 p-2'><i className="fa-solid fa-user-group"></i></span>
            Invited to the call :
          <span className='mycolor p-2 mx-1 rounded-md'>6</span>
          </p>
        </div>
        <div className="flex flex-nowrap mx-4">
          <p>
            <span className='text-slate-400 p-2'><i className="fa-solid fa-user-minus"></i></span>
            Absent people :
          <span className='mycolor1 p-2 mx-1 rounded-md'>3</span>
          </p>
        </div>
      </div>

      <div className="flex flex-nowrap p-4">
        <p className='mx-3'>
          <button className='mycolor p-2 mr-2 rounded-lg'><i className="fa-solid fa-plus"></i></button>
          Invited to the call
        </p>
      </div>

    </div>
  )
}

export default VideoContainer
