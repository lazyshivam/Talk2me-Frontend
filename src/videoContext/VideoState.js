import React, { useEffect, useState, useRef, useContext } from "react";
import {io} from "socket.io-client";
import VideoContext from "./VideoContext";
import { url } from "../config";
import Peer from "simple-peer";
import userContext from "../userContext/UserContext";

const VideoState = ({ children }) => {
  const [socket,setSocket]=useState(null);
  // const [peers, setPeers] = useState([]);
  const [call, setCall] = useState({});
  const {isAuthenticated,userProfile}=useContext(userContext);
  const [me, setMe] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [stream, setStream] = useState(null);
  const [peerStream, setPeerStream] = useState(null);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef(null);
  const peerVideo = useRef(null);
  const connectionRef = useRef(null);

 

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia is not supported in this browser.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) myVideo.current.srcObject = stream;
      })
      .catch((error) => console.error(error));

    // return cleanup function to stop the stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {

    // if(userProfile)
    const Newsocket = io(url);
    setSocket(Newsocket);
    Newsocket.emit("new-user-joined", { name: userProfile.name, email: userProfile.email });
  
    Newsocket.on("me", (id) => setMe(id));
    Newsocket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceived: true, from, name: callerName, signal });
    });
    console.log(me)
    return () => Newsocket.disconnect();
    // eslint-disable-next-line
  }, [isAuthenticated]);


  //answer call of the user
  const answerCall = () => {
    setCallAccepted(true);
    setIsFullScreen(false);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (stream) => {
      setPeerStream(stream);
      peerVideo.current.srcObject = stream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  //call the user
  const callUser = (id) => {
    setIsCallStarted(true);
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      console.log(data);
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (stream) => {
      setPeerStream(stream);
      peerVideo.current.srcObject = stream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      setIsFullScreen(false);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
 
  //cancel the call
  const leaveCall = () => {
    setCallEnded(true);
    setPeerStream(null);
    setStream(null);
    setIsCallStarted(false);
    setIsFullScreen(true);
    connectionRef.current.destroy();
  };

  //for making the camera on and off.
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const handleCameraToggle = () => {
    if (stream && stream.getVideoTracks().length > 0) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setCameraOn(videoTrack.enabled);
    }
  };

  const handleMicToggle = () => {
    if (stream && stream.getAudioTracks().length > 0) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        cameraOn,
        micOn,
        handleCameraToggle,
        handleMicToggle,
        stream,
        peerStream,
        peerVideo,
        myVideo,
        name,
        setName,
        me,
        isCallStarted,
        callAccepted,
        callEnded,
        call,
        socket,
        leaveCall,
        answerCall,
        callUser,
        isFullScreen,
      }}
    >
      {isAuthenticated &&socket && children}
    </VideoContext.Provider>
  );
};

export default VideoState;
