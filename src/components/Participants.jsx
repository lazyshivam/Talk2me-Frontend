import React,{useContext} from 'react'
import userContext from '../userContext/UserContext';
// import chatContext from '../chatContext/ChatContext';
// import { userdata } from '../data/user';

const Participants = () => {
    const {alluser}=useContext(userContext);
//    const data= JSON.stringify(participants)
    console.log('participants', alluser);
    return (
        
            <div className="flex flex-col scroll-smooth chat-feed overflow-y-scroll  m-4 mt-0 pl-5 pb-7 h-4/5 ">
                {
                    alluser.map((user,i)=>{
                        return(
                            <div className="flex flex-row my-4 shadow-inner shadow-slate-300  mycolor rounded-full p-2 mr-4  " key={i}>
                             <span className='w-14 mr-5  rounded-full  '>
                                <img className='rounded-full ' src="https://source.unsplash.com/random/200x200?sig=1" alt="user-profile-pic" />
                             </span>
                             <p className='overflow-wrap'>{user.name} <br/>
                             <span className='text-emerald-900 font-serif text-sm'>{user.email}</span>
                             </p>
                            </div>
                        );
                    })
                }
            </div>
        
    )
}

export default Participants
