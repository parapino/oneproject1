import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function App() {
  const { t } = useTranslation()

  const [dark, setDark] = useState(false)
  const [editMode, setEditMode] = useState(false) 
  const [text, setText] = useState(t('test')) 

  return (
    <div className={dark ? "dark" : ""}>
      
      
      {editMode ? (
        <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setEditMode(false)} 
          autoFocus
          className="border p-1 text-black"
        />
      ) : (
        <h1 onClick={() => setEditMode(true)}>{text}</h1>
      )}
      

      <div className="min-h-screen bg-gray-100 text-black dark:bg-900 dark:text-white">
        <Navbar dark={dark} setDark={setDark} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/biz-haqimizda' element={<About />} />
          <Route path='/rasmlar' element={<Gallery />} />
          <Route path='/boglanish' element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </div>
  )
}
