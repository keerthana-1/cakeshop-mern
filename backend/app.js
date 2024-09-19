const express = require('express');
const mongoose = require('mongoose');

const { connectToDb, getDb } = require('./db');



const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',  // Your React development server
  }));

app.use(express.json());

connectToDb((err)=>{
    if(!err){
        app.listen(port,()=>console.log("listening on port 3000"))
        db=getDb()
    } 
})

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    name: String,
    address:String,
    phone:String
});

const cakeSchema = new mongoose.Schema({
    name:String,
    description:String,
    image: String,
    flavor:String,
    category:String,
    price:Number
});

const flavorSchema = new mongoose.Schema({
    name:String
});

const categorySchema = new mongoose.Schema({
    name:String
});


const cartSchema = new mongoose.Schema({
    cartid: String,
    username: String,
    cartItems:[{
        cakeName : String,
    quantity : Number,
    message : String,
    price : Number,
    toppings: [String],
    image: String
    }],
    totalItems: Number,
    totalPrice: Number
})

const orderSchema = new mongoose.Schema({
    username:String,
    status: String,
    cart_id: String,
    order_id: String,
    shipping_data:[{
        name: String,
        phone: String,
        address: String,
        delivery: String
    }],
    payment_data:[{
        card_number: String,
        name: String,
        security_code: String,
        expiry: String
    }]
},{ timestamps: true })

const User = mongoose.model('users', userSchema);
const Cake = mongoose.model('cakes', cakeSchema);
const Flavor = mongoose.model('flavors', flavorSchema);
const Category = mongoose.model('categories', categorySchema);
const Cart = mongoose.model('carts',cartSchema);
const Order = mongoose.model('orders',orderSchema);

app.get('/',(req,res)=>{
    res.send('Welcome to the Node.js MongoDB app!');
})

//---------------------------------------------------------------users

app.get('/getUsers',async (req,res)=>{
    try{
        const users= await User.find();
        res.json(users);
    }
    catch(err){
        console.error(err);
    }
})

app.get('/getUser/:email',async (req,res)=>{
    try{
        const users= await User.findOne({email:req.params.email});
        res.json(users);
    }
    catch(err){
        console.error(err);
    }
})

app.get('/getPassword/:email',async (req,res)=>{
    try{
        const user= await User.findOne({email:req.params.email});
        res.json(user.password);
    }
    catch(err){
        console.error(err);
    }
})

app.post('/updatePassword/:email', async(req,res)=>{
    try{
        const  { password: newPassword }  = req.body;
        console.log(newPassword)
        const user=await User.findOneAndUpdate(
        { email: req.params.email },      
        { password: newPassword },       
        { new: true, runValidators: true })

      res.json({ message: 'Password updated successfully', user });
    }
    catch(err){
        console.error(err)
    }
})

app.post('/createUser', async(req,res)=>{
    try{
        const userdata = req.body;
        //console.log(newPassword)
        const user=await User.create(userdata)

      res.json({ message: 'user created successfully', user });
    }
    catch(err){
        console.error(err)
    }
})

//---------------------------------------------------------------users

//---------------------------------------------------------------cakes

app.get('/getCakes',async (req,res)=>{
    try{
        const cakes= await Cake.find();
        res.json(cakes);
    }
    catch(err){
        console.error(err);
    }
})

app.get('/getCake/:name',async (req,res)=>{
    try{
        const cakes= await Cake.findOne({name:req.params.name});
        res.json(cakes);
    }
    catch(err){
        console.error(err);
    }
})

//---------------------------------------------------------------cakes
//---------------------------------------------------------------flavors

app.get('/getFlavors',async (req,res)=>{
    try{
        const flavors= await Flavor.find();
        res.json(flavors);
    }
    catch(err){
        console.error(err);
    }
})

//---------------------------------------------------------------flavors
//---------------------------------------------------------------categories

app.get('/getCategories',async (req,res)=>{
    try{
        const categories= await Category.find();
        res.json(categories);
    }
    catch(err){
        console.error(err);
    }
})
//---------------------------------------------------------------categories
//---------------------------------------------------------------cart

app.get('/getcart/:cart_id',async(req,res)=>{
    try{

        const cart = await Cart.findOne({cartid:req.params.cart_id});
        res.json(cart)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/insertCart',async(req,res)=>{
    try{
        const cartData = req.body;
        const cart = await Cart.create(cartData) 
        console.log("cart created succesfully",cart)
    }
    catch(err){
        console.log(err)
    }
})

//---------------------------------------------------------------cart
//---------------------------------------------------------------order

app.post('/insertOrder',async(req,res)=>{
    try{
        const orderData = req.body;
        const order = await Order.create(orderData) 
        console.log("order created succesfully",order)
    }
    catch(err){
        console.log(err)
    }
})

app.get('/getUserOrder/:username',async(req,res)=>{
    try{

        const order = await Order.findOne({username:req.params.username}).sort({ createdAt: -1 });
        res.json(order)
    }
    catch(err){
        console.log(err)
    }
})