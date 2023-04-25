import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const handleLogout=() => {
    localStorage.removeItem('token');
    navigate('/createUser');
    // alert("Loged out");
    window.location.reload();
  };
  return (
    <div>
      <div className="flex justify-center">
        <button onClick={handleLogout}>Logout</button>
      </div>
      
    </div>
  )
}

export default Home
