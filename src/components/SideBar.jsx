import React, { useEffect, useState, useRef, useContext } from 'react'
import userImage from '../image/icons8-user-80.png';
import Icon from '../image/talkmeIcon.webp';
import { NavLink, useNavigate } from 'react-router-dom';
// import { url } from '../config.js'
import userContext from '../userContext/UserContext';


const SideBar = () => {
  
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };


  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current &&
      !popupRef.current.contains(event.target) &&
      !event.target.classList.contains("popup-button")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const {userProfile} = useContext(userContext);
  
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    // alert("Loged out");
    window.location.reload();
  };
  return (
    <div className='flex max-md:hidden mr-4 py-5 ' >
      <div className="flex flex-col w-20 justify-between items-center">
        <img src={Icon} className="w-20 h-14 rounded-full " alt="Icon" />
        <div className="flex flex-col justify-around space-y-2">
          <NavLink to="/" className="cursor-pointer   p-3 m-2 text-zinc-400"><i className="fa-solid  fa-house"></i></NavLink>
          <NavLink to="/video" className='cursor-pointer    p-3 m-auto text-zinc-400'><i className="fa-solid fa-video"></i></NavLink>
          <NavLink to="/about" className='cursor-pointer    p-3 m-auto text-zinc-400'><i className="fa-solid fa-eye"></i></NavLink>
          <NavLink to="/termsPrivacyPage" className='cursor-pointer   p-3 m-auto text-zinc-400'><i className="fa-solid fa-circle-info"></i></NavLink>
          <NavLink to="/helpSupportPage" className='cursor-pointer   p-3 m-2 text-zinc-400'><i className="fa-solid fa-handshake-angle"></i></NavLink>
          <NavLink to="/developerAndTeamPage" className='cursor-pointer  p-3 m-auto text-zinc-400'><i className="fa-solid fa-user-group"></i></NavLink>
        </div>
        {/* <img src={userImage} className="w-10 h-12  rounded-full cursor-pointer hover:border hover: border-zinc-400" alt="userImage" /> */}
        <div className="relative">
          <button onClick={togglePopup} className=" text-white px-3 py-1 rounded-lg">
            <img src={userImage} className="w-14 h-14 popup-button shadow-md shadow-blue-300 rounded-full cursor-pointer hover:scale-125 hover: border-zinc-400" alt="userImage" />

          </button>
          {isOpen && (
            <div ref={popupRef} className="absolute z-30  flex flex-col w-72 items-center justify-center bottom-10 left-20 bg-white p-4 border border-gray-300 rounded-lg shadow">
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
