import React, { useEffect, useState, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import "./App.css";

const Container = lazy(() => import("./components/Container"));
const Login = lazy(() => import("./components/Login"));
const CreateUser = lazy(() => import("./components/CreateUser"));
const Notification = lazy(() => import("./components/Notification"));
const UserState = lazy(() => import("./userContext/UserState"));
const VideoState = lazy(() => import("./videoContext/VideoState"));
const ChatState = lazy(() => import("./chatContext/ChatState"));

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div
      className="bg-slate-200 flex m-auto justify-center"
      style={{ height: "100vh" }}
    >
      <React.Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <BounceLoader className="text-center " color="#36d7b7" />
          </div>
        }
      >
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/createUser" element={<CreateUser />} />
            </>
          ) : (
            <Route
              path="*"
              element={
                <UserState>
                  <VideoState>
                    <ChatState>
                      <Notification />
                      <Container onLogout={handleLogout} />
                    </ChatState>
                  </VideoState>
                </UserState>
              }
            />
          )}
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
