import mongoose from "mongoose";
const passOPSchema = new mongoose.Schema({
    url:'string',
    username:'string',
    password:'string',
});

export default mongoose.passOPSchema || mongoose.model('passwords', passOPSchema);