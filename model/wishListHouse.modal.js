import mongoose from "mongoose";

const wishListHouseSchema = new mongoose.Schema({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
});

export const WishListHouse = mongoose.model("wishlisthouse",wishListHouseSchema);