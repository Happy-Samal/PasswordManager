import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { Lock, Mail, User , EyeClosed , Eye, Loader} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {Title , Meta} from 'react-head'

const Login = () => {
  const isLogin = useContext(UserContext)
  const navigate = useNavigate()
 const [isOpen, setIsOpen] = useState(false)
 const  [loading, setLoading] = useState(false)

 if(isLogin?.success){
   navigate('/notfound')
 }

  const [form, setForm] = useState({
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
      let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
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
      console.log("Error in login",err);
      toast.error("Internal Server Error!")
    }
    setLoading(false)
  };
  return (
    <>
         <Title>Login Page</Title>
          <Meta name="description" content="This is the Login page" />

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Login to start using Password Manager</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

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
                   <Loader className="text-gray-600 mr-2"  size={20} />
                    :
                    <span>Login</span>
            }
          
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account ? {" "}
          <Link to={'/user/signup'} className="text-indigo-600 font-medium hover:underline">
            Signup
          </Link>
        </p>

      </div>
    </div>
        </>
  );
};

export default Login;
