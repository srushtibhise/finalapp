let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 8230;
const mongoUrl = "mongodb+srv://srushti:srushti15@zomato.inocb.mongodb.net/eduinternjan?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const cors = require('cors');

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors()) 





app.get('/', (req,res) => {
    res.send("Welcome to Express")
})

//location
app.get('/location', (req,res) =>{
    db.collection('location').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//restaurants
app.get('/restaurants/',(req,res) => {
    // let id = req.params.id;
    // let id  = req.query.id
    // console.log(">>>id",id)
    let query = {};
    let stateId = Number(req.query.state_id)
    let mealId = Number(req.query.meal_id)
    if(stateId){
        query = {state_id:stateId}
    }else if(mealId){
        query = {'mealTypes.mealtype_id':mealId}
    }

    db.collection('resturant').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//mealtype
app.get('/mealtype', (req,res) =>{
    db.collection('mealtype').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})




//restaurantDetails
app.get('/details/:id',(req,res) => {
    //let restId = Number(req.params.id);
    let restId = mongo.ObjectId(req.params.id)
    db.collection('resturant').find({_id:restId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//menu
app.get('/menu',(req,res) => {
    let query = {}
    let restId = Number(req.query.restId)
    if(restId){
        query = {restaurant_id:restId}
    }
    db.collection('menu').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
}) 

// menu on basis of id
app.post('/menuItem',(req,res) => {
    console.log(req.body);
    if(Array.isArray(req.body)){
        db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
})

// place Order
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})

// View Order
app.get('/viewOrder',(req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query = {"email":email}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


// delete order
app.delete('/deleteOrders',(req,res)=>{
    db.collection('orders').remove({},(err,result) => {
        res.send('order deleted')
    })
})


//update orders
app.put('/updateOrder/:id',(req,res) => {
    console.log(">>>id",req.params.id)
    console.log(">>>id",req.body)
    let oId = Number(req.params.id)
    db.collection('orders').updateOne(
        {id:oId},
        {$set:{
            "status":req.body.status,
            "bank_name":req.body.bank_name,
            "date":req.body.date
        }},(err,result) => {
            if(err) throw err
            res.send(`Status Updated to ${req.body.status}`)
        }
    )
})



//connection with db

MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log(`Error while connecting`, err);
    db = client.db('eduinternjan');
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
})



