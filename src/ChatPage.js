import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import Pusher from 'pusher-js'
import {useEffect,useState}from 'react'
import axios from 'axios'
const url ='https://real-erin-oyster-cap.cyclic.app/api/messages/sync'
const token = localStorage.getItem("token");

axios.interceptors.request.use(
    config =>{
        config.headers.authorization =`Bearer ${token}`
        return config
    },
    error=>{
        return Promise.reject(error);
    }
)


function ChatPage() {
    const [messages,setmessages]= useState([])


    useEffect(() => {
    axios.get(url).then(response=>{
      setmessages(response.data)
    })
  }, [])
  
  
  useEffect(() => {
    const pusher = new Pusher('f541a3c71d74a31ef08a', {
    cluster: 'ap2'
  });
  
  const channel = pusher.subscribe('messages');
  channel.bind('inserted', function(newmessages) {
    console.log("hello")
  setmessages([...messages,newmessages])
  });
  
  
  return ()=>{
    channel.unbind_all()
    channel.unsubscribe()
  }
   
  }, [messages])
  
  return (
    <div className="app_body">
    <Sidebar />
    <Chat messages ={messages}/>
    
    </div>
  )
}

export default ChatPage