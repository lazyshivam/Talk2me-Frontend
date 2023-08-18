import React, { useContext, useState,useEffect } from 'react';
import videoContext from '../videoContext/VideoContext';
import ringtone from ".././Ringtone/ringtone.mp3"
import useSound from 'use-sound';
function Notification() {
 const {call,callEnded,callAccepted}=useContext(videoContext)
  const [play,{stop}]=useSound(ringtone,{
    interrupt:true,
    loop:true
  });
 useEffect(() => {
   if(call.isReceived && !callAccepted && !callEnded)
     play();
     if(callAccepted || callEnded)
     stop();
  }, [call.isReceived,callAccepted,callEnded]);
  
  return (
    <div> 
      {(call.isReceived &&!callAccepted) && (
         <div className={`absolute top-0 w-96 mx-auto left-0 right-0 z-50 px-4 py-3 rounded-md mb-4 bg-green-100 text-green-900`}>
         <p className="text-lg">Incoming call....</p>
         {/* <button onClick={()=>ringCall()}>Stop&Start</button> */}
       </div>
      )}
    </div>
  );
}

export default Notification;
