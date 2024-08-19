import React from 'react'
import { useState, useRef, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Body() {
    const [form, setForm] = useState({ url: "", username: "", password: "" })
    const [data, setData] = useState([])
    const [click,setClick] = useState(false)
    const eyeRef = useRef()
    
    const getDataFromMongoDB = async () => {
        try {
            let response = await fetch('https://password-manager-backend-happy-samal.vercel.app/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            setData(data);
            setClick(false);
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to fetch data');
        }
    };

    useEffect(() => {
        getDataFromMongoDB();
    }, [click])

    const inputClicked = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const saveClick = async () => {
    if (form.url.length > 3 && form.username.length > 3 && form.password.length > 4) {
        try {
            let response = await fetch('https://password-manager-backend-happy-samal.vercel.app/', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setForm({ url: "", username: "", password: "" });
            setClick(true);
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to save data');
        }
    } else {
        toast('🦄 Password is invalid', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
};

const deleteClick = async (id) => {
    let cnf = confirm("Are you sure you want to delete?");
    if (cnf) {
        try {
            let itemToDelete = data.find((e) => e._id === id);
            let response = await fetch('https://password-manager-backend-happy-samal.vercel.app/', {
                method: 'DELETE',
                body: JSON.stringify(itemToDelete),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setClick(true);
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to delete data');
        }
    }
};
    const editClick = async(id) => {
        let newData = data.filter((e) => {
            return e._id == id
        })
        setForm(newData[0])
        await fetch('https://password-manager-backend-happy-samal.vercel.app/', {
            method: 'DELETE',
            body: JSON.stringify(newData[0]),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          setClick(true)
    }
    const eyeClick = () => {
        if (eyeRef.current.type == "password") {
            eyeRef.current.type = "text"
        } else {
            eyeRef.current.type = "password"
        }
    }
    const copy = (text) => {
        navigator.clipboard.writeText(text)
        toast('🦄 copy to clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full  bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#7144ff] opacity-20 blur-[100px]"></div></div>
            
            
            <div className='sm:myContainer p-[20px] '>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex items-center font-bold text-[#7144FF] sm:text-2xl text-[20px]'>
                        <span >&lt;</span><span className='text-[#191330]'>Pass</span><span>OP/&gt;</span>
                    </div>
                    <span className='sm:text-lg text-[16px] text-stone-900 font-semibold'>Your Own Password Manager</span>
                </div>
                <div className='flex flex-col items-center gap-4 my-5'>
                    <input className='rounded-full w-full px-4 py-1 border-2 border-[#8159ff]' placeholder='Enter Website URL' type="text" onChange={inputClicked} name='url' value={form.url} />
                    <div className=' flex sm:flex-row flex-col gap-4 w-full'>
                        <input className=' sm:w-1/2 rounded-full px-3 py-1 border-2 border-[#8159ff]' placeholder='Enter User Name ' type="text" onChange={inputClicked} name='username' value={form.username} />
                        <div className='relative sm:w-1/2'>
                            <input ref={eyeRef} className='rounded-full w-full px-3 py-1 border-2 border-[#8159ff]' placeholder='Enter Password ' type="password" onChange={inputClicked} name='password' value={form.password} />
                            <span onClick={eyeClick} className='absolute right-[10px]'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/fmjvulyw.json"
                                    trigger="hover"
                                    colors="primary:#121331,secondary:#ebe6ef,tertiary:#3a3347,quaternary:#7144ff,quinary:#f9c9c0,senary:#f24c00"
                                    >
                                </lord-icon>
                            </span>
                        </div>
                    </div>
                    <button onClick={saveClick} className='text-[16px] text-white bg-[#7144FF] w-28 h-[39px] border-2  rounded-full flex items-center justify-center gap-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ujxzdfjx.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#ffffff"
                            style={{ width: "30px", height: "30px" }}>
                        </lord-icon>
                        <span>Save</span></button>
                </div>
                {data.length === 0 && <div>No data to show</div>}
                {data.length != 0 && <table  className="sm:w-full w-[100%] text-[8px] sm:text-[16px]">
                    <thead className='bg-[#bca6ff] text-white '>
                        <tr>
                            <th>Website</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {data.map((item) => {
                        return <tbody className='bg-[#ebe4ff]  ' key={item._id}>
                            <tr>
                                <td><div className='tdFlex'><a href={item.url} target='_blank'>{item.url} </a><img src="/copy.png" className='cursor-pointer' onClick={() => { copy(item.url) }} /></div></td>
                                <td><div className='tdFlex'><div>{item.username}</div><img src="/copy.png" className='cursor-pointer' onClick={() => { copy(item.username) }} /></div></td>
                                <td><div className='tdFlex'><div>{"*".repeat(item.password.length)}</div><img src="/copy.png" className='cursor-pointer' onClick={() => { copy(item.password) }} /></div></td>
                                <td>
                                    <div className='tdFlex'>
                                        <button onClick={() => { editClick(item._id) }} ><lord-icon
                                            src="https://cdn.lordicon.com/lsrcesku.json"
                                            trigger="hover"
                                            style={{ width: "20px", height: "20px" }}>
                                        </lord-icon></button>
                                        <button onClick={() => { deleteClick(item._id) }}><lord-icon
                                            src="https://cdn.lordicon.com/xekbkxul.json"
                                            trigger="hover"
                                            style={{ width: "20px", height: "20px" }}>
                                        </lord-icon></button>
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

export default Body
