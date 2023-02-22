import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import React ,{useEffect,useState}from 'react'
import Pusher from 'pusher-js'
import axios from './axios.js'
function App() {
  const [messages,setmessages]= useState([])


  useEffect(() => {
  axios.get('http://localhost:9000/messages/sync').then(response=>{
    setmessages(response.data)
  })
}, [])


useEffect(() => {
  const pusher = new Pusher('95fa3a1a032bda77a987', {
  cluster: 'ap2'
});

const channel = pusher.subscribe('messages');
channel.bind('inserted', function(newmessages) {
setmessages([...messages,newmessages])
});


return ()=>{
  channel.unbind_all()
  channel.unsubscribe()
}

}, [messages])


  return (

    <div className="App">
      <div className="app_body">
      <Sidebar />
      <Chat messages = {messages}/>
      </div>
    </div>
  );
}

export default App;
