import React, { useContext, useState, useEffect } from 'react';
import videoContext from '../videoContext/VideoContext';
import ringtone from ".././Ringtone/ringtone.mp3"
import useSound from 'use-sound';


function Notification() {
  const { call, callEnded, callAccepted ,leaveCall, answerCall} = useContext(videoContext)
  const [play, { stop }] = useSound(ringtone, {
    interrupt: true,
    loop: true
  });

  useEffect(() => {
    if (call.isReceived && !callAccepted && !callEnded)
      play();
    if (callAccepted || callEnded)
      stop();
  }, [call.isReceived, callAccepted, callEnded]);

  return (
    <div>
      {(call.isReceived && !callAccepted) && (
        <div className={`absolute font-semibold top-0 w-96 flex shadow-md shadow-slate-300  justify-around items-center mx-auto left-0 right-0 z-50 px-4 py-3 rounded-md mb-4 bg-blue-200`}>
          <p className="text-lg">Incoming call....</p>
          <div className="space-x-2">
            <button className='mybg-red shadow-md shadow-red-300 hover:bg-red-500 px-3  text-white py-2 rounded-full' onClick={()=>leaveCall()}>Cancel</button>
            <button className='mybg-green shadow-md shadow-green-300 hover:bg-green-500 px-3 py-2 text-white rounded-full' onClick={()=>answerCall()}>Accept</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Notification;
