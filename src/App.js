import './App.css';
import ChatPage from './ChatPage'
import { Navigate, Routes, Route } from "react-router-dom";
import Login from './login/Login'
import SignUp from './Signup/Signup'
function App() {
 


     
  const user = localStorage.getItem("token");
  return (
    <div className="App">
     
      <Routes>
        
        {user && <Route path="/" exact element={<ChatPage/>} />}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
      
    </div>

   
  );
}

export default App;
