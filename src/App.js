import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import React ,{useEffect,useState}from 'react'
import Pusher from 'pusher-js'
import { Navigate, Routes, Route } from "react-router-dom";
import axios from 'axios'
import Login from './login/Login'
import SignUp from './Signup/Signup'
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



     
  const user = localStorage.getItem("token");
	console.log(user)
  return (
    <div className="App">
     
      <Routes>
        
        {user && <Route path="/" exact element={<div className="app_body">
      <Sidebar />
      <Chat messages = {messages}/>
      </div>} />}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
      
    </div>

   
  );
}

export default App;
