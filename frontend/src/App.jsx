import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CustomAppBar from './components/CustomAppBar/CustomAppBar'
import Home from './pages/Home/Home'
import Chat from './pages/Chat/Chat'
import ChatBot from './pages/ChatBot/ChatBot'
import Friends from './pages/Friends/Friends';
import Post from './pages/Post/Post';
import Login from './pages/Login/Login';
import Perfil from './pages/Perfil/Perfil';
import Signup from './pages/Signup/Signup';
import Landing from './pages/Landing/Landing';
import RouteGuard from './components/Control/RouteGuard';
import AddFriends from './pages/Friends/AddFriends';

import { AuthProvider } from './auth/authProvider';

import { ControlLogin } from './components/Control/Control';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <AuthProvider>

      <BrowserRouter>
        <CustomAppBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/add_friends" element={<AddFriends />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/friends" element={<Friends />} />
          <Route path='/post/:id' element={<Post />} />

          <Route path="*" element={<h1>Not Found</h1>} />
          
        </Routes>
      </BrowserRouter>

      </AuthProvider>
    </>
  )
}

export default App
