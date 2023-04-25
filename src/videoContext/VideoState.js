import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import VideoContext from "./VideoContext";
import Peer from "simple-peer";
const socket = io.connect("http://localhost:8080");

const VideoState = ({ children }) => {
  // const [peers, setPeers] = useState([]);
  const [call, setCall] = useState({});

  const [me, setMe] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  // const [myPeer, setMyPeer] = useState(null);
  const [name,setName] = useState('');
  const myVideo = useRef(null);
  const peerVideo = useRef(null);
  const connectionRef=useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      })
      .catch((error) => console.error(error));
    socket.on("me", (id) => setMe(id));
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceived: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (stream) => {
      peerVideo.current.srcObject = stream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userTocall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (stream) => {
      peerVideo.current.srcObject = stream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall=() => {
    setCallEnded(true);
    connectionRef.current.destroy();
  }

  //for making the camera on and off.
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const handleCameraToggle = () => {
    // if (myStream.enabled) {
    //   // videoTrack.stop();
    //   myStream.enabled = false;
    //   setCameraOn(false);
    // } else {
    //   myStream.enabled = true;
    //   setCameraOn(true);
    // }
  };

  // //for making the microphone on and off.
  const handleMicToggle = () => {
    // if (myStream.enabled) {
    //   myStream.enabled = false;
    //   setMicOn(false);
    // } else {
    //   myStream.enabled = true;
    //   setMicOn(true);
    // }
  };
  //another method to handle the toggle mute state
  // if (stream) {
  //   stream.getAudioTracks().forEach((track) => {
  //     track.enabled = !isMuted;
  //   });
  //   setIsMuted((prevIsMuted) => !prevIsMuted);
  // }
  // };

  return (
    <VideoContext.Provider
      value={{
        cameraOn,
        micOn,
        handleCameraToggle,
        handleMicToggle,
        myVideo,
        peerVideo,
        stream,
        name,
        setName,
        me,
        callAccepted,
        callEnded,
        call,
        leaveCall,
        answerCall,
        callUser
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoState;
