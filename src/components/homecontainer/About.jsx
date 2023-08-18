import React from 'react'
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="flex flex-col justify-center items-center px-5 min-h-screen bg-blue-400">
      <h1 className="text-4xl font-bold mb-4 text-white">About VideoCall App</h1>
      <p className="text-lg text-white mb-8">
        VideoCall App is a powerful platform for seamless video communication and collaboration.
        Whether you're working remotely, catching up with friends, or hosting virtual events,
        VideoCall App brings people together in an immersive and engaging way.
      </p>
      <div className="bg-white p-6 transition-transform transform hover:scale-105 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-2">
          If you have any questions, suggestions, or feedback, feel free to contact us.
        </p>
        <a
          href="mailto:shivamgoswami.ss.pp@gmail.com?subject=Feedback%20for%20VideoCall%20App"
          className="text-blue-500 hover:underline"
         
        >
          shivamgoswami.ss.pp@gmail.com
        </a>

      </div>
      <Link
        to="/"
        className="mt-10 bg-white text-blue-400 px-6 py-2 rounded-full text-lg shadow-md hover:bg-blue-100"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default About
