import React from "react";
import ChatContainer from "./ChatContainer";
// import HomeContainer from './HomeContainer'
import SideBar from "./SideBar";
import VideoContainer from "./homecontainer/VideoContainer";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./homecontainer/Home";
import About from "./homecontainer/About";
import User from "./homecontainer/DeveloperAndTeamPage";
import TermsPrivacyPage from "./homecontainer/TermsPrivacyPage";
import HelpSupportPage from "./homecontainer/HelpSupportPage";
// import Notification from './Notification';

const Container = ({ onLogout }) => {
  return (
    <div className="flex bg-white  p-3 mx-20 my-2 w-full overflow-hidden  rounded-3xl">
      <SideBar onLogout={onLogout} />
      {/* <Notification/> */}
      <div className="border-l-2 p-2 w-3/5 max-md:w-full  min-h-screen rounded-t-2xl">
        <div className="flex justify-start items-center  p-3 shadow-md ">
          <Link to="" className="bg-slate-300 p-2 mr-4 rounded-2xl">
            <i className="fa-solid fa-angle-left"></i>
          </Link>
          <h1 className="mx-3">Overview of new real estate proposals</h1>
          <button className="bg-slate-300 p-2 m-2 rounded-2xl">
            <i className="fa-solid fa-user-group mx-2"></i>Team
          </button>
        </div>
       <div className="overflow-y-scroll  w-auto h-5/6 scroll-smooth no-scrollbar ">
       <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/video" element={<VideoContainer />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/termsPrivacyPage" element={<TermsPrivacyPage/>} />
          <Route exact path="/helpSupportPage" element={<HelpSupportPage/>} />
          <Route exact path="/developerAndTeamPage" element={<User />} />


        </Routes>
       </div>
      </div>
      <div className="flex max-md:hidden" style={{ maxWidth: "450px", width: "450px" }}>
       
        <ChatContainer />
      </div>
    </div>
  );
};

export default Container;
