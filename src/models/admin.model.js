// import mongoose from "mongoose";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// const adminSchema = new mongoose.Schema({
//     adminUserName:  {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     fullName: {
//         type: String,
//         required: true,
//         trim: true
//     }

// },{timestamps: true})



// adminSchema.pre("save", async function(next) {
//     if(!this.isModified("password")) return next();

//     this.password = bcrypt.hash(this.password, 10)
//     next()
// })



// adminSchema.methods.isPasswordCorrect = async function(pass){
//     return await bcrypt.compare(pass, this.password)
// }



// adminSchema.methods.generateAccessToken = function(){
//     jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             userName: this.userName,
//             fullName: this.fullName
//         },
//         process.env.ADMIN_ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY
//         }
//     )
// }



// adminSchema.methods.generateRefreshToken = function(){
//     jwt.sign(
//         {
//             _id: this._id
//         },
//         process.env.ADMIN_REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXPIRY
//         }
//     )
// }


// export const admin = mongoose.model("admin", adminSchema)


import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminUsername: {
        type: String,
        
    }
}, {timestamps: true})