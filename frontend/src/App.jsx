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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <CustomAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/friends" element={<Friends />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
