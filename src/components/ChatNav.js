import React from 'react'

const ChatNav = (props) => {
      const {setNavigate}=props;
  return (

    <div className='flex flex-nowrap rounded-t-2xl p-4 backdrop-blur-xl opacity-95 shadow-lg  ' style={{backgroundColor:'#edf0f5'}}>
      <h1 className='m-2 mx-3 flex flex-nowrap  pr-12 items-center font-bold' style={{}}>Group Chat</h1>
     <div className="flex relative left-4 ">
     <button onClick={()=>setNavigate("messages")} className=' m-2   p-2 font-semibold  text-slate-600  hover:bg-blue-300 hover:opacity-80  rounded-lg'>Messages</button>
      <button onClick={()=>setNavigate("participants")} className=' m-2  p-2  font-semibold  text-slate-600 hover:bg-blue-300 hover:opacity-80 rounded-lg'>Participants</button>
     </div>
    </div>
  )
}

export default ChatNav
