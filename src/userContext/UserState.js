import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { url } from "../config";

const UserState = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  const [alluser, setAllUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const [userDataResponse, allUsersResponse] = await Promise.all([
            fetch(`${url}/api/auth/getuser`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
            }),
            fetch(`${url}/api/auth/all`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }),
          ]);

          const userData = await userDataResponse.json();
          const allUsersData = await allUsersResponse.json();
          // console.log("User Data:", userData);
          // console.log("All Users Data:", allUsersData);
          setUserProfile(userData);
          setAllUser(allUsersData);
        } catch (error) {
          // Handle error
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ userProfile, alluser, isAuthenticated }}>
      {isAuthenticated &&userProfile && props.children}
    </UserContext.Provider>
  );
};

export default UserState;
