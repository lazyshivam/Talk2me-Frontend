import React, { useContext, useState, useEffect, useRef } from 'react'
import videoContext from '../../videoContext/VideoContext'
import image from '../../image/4.jpg';
// import userContext from '../../userContext/UserContext';

const VideoContainer = () => {

  // const { user } = useContext(userContext);
  const { cameraOn,
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
    callAccepted,
    callEnded,
    call,
    leaveCall,
    answerCall,
    callUser, isCallStarted, isFullScreen } = useContext(videoContext);


  const handleFullscreen = () => {
    const videoElement = document.querySelector("video");
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  };

  const [volume, setVolume] = useState(0.5);
  const [show, setShow] = useState('hidden');

  const handleOnClick = () => {
    if (show === 'visible') setShow('hidden');
    else setShow('visible')
  };
  const handleVolume = (e) => {
    if (stream) {
      var audio = document.querySelector("video");
      setVolume(e.target.value);
      audio.volume = volume;
    }
  };


  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(me);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  useEffect(() => {
    if (stream) {
      myVideo.current.srcObject = stream;
    }
    if (peerStream)
      peerVideo.current.srcObject = peerStream;

  }, [callAccepted, callEnded]);

  return (
    <div className='flex h-full  flex-col'>
      <div className="flex justify-between text-sm p-2 items-center flex-wrap ">
        <div className="flex flex-nowrap px-3 ">
          <div className="flex mx-5 ">
            <p>
              <span className='text-slate-400 p-2 '><i className="fa-solid fa-user-group"></i></span>
              Invited to the call :
              <span className='mycolor p-1 mx-1 rounded-md'>6</span>
            </p>
          </div>
          <div className="flex flex-nowrap  mx-4">
            <p>
              <span className='text-slate-400 p-1'><i className="fa-solid fa-user-minus"></i></span>
              Absent people :
              <span className='mycolor1 p-1 mx-1 rounded-md'>3</span>
            </p>
          </div>
        </div>

        <div className="flex flex-nowrap ">
          <p className='mx-3'>
            <button className='mycolor p-1 mr-2 rounded-lg'><i className="fa-solid fa-plus"></i></button>
            Invited to the call
          </p>
        </div>

      </div>
      <div className='video-frame flex justify-center  overflow-hidden border  rounded-lg'>
        <div className={`
          inset-0
          absolute

          flex
          justify-center
          items-center
          ${isFullScreen ? 'top-0 left-0' : 'top-0 right-0'}`}>
          {isFullScreen ? (
            // Your video frame in full screen
            // Replace 'Your video frame code here' with your actual code
            <div className={`w-full flex justify-center shadow-md shadow-blue-400`}>
              {stream && (<video
                className='rounded-xl shadow-md shadow-blue-400 w-full h-full '
                ref={myVideo}
                muted
                autoPlay
                poster={image}

              />)}

            </div>
          ) : (
            // User's video frame in full screen
            // Replace 'User video frame code here' with the actual code to render
            // the user's video frame
            <div className={`w-full flex justify-center `}>
              {callAccepted && !callEnded && (<video className='rounded-xl shadow-md border  w-full h-full '
                ref={peerVideo}
                autoPlay
                poster={image}
              />)}

            </div>
          )}
        </div>

        {!isFullScreen && (
          <div className={`w-1/4 absolute top-0 right-0 m-4 z-20`}>
            {stream && (<video className='rounded-xl shadow-sm border shadow-slate-200'
              ref={myVideo}

              muted
              autoPlay
              poster={image}
            />)}

          </div>
        )}

        <div className="absolute  bottom-0 flex justify-center items-center">
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col  justify-end relative right-20    ">
              <input className={`absolute bottom-32 -right-9 ${show} -rotate-90`} type="range" orient="vertical" name='volume' min={0.0} max={1.0} step={0.01} value={volume.volume} onChange={handleVolume} />
              <button className='w-14 h-14   rounded-full  bg-stone-300  bg-opacity-60   cursor-pointer' onClick={handleOnClick}><i className="fa-sharp  fa-solid text-white fa-volume-high"></i></button>
            </div>
            <div className="flex  justify-center items-center ">
              <button className='w-14 h-14 m-2 bg-opacity-70 bg-stone-300 rounded-full cursor-pointer' onClick={handleFullscreen}><i className="fa-solid text-white fa-maximize"></i></button>
              <button className='w-14 h-14 m-2 bg-opacity-70 bg-stone-300 rounded-full cursor-pointer' onClick={() => handleMicToggle()}>{micOn ? <i className="fa-solid text-white fa-microphone"></i> : <i className="fa-solid text-white fa-microphone-slash"></i>}</button>

              {/* <button className='w-20 h-20  m-2 rounded-full cursor-pointer' style={{ backgroundColor: `${bgColor}` }} onClick={handleCall}><i className="fa-solid fa-phone text-stone-200 fa-rotate-180"></i></button> */}
              {
                (callAccepted && !callEnded) ? <button className='w-20 h-20  m-2 rounded-full cursor-pointer' style={{ backgroundColor: "#fc5d5b" }} onClick={() => {
                  leaveCall();

                  window.location.reload();
                }}><i className="fa-solid fa-phone text-stone-200 fa-rotate-180"></i></button>

                  : <button className='w-20 h-20  m-2 rounded-full cursor-pointer' onClick={call.isReceived && answerCall} style={{ backgroundColor: "#31a364" }} ><i className="fa-solid fa-phone text-stone-200 fa-rotate-180"></i></button>
              }


              <button className='w-14 h-14 m-2 bg-opacity-70 bg-stone-300 rounded-full cursor-pointer' onClick={() => handleCameraToggle()} >{cameraOn ? <i className="fa-sharp fa-solid text-white fa-video"></i> : <i class="fa-solid text-white fa-video-slash"></i>}</button>
              <button className='w-14 h-14 m-2 bg-opacity-70 bg-stone-300 cursor-pointer rounded-full' ><i className="fa-sharp fa-solid text-white fa-gear"></i></button>
            </div>
          </div>

        </div>

      </div>
      <div className=" relative bottom-0 mt-4 ">
        <div className="flex flex-wrap flex-row space-x-4 mb-2   items-center justify-center sm:flex-row">

          <button onClick={handleCopy} className=' bg-blue-500 shadow-md shadow-slate-400 text-white  w-60  hover:bg-blue-400 p-2 font-semibold text-lg rounded-md'>
            {copied ? 'Copied!' : "Click Here To Copy Your ID"}
          </button>

          <input type="text" placeholder='Input User Id Here' className='border-2 shadow-md shadow-slate-400 border-blue-400  bg-blue-200 w-60  rounded-md text-lg  p-2 focus:outline-none focus:border-blue-700' value={userId} onChange={(e) => { setUserId(e.target.value) }} />
          <button className=' bg-blue-500 shadow-md shadow-slate-400 text-white  w-60  hover:bg-blue-400 p-2 font-semibold text-lg rounded-md' onClick={() => callUser(userId)}>Make a Call</button>
        </div>
      </div>

    </div >
  )
}

export default VideoContainer
