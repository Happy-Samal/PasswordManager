import Data from '../models/Data.js'


class DataSer{

    async addData(data) {
        const res = await Data.create(data);
        return {
            success:true,
            message:"Add Successfully!"
        };
    }
    async getAllData(userId) {
        const res = await Data.find({ user: userId });
        return {
            success:true,
            message:"Get All Successfully!",
            data:res
        };
    }
    async updateData(dataId,updates) {
        const res = await Data.findByIdAndUpdate(
            dataId,
            updates,
            {new:true}
        )
        return {
            success:true,
            message:"Update Successfully!"
        };
    }
    async deleteData(dataId) {
        const res = await Data.findByIdAndDelete(dataId)
        return {
            success:true,
            message:"Delete Successfully!"
        };
    }
    

}

export default new DataSer()