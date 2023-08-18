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
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [stream, setStream] = useState(null);
  const [peerStream, setPeerStream] = useState(null);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [name,setName] = useState('');
  const myVideo = useRef(null);
  const peerVideo = useRef(null);
  const connectionRef=useRef(null);

  // useEffect(() => {
  //   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  //         console.log("getUserMedia is not supported in this browser.");
  //         return;
  //       }
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //        setStream(stream);
  //        if(myVideo.current)
  //       myVideo.current.srcObject = stream;
  //     })
  //     .catch((error) => console.error(error));
  //   socket.on("me", (id) => setMe(id));
  //   socket.on("calluser", ({ from, name: callerName, signal }) => {
  //     setCall({ isReceived: true, from, name: callerName, signal });
  //   });
  // }, []);
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia is not supported in this browser.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if(myVideo.current)
        myVideo.current.srcObject = stream;
      })
      .catch((error) => console.error(error));

    // return cleanup function to stop the stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    socket.on("me", (id) => setMe(id));
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceived: true, from, name: callerName, signal });
    });
  }, [socket]);

  const answerCall = () => {
    setCallAccepted(true);
    setIsFullScreen(false);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (stream) => {
      setPeerStream(stream);
      peerVideo.current.srcObject=stream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };
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
       peerVideo.current.srcObject=stream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      setIsFullScreen(false);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall=() => {
    setCallEnded(true);
    setPeerStream(null);
    setStream(null);
    setIsCallStarted(false);
    setIsFullScreen(true);
    connectionRef.current.destroy();
  }

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
        myVideo
        ,
        name,
        setName,
        me,
        isCallStarted,
        callAccepted,
        callEnded,
        call,
        leaveCall,
        answerCall,
        callUser,
        isFullScreen
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoState;
