import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import UserState from "./userContext/UserState";
import VideoState from "./videoContext/VideoState";
import ChatState from "./chatContext/ChatState";

function App() {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    var token = localStorage.getItem("token");
    setToken(token);
    if (!token) navigate("/login");
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="bg-slate-300 flex m-auto  justify-center   "
      style={{ height: "100vh" }}
    >
      {!token ? (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createUser" element={<CreateUser />} />
        </Routes>
      ) : (
        <UserState>
          <VideoState>
            <ChatState>
              <Notification />
              <Container />
            </ChatState>
          </VideoState>
        </UserState>
      )}
    </div>
  );
}

export default App;
