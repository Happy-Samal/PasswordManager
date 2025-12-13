import React, { useState, useContext , useEffect} from 'react'
import { UserContext } from '../context/UserProvider'
import { Lock, Mail, User , EyeClosed , Eye, Loader} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {Title , Meta} from 'react-head'

const Signup = () => {
  const isLogin = useContext(UserContext)
  const navigate = useNavigate()
 const [isOpen, setIsOpen] = useState(false)
 const  [loading, setLoading] = useState(false)

 useEffect(() => {
  if(isLogin.success){
  navigate('/notfound')
 }
 }, [])
 
 
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();
    try{
      let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: 'POST',
          headers: {
            "Content-type": 'application/json'
          },
          body: JSON.stringify(form),
          credentials: 'include'
        }
      )
      const result = await response.json()
      if (result.success) {
        navigate(result.redirectUrl)
        window.location.reload();
      }else{
        toast.error(result.message);
      }

    }catch(err){
      console.log("Error in Signup",err);
      toast.error("Internal Server Error!")
    }
    setLoading(false)
  };

  return (
    <>

     <Title>Signup Page</Title>
          <Meta name="description" content="This is the Signup page" />
    
 
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Create Account</h1>
          <p className="text-gray-600 mt-1">Sign up to start using Password Manager</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">User Name</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <User className="text-gray-600 mr-2" size={20} />
              <input
                type="text"
                name="username"
                placeholder="Enter your Username"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <Mail className="text-gray-600 mr-2" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-50">
              <Lock className="text-gray-600 mr-2" size={20} />
              <input
                type={isOpen?'text':'password'}
                name="password"
                placeholder="Enter a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                required
              />

            {
                isOpen?
                <Eye className="text-gray-600 mr-2 cursor-pointer" onClick={()=>{setIsOpen(false)}} size={20} />:
                <EyeClosed className="text-gray-600 mr-2 cursor-pointer" onClick={()=>{setIsOpen(true)}} size={20} />
            }
            </div>
          </div>

          {/* Button */}
          <button disabled={loading}
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            {loading ?
                   <Loader className="text-white mr-2"  size={20} />
                    :
                    <span>Sign Up</span>
            }
          
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to={'/user/login'} className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
       </>
  );
};

export default Signup;
