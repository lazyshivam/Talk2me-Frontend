import React,{useEffect, useState} from 'react'
import userImage from '../image/icons8-user-80.png';
import Icon from '../image/talkmeIcon.webp';
import { NavLink ,useNavigate} from 'react-router-dom';

const SideBar = () => {
  const isActive = (route) => window.location.pathname === route;
  const [isOpen, setIsOpen] = useState(false);
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

   const [userProfile,setUserProfile]=useState({});
  useEffect(()=>{
   const getUserData = async() =>{
    const response = await fetch(`http://localhost:8080/api/auth/getuser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token")
      },
     
    });
    const user=await response.json();
    setUserProfile(user);
   }
   getUserData();
  },[])
  
  const navigate=useNavigate();
  const handleLogout=() => {
    localStorage.removeItem('token');
    navigate('/login');
    // alert("Loged out");
    window.location.reload();
  };
  return (
    <div className='flex max-md:hidden mr-4 py-5 ' >
      <div className="flex flex-col w-20 justify-between items-center">
        <img src={Icon} className="w-20 h-14 rounded-full  cursor-pointer hover:border" alt="Icon" />
        <div className="flex flex-col justify-around space-y-2">
          <NavLink  to="/"  className={`cursor-pointer  ${isActive}  hover:bg-blue-200 rounded-sm p-3 m-2 text-zinc-400`}><i className="fa-solid  fa-house"></i></NavLink>
          <NavLink to="/video"  className='cursor-pointer hover:bg-blue-200   rounded-sm p-3 m-auto text-zinc-400'><i className="fa-solid fa-video"></i></NavLink>
          <NavLink to="/about"  className='cursor-pointer hover:bg-blue-200   rounded-sm p-3 m-auto text-zinc-400'><i className="fa-solid fa-eye"></i></NavLink>
          <NavLink to="/termsPrivacyPage"  className='cursor-pointer hover:bg-blue-200   rounded-sm p-3 m-auto text-zinc-400'><i className="fa-solid fa-calendar-check"></i></NavLink>
          <NavLink to="/helpSupportPage"  className='cursor-pointer hover:bg-blue-200   rounded-sm p-3 m-2 text-zinc-400'><i className="fa-sharp fa-solid fa-compass"></i></NavLink>
          <NavLink to="/developerAndTeamPage"  className='cursor-pointer hover:bg-blue-200   rounded-sm p-3 m-auto text-zinc-400'><i className="fa-solid fa-user-group"></i></NavLink>
        </div>
        {/* <img src={userImage} className="w-10 h-12  rounded-full cursor-pointer hover:border hover: border-zinc-400" alt="userImage" /> */}
        <div className="relative">
          <button onClick={togglePopup} className=" text-white px-3 py-1 rounded-lg">
          <img src={userImage} className="w-10 h-12  rounded-full cursor-pointer hover:scale-125 hover: border-zinc-400" alt="userImage" />

          </button>
          {isOpen && (
            <div className="absolute z-30  flex flex-col w-72 items-center justify-center bottom-10 left-20 bg-white p-4 border border-gray-300 rounded-lg shadow">
             <img src={userImage} className="w-10 h-12  rounded-full cursor-pointer hover:scale-125 hover: border-zinc-400" alt="userImage" />
              <h2 className="text-lg font-semibold mb-2">{userProfile.name}</h2>
              <p className="text-gray-500">{userProfile.email}</p>
              <p>Joined by:{new Date(userProfile.date).toLocaleString()}</p>
              <button onClick={handleLogout} className='bg-blue-500 text-white shadow-md p-2 px-4 mt-6 rounded-full hover:bg-blue-400 hover:font-semibold'>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar
