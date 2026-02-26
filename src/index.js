// import express from 'express'
import {app} from './app.js'

import dotenv from 'dotenv';
import connectDB from "./db/db.js";

dotenv.config({
    path: './.env'
})
// require('dotenv').config({path: './env'})                                'The above 3 line can be used as this also but we used the import statement format for consistency in the code.' 

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection failed !!!", err);
})















/*                                                      (using IFFI)
import express from 'express'
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', (error) => {
            console.log("Error: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("Error: ",error)
        throw error
    }
})()
*/