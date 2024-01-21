import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { url } from "../config";
import BounceLoader from "react-spinners/BounceLoader";

const UserState = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  const [alluser, setAllUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
          setUserProfile(userData);
          setAllUser(allUsersData);
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          // Handle error
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading to false in case of an error
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  if (loading) {
    // Return loading spinner or any loading UI
    return <div className="flex justify-center items-center"><BounceLoader color="#36d7b7"/></div>;
  }

  return (
    <UserContext.Provider value={{ userProfile, alluser, isAuthenticated }}>
      {isAuthenticated && userProfile && props.children}
    </UserContext.Provider>
  );
};

export default UserState;
