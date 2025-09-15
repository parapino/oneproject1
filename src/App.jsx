import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Detail from './pages/Detail'

export default function App() {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? "dark" : ""}>

      <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        <Navbar dark={dark} setDark={setDark} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/biz-haqimizda' element={<About />} />
          <Route path='/rasmlar' element={<Gallery />} />
          <Route path='/boglanish' element={<Contact />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Routes>

        <Footer />
      </div>
    </div>
  )
}
