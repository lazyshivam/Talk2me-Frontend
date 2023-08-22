import React ,{ useEffect, useState} from 'react'
import UserContext from './UserContext'
const UserState = (props) => {
  const host = "http://localhost:8080";
    // const ref=useRef(null);
    const [user,setUser]=useState({name:"",email:"",date:""})
    const [alluser,setAllUser]=useState([])

   

   //api call to get a particular user details from the database
      useEffect(()=>{
        async  function  GetUserDetails(){
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const data = await response.json();
        
        setUser({
          name:data.name,
          email:data.email,
          date:data.date

        });
        
       }

       GetUserDetails();
        // eslint-disable-next-line
      },[localStorage.getItem('token')]);

      //api call to get all logged in users in the database
      useEffect(()=>{
        async  function  GetAllUsers(){
        const response = await fetch(`${host}/api/auth/all`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        
        setAllUser(data);
        
       }
      console.log(alluser)
       GetAllUsers();
        // eslint-disable-next-line
      },[user]);
    
    // console.log(user)
   
  return (
    <UserContext.Provider value={{user,alluser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
