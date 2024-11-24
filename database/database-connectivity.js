import mongoose from "mongoose";

mongoose.connect("mongodb+srv://theingeious:pRbFe82Vp0Rw1mxE@kirayewala.vwavihw.mongodb.net/kirayewalaApi?retryWrites=true&w=majority").then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

export default mongoose.connection;