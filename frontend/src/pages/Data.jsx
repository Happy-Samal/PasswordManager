import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Lock, Copy, EyeClosed, Eye, Loader, Edit, Trash } from "lucide-react";
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { addData, getData, deleteData, updateData } from '../helper/data'

function Data() {
  const isLogin = useContext(UserContext)
  const [form, setForm] = useState({ url: "", username: "", password: "" })
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEditClick , setIsEditClick] = useState(false)



  const getalldata = async () => {
    setLoading(true)
    const res = await getData({ id: isLogin?.user?._id });
    console.log(res?.data)
    setData(res?.data);
    setLoading(false)
  }



  const inputClicked = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const saveClick = async () => {
    setLoading(true)
    const res = await addData(form);
    if (res.success) {
      toast.success(res.message)
      setForm({username:"",password:"",url:""});
      getalldata()
    } else {
      toast.error(res.message)
    }
    setLoading(false)
  }
  const updateClick = async () => {
    setLoading(true)
    const res = await updateData(form);
    if (res.success) {
      toast.success(res.message)
      setForm({username:"",password:"",url:""});
      setIsEditClick(false)
      getalldata()
    } else {
      toast.error(res.message)
    }
     
    setLoading(false)
  }
  const editClick = (id) => {
    setIsEditClick(true)
    let newData = data?.filter((el)=>{
      return el?._id == id;
    })
     setForm({
    username: newData[0].username || "",
    password: newData[0].password || "",
    url: newData[0].url || "",
    id:newData[0]._id || "",
  });
  }

  const deleteClick = async (id) => {
    let cnf = confirm("Are sure to delete!")
    if (cnf) {
      const res = await deleteData(id);
      if (res.success) {
        toast.success(res.message)
        getalldata()
      } else {
        toast.error(res.message)
      }
    }
  }

  useEffect(() => {
    getalldata()
  }, [])

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('🦄 copy successfully!');
  }
  return (
    <>
      <div className='sm:container sm:px-56 sm:py-10  sm:mx-auto p-5  '>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex items-center font-bold text-[#7144FF] sm:text-2xl text-[20px]'>
            <span >&lt;</span><span className='text-[#191330]'>Pass</span><span>OP/&gt;</span>
          </div>
          <span className='sm:text-lg text-[16px] text-stone-900 font-semibold'>Your Own Password Manager</span>
        </div>
        <div className='flex flex-col items-center gap-4 my-5'>
          <input className='rounded-full w-full px-4 py-1 border-2 border-[#8159ff]' placeholder='Enter Website URL' type="text" onChange={inputClicked} name='url' value={form.url} required />
          <div className=' flex sm:flex-row flex-col gap-4 w-full'>
            <input className=' sm:w-1/2 rounded-full px-3 py-1 border-2 border-[#8159ff]' placeholder='Enter User Name ' type="text" onChange={inputClicked} name='username' value={form.username} required />
            <div className='relative sm:w-1/2'>
              <input className='rounded-full w-full px-3 py-1 border-2 border-[#8159ff]' placeholder='Enter Password ' type={isOpen ? "text" : "password"} onChange={inputClicked} name='password' value={form.password} required />
              <span className='absolute right-2.5 top-2'>
                {
                  isOpen ? <Eye className="text-[#7144FF] mr-2 cursor-pointer" size={20} onClick={() => { setIsOpen(false) }} /> :
                    <EyeClosed className="text-[#7144FF] mr-2 cursor-pointer" size={20} onClick={() => { setIsOpen(true) }} />
                }
              </span>
            </div>
          </div>
          {isEditClick?
          <button onClick={updateClick} className='text-[16px] text-white bg-[#7144FF] w-28 h-[39px] border-2  rounded-full flex items-center justify-center gap-2 cursor-pointer'>
            {loading ?
              <Loader className="text-white mr-2" size={20} /> :
              <span>Update</span>}
          </button>:
          <button onClick={saveClick} className='text-[16px] text-white bg-[#7144FF] w-28 h-[39px] border-2  rounded-full flex items-center justify-center gap-2 cursor-pointer'>
            {loading ?
              <Loader className="text-white mr-2" size={20} /> :
              <span>Save</span>}
          </button>}
        </div>
        {data?.length === 0 && <div className='font-bold'>No data to show</div>}
        {data?.length != 0 && <table className="sm:w-full w-full text-[8px] sm:text-[16px]">
          <thead className='bg-[#bca6ff] text-white '>
            <tr>
              <th>Website</th>
              <th>User Name</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          {data?.map((item) => {
            return <tbody className='bg-[#ebe4ff]  ' key={item?._id}>
              <tr>
                <td><div className='justify-center items-center flex gap-2'><a href={item?.url} target='_blank'>{item?.url} </a><Copy className="text-black mr-2 cursor-pointer" size={17} onClick={() => { copy(item?.url) }} /></div></td>
                <td><div className='justify-center items-center flex gap-2'><div>{item?.username}</div>
                  <Copy className="text-black mr-2 cursor-pointer" size={17} onClick={() => { copy(item?.username) }} /></div></td>
                <td><div className='justify-center items-center flex gap-2'><div>{item?.password}</div>
                  <Copy className="text-black mr-2 cursor-pointer" size={17} onClick={() => { copy(item?.password) }} /></div></td>
                <td>
                  <div className='justify-center items-center flex gap-2'>
                    <button onClick={() => { editClick(item?._id) }} >
                      <Edit className="text-black mr-2 cursor-pointer" size={17} />
                    </button>
                    <button onClick={() => { deleteClick(item?._id) }}>
                      <Trash className="text-black mr-2 cursor-pointer" size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          })}
        </table>
        }
      </div>
    </>
  )
}

export default Data
