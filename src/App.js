import { Routes,Route,useNavigate } from 'react-router-dom';
import './App.css';
import Container from './components/Container';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import { useEffect, useState } from 'react';
import Notification from './components/Notification';


function App() {
  const [token ,setToken] = useState();
  const navigate=useNavigate();
  useEffect(()=>{
         var token = localStorage.getItem('token');
        setToken(token);
        if(!token) navigate('/login');
        // eslint-disable-next-line
  },[])

  return (

    <div className='bg-slate-300 flex m-auto  justify-center   ' style={{height:"100vh"}}>
      <Notification/>
      {
      !token?<Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/createUser" element={<CreateUser/>} />
      </Routes>
     :
      
     <Container/>
        }
    </div>
  );
}

export default App;
