import { toast } from "react-toastify"


// get products 
const getData = async()=>{
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/data/getAllData`, {
          method: 'GET',
          credentials: 'include'
        })
  
        const data = await res.json()
        return data
      } catch (error) {
        toast.error("Internal Server Error!")
      }
}

// add product 
const addData= async(formData)=>{
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/data/addData`, {
            method: 'POST',
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        toast.error("Internal Server Error!")
    }
}

// delete product 
const deleteData = async(id)=>{
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/data/deleteData`, {
          method: 'DELETE',
          headers: { "Content-type": 'application/json' },
          body: JSON.stringify({ id: id }),
          credentials: 'include',
        })
        const data = await res.json()
        return data
      } catch (error) {
        toast.error("Internal Server Error!")
      }
}


// update product 
const updateData = async (formData)=>{
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/data/updateData`,{
          method:'PUT',
          headers:{ "Content-type":'application/json'},
          body:JSON.stringify(formData),
          credentials:'include'
      })
      const data = await response.json()
      return data

      }catch(err){
        toast.error("Internal Server Error!")
      }
}

export {addData , getData , deleteData , updateData}