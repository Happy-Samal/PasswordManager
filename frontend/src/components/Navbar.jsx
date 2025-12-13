import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { toast } from 'react-toastify';


function Navbar() {
  const isLogin = useContext(UserContext)
  const navigate = useNavigate();

  const logoutClick = async () => {
    let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    const result = await response.json()
    if (result.success) {
      navigate(result.redirectUrl)
      window.location.reload();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <>
      <div className=' flex h-[10vh] bg-[#191330] text-white  w-full flex-row  items-center px-5 justify-between'>
        {/* logo */}
        <Link to={'/'}>
          <div className='flex items-center font-bold text-indigo-600 sm:text-2xl text-[14px] cursor-pointer'>
            <span >&lt;</span><span className='text-white'>Pass</span><span>OP/&gt;</span>
          </div>
        </Link>

        {
          isLogin?.success ?
            <div>
                
              {/* <button onClick={() => { logoutClick() }} className=' py-1 px-2 m-2 sm:text-base text-[10px] bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition cursor-pointer'>Logout</button> */}
              
              <Link to={'/user/data'}>
                <button className=' py-1 px-2 m-2 sm:text-base text-[10px] bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition cursor-pointer'>{isLogin?.user?.username}</button>
              </Link>

            </div> :
            <span >
              <Link to={'/user/signup'}>
                <button className='py-1 px-2 m-2 sm:text-base text-[10px] bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition cursor-pointer'>Signup</button>
              </Link>
              <Link to={'/user/login'}>
                <button className=' py-1 px-2 m-2 sm:text-base text-[10px] bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition cursor-pointer'>Login</button>
              </Link>
            </span>

        }

      </div>

    </>
  )
}

export default Navbar
