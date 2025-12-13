import dataSer from '../services/DataService.js'

const addData = async(req,res)=>{
    try{
        req.body.user = req.userId;
        const result = await dataSer.addData(req.body);
        return res.status(201).json(result)
    }catch(err){
         return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}
const getAllData = async(req,res)=>{
    try{
        const result = await dataSer.getAllData(req.userId)
        return res.status(201).json(result)
    }catch(err){
         return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }

}
const updateData = async(req,res)=>{
    const dataId = req.body.id;
    try{
        const result = await dataSer.updateData(dataId,req.body)
        return res.status(201).json(result)
    }catch(err){
         return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }

}
const deleteData = async(req,res)=>{
    try{
        const result = await dataSer.deleteData(req.body.id)
        return res.status(201).json(result)
    }catch(err){
         return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

export {addData,getAllData,updateData,deleteData}