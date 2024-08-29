import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    name: {
        type: String,    
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String,
        default: null
    }
})

const Admin = model('Admin', adminSchema)

export default Admin;