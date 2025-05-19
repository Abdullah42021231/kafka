import mongoose from "mongoose";
export const  ConnectDB = ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('db connected successfully ');
          
      }).catch((error=>{
          console.log('db connection failed ');
      }))
}