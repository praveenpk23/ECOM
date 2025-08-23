import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
const App = () => {
  return (
   <>
    <div >
    <span data-theme="dark">
      <Header />
    </span>
    <main className='min-h-screen'>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </main>
    <span data-theme="dark">
    <Footer  />
    </span>
    </div>
    <Toaster position='bottom-center'  />
   </>
  )
}

export default App
