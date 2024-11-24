import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    userId:{
        type:Number,
        allowNull:false
    },
});

export const WishList = mongoose.model("wishlist",wishListSchema);
