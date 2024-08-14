import mongoose from "mongoose";
const passOPSchema = new mongoose.Schema({
    url:'string',
    username:'string',
    password:'string',
});

export const passOP = mongoose.model('passwords', passOPSchema);