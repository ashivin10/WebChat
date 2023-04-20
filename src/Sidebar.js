import React from 'react'
import "./Sidebar.css"
import { Avatar,IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
function sidebar() {
  return (
    <>
        <div className="sidebar">
            <div className="header">
                <div className="avatar">
                    <Avatar/>
                </div>
                <div className="left_header">
                    <IconButton>
                        <VideoCallIcon/>
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchcontainer">
                    <SearchOutlinedIcon/>
                    <input  className='searchbox'type = 'text' placeholder='search' />
                </div>
            </div>
            {/* <div className="sidebar_profile">
            <Avatar/>
            </div> */}
        </div>
    </>
  )
}

export default sidebar