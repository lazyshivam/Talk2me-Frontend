import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="flex flex-col justify-center items-center h-full px-5 bg-blue-400">
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome to VideoCall App</h1>
      <p className="text-lg  text-white mb-8">
        Connect with your friends, family, and colleagues through high-quality video calls.
        Start conversations, collaborate, and stay connected no matter where you are.
      </p>
      <Link to="/video" className="bg-white text-blue-400 px-6 py-2 rounded-full text-lg shadow-md hover:bg-blue-100">
        Start a Video Call
      </Link>
      <div className="mt-10 text-white">
        <p className="text-lg mb-2">Features:</p>
        <ul className="list-disc list-inside">
          <li>Crystal clear video and audio quality</li>
          <li>Instant one-on-one or group calls</li>
          <li>Secure and encrypted communication</li>
          <li>Real-time chat alongside video calls</li>
          <li>Easy scheduling and joining of meetings</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
