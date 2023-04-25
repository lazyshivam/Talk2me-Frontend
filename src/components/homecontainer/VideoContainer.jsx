import React, { useContext, useState } from 'react'
import videoContext from '../../videoContext/VideoContext'
import image from '../../image/4.jpg';

const VideoContainer = () => {

  const { cameraOn,
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
    callUser } = useContext(videoContext);


  const [bgColor, setBgColor] = useState('#31a364');
  const [idTocall, setIdTocall] = useState('')
  const handleCall = () => {
    if (!callEnded) {
      setBgColor('#fc5d5b');
      callUser(me);
    }
    else {
      setBgColor('#31a364');
      leaveCall();
    }

  };

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
  const [userId,setUserId]=useState('');
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(me);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };




  return (
    <div className='flex   flex-col'>
      <div className="flex justify-between text-sm p-2 items-center ">
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
      <div className='relative video-frame'>
        {stream && (<video className='rounded-xl border border-red-400'
          ref={myVideo}
          muted
          autoPlay
          poster={image}
        />)}

        <div className="flex relative">
          {/* {peers.map((peer) => (
            <video key={peer.peerId} playsInline autoPlay={true} ref={(video) => peer.addStream(video.srcObject)} />
          ))} */}
          {callAccepted && !callEnded && (<video className='rounded-xl border border-red-400'
            ref={peerVideo}
            autoPlay

          />)}

        </div>
        <div className="absolute w-full  bottom-0 flex  items-center">
          <div className="flex  items-center w-full">
            <div className="flex flex-col  justify-end relative left-5    ">
              <input className={`absolute bottom-32 -right-9 ${show} -rotate-90`} type="range" orient="vertical" name='volume' min={0.0} max={1.0} step={0.01} value={volume.volume} onChange={handleVolume} />
              <button className='w-14 h-14   rounded-full  bg-stone-300  bg-opacity-60   cursor-pointer' onClick={handleOnClick}><i className="fa-sharp  fa-solid text-white fa-volume-high"></i></button>
            </div>
            <div className="flex  w-full justify-center items-center ">
              <button className='w-14 h-14 m-2 bg-opacity-70 bg-stone-300 rounded-full cursor-pointer' onClick={handleFullscreen}><i className="fa-solid text-white fa-maximize"></i></button>
              <button className='w-14 h-14 m-2 bg-opacity-70 bg-stone-300 rounded-full cursor-pointer'>{true ? <i className="fa-solid text-white fa-microphone"></i> : <i className="fa-solid text-white fa-microphone-slash"></i>}</button>
              <button className='w-20 h-20  m-2 rounded-full cursor-pointer' style={{ backgroundColor: `${bgColor}` }} onClick={handleCall}><i className="fa-solid fa-phone text-stone-200 fa-rotate-180"></i></button>
              <button className='w-14 h-14 m-2 bg-opacity-70 bg-stone-300 rounded-full cursor-pointer' >{true ? <i className="fa-sharp fa-solid text-white fa-video"></i> : <i class="fa-solid text-white fa-video-slash"></i>}</button>
              <button className='w-14 h-14 m-2 bg-opacity-70 bg-stone-300 cursor-pointer rounded-full' ><i className="fa-sharp fa-solid text-white fa-gear"></i></button>
            </div>
          </div>

        </div>

      </div>
        <div className=" relative bottom-0 mt-4 flex items-center justify-center ">
          <button onClick={handleCopy} className='mx-2 mycolor btnhover w-72 p-2 font-bold text-lg rounded-md'>
            {copied ? 'Copied!' :"Click Here To Copy Your ID"}
          </button>
      
            <input type="text" placeholder='Input User Id Here' className='border w-72 mycolor rounded-md mx-2 p-2' value={userId} onChange={(e)=>{setUserId(e.target.value);console.log(userId)}} />
           <button className='mx-2 mycolor btnhover w-72 p-2 font-bold text-lg rounded-md' onClick={()=>callUser(userId)}>Make a Call</button>
           
        </div>
     
    </div>
  )
}

export default VideoContainer
