import React,{} from 'react'
import VideoContext from './VideoContext'
const VideoState = ({children}) => {
    
  return (
    <VideoContext.Provider value={{}}>
      {children}
    </VideoContext.Provider>
  )
}

export default VideoState
