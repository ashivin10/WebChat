import { Avatar,IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import React ,{useState} from 'react'
import axios from 'axios'
import './Chat.css'
function Chat({messages}) { 

    const [input, setinput] = useState("")

    
    const sendMessage = async (e)=>{
        e.preventDefault()
        await axios.post('http://localhost:9000/messages/new',{
            
                message:input,
                 name:"me",
                 timestamp:"now",
                 received:false
             
        })    
        setinput("")
}
  return (
    <>
        <div className="chat">
            <div className="chat_header">
               <Avatar/>
               <div className="header_info">
                <h2>Room</h2>
                <p>Last seen at ...</p>
                </div> 
                <div className="header_right">
                    <IconButton>
                    <SearchIcon/>
                    </IconButton>
                    <IconButton>
                    <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>

                </div>
            </div>
            <div className='chat_body'>
                {messages.map((messages)=>(
                <p className={`chat_message  ${!(messages.received) && "chat_reciver"}`}>
                <span className="chat_name">{messages.name}</span>
                {messages.message}
                <span className="chat_timestamp">{messages.timestamp}</span>

                </p>

                ))}                         
                
                
               
                {/* <p className='chat_reciver chat_message'>
                    <span className="chat_name">arshan</span>                                   
                    this is a message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>

                </p> */}

            </div>

            <div className="chat_footer">
            <IconButton>
                <InsertEmoticonIcon/>
            </IconButton>
            <form action="">
                <input  value={input} onChange={e=>setinput(e.target.value)} type="text" placeholder='Type a Message'/>
                <button onClick={sendMessage} type='submit'>
                    <IconButton>
                    <SendIcon/>
                    </IconButton>
                </button>
            </form>
            <IconButton>

            <MicIcon/>
            </IconButton>
            </div>
        </div>
    </>
  )
}

export default Chat