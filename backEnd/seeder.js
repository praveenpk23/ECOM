import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Product from "./models/ProductModel.js";
import User from "./models/userModel.js";
import products from "./data/products.js";
import users from "./data/users.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();
const insertData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const addAllUsers = await User.insertMany(users);
    const adminId = addAllUsers[0]._id;

    const addAllProducts = products.map((product)=>{
      return {
      ...product,
      user: adminId,
    }
    })
    await Product.insertMany(addAllProducts);
    console.log('Data added successfully')
    console.log(adminId);
    process.exit();
  } catch (err) {
    console.log(`Error : ${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data destroyed successfully')
    process.exit();
  } catch (err) {
    console.log(`Error : ${err}`);
    process.exit(1);
  }
};

if(process.argv[2] === '-d'){
  destroyData();
}else{
  insertData();
}