import React from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material'
function SidebarChat() {
  return (
    <div className='SidebarChat'>
        <Avatar/>
        <div className="Chat_info">
            <h3>Room</h3>
            <p>Last message ...</p>
        </div>
    </div>
  )
}

export default SidebarChat