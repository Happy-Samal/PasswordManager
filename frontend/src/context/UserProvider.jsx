import React ,{createContext, useEffect, useState} from 'react'

const UserContext = createContext(null);

function UserProvider({children}) {
    const [user,setUser] = useState({});

    const fetchData = async()=>{
        try{
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/isLogin`,{
                method:'GET',
                credentials:'include'
            })
            const data = await res.json()
            setUser(data)
        }catch(err){
            console.error("Error in user Provider when fetch isLogin method")
        }
    }
useEffect(() => {
    fetchData()
}, [])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export  {UserProvider,UserContext}
