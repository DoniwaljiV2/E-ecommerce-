const mongoose=require('mongoose');
const ProdcutSchema=new mongoose.Schema({
  image:String,
  title:String,
  description:String,
  category:String,
  brand:String,
  price:Number,
  salePrice:Number,
  totalStock:Number,

},{timestamps:true})
const Product=mongoose.model("Product",ProdcutSchema)
module.exports=Product;