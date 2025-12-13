import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { HeadProvider } from 'react-head'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from '../context/UserProvider'

function Layout() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <UserProvider>
          <>
        <HeadProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </HeadProvider>
          </>
      </UserProvider>
    </>
  )
}

export default Layout
